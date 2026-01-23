/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useEffect, useState } from 'react';
import axios from 'axios';

import {
  $isTextNode,
  type DOMConversionMap,
  type DOMExportOutput,
  type DOMExportOutputMap,
  type EditorState,
  isHTMLElement,
  type Klass,
  type LexicalEditor,
  type LexicalNode,
  ParagraphNode,
  TextNode,
} from 'lexical';

import ExampleTheme from './ExampleTheme';
import ToolbarPlugin from '../plugins/ToolbarPlugin';
import {parseAllowedColor, parseAllowedFontSize} from './styleConfig';
import './lexicalStyles.css'
import { useNavigate, useParams } from 'react-router';

const placeholder = 'Enter some rich text...';


const removeStylesExportDOM = (
  editor: LexicalEditor,
  target: LexicalNode,
): DOMExportOutput => {
  const output = target.exportDOM(editor);
  if (output && isHTMLElement(output.element)) {
    // Remove all inline styles and classes if the element is an HTMLElement
    // Children are checked as well since TextNode can be nested
    // in i, b, and strong tags.
    for (const el of [
      output.element,
      ...output.element.querySelectorAll('[style],[class]'),
    ]) {
      el.removeAttribute('class');
      el.removeAttribute('style');
    }
  }
  return output;
};

const exportMap: DOMExportOutputMap = new Map<
  Klass<LexicalNode>,
  (editor: LexicalEditor, target: LexicalNode) => DOMExportOutput
>([
  [ParagraphNode, removeStylesExportDOM],
  [TextNode, removeStylesExportDOM],
]);

function LoadEditorState({ serializedState }: { serializedState: any }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!serializedState?.root) return;

    editor.update(() => {
      const parsed = editor.parseEditorState(serializedState);
      editor.setEditorState(parsed);
    });
  }, [editor, serializedState]);

  return null;
}

const getExtraStyles = (element: HTMLElement): string => {
  // Parse styles from pasted input, but only if they match exactly the
  // sort of styles that would be produced by exportDOM
  let extraStyles = '';
  const fontSize = parseAllowedFontSize(element.style.fontSize);
  const backgroundColor = parseAllowedColor(element.style.backgroundColor);
  const color = parseAllowedColor(element.style.color);
  if (fontSize !== '' && fontSize !== '15px') {
    extraStyles += `font-size: ${fontSize};`;
  }
  if (backgroundColor !== '' && backgroundColor !== 'rgb(255, 255, 255)') {
    extraStyles += `background-color: ${backgroundColor};`;
  }
  if (color !== '' && color !== 'rgb(0, 0, 0)') {
    extraStyles += `color: ${color};`;
  }
  return extraStyles;
};

const constructImportMap = (): DOMConversionMap => {
  const importMap: DOMConversionMap = {};

  // Wrap all TextNode importers with a function that also imports
  // the custom styles implemented by the playground
  for (const [tag, fn] of Object.entries(TextNode.importDOM() || {})) {
    importMap[tag] = (importNode) => {
      const importer = fn(importNode);
      if (!importer) {
        return null;
      }
      return {
        ...importer,
        conversion: (element) => {
          const output = importer.conversion(element);
          if (
            output === null ||
            output.forChild === undefined ||
            output.after !== undefined ||
            output.node !== null
          ) {
            return output;
          }
          const extraStyles = getExtraStyles(element);
          if (extraStyles) {
            const {forChild} = output;
            return {
              ...output,
              forChild: (child, parent) => {
                const textNode = forChild(child, parent);
                if ($isTextNode(textNode)) {
                  textNode.setStyle(textNode.getStyle() + extraStyles);
                }
                return textNode;
              },
            };
          }
          return output;
        },
      };
    };
  }

  return importMap;
};

const editorConfig = {
  html: {
    export: exportMap,
    import: constructImportMap(),
  },
  namespace: 'React.js Demo',
  nodes: [ParagraphNode, TextNode],
  onError(error: Error) {
    throw error;
  },
  theme: ExampleTheme,
};

export default function LexicalEdit(props: any) {
  const [storedState, setStoredState] = useState<EditorState | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const link = import.meta.env.VITE_SERVER_URL
  const {id}= useParams();
  
  useEffect(() => {
    const getFile = async() => {
        try {
          
          const file = await axios.get(`${link}/api/body/${id}`);
          console.log(file.data.data.text)
          setStoredState(file.data.data.text)
        } catch (err) {
          console.error("Error loading content:", err)
        }
    }
    getFile();
  }, [props.id, link])

  function onChange(_: EditorState) {
  //
}


  return (
    <div className='min-h-auto h-screen'>
    <LexicalComposer initialConfig={editorConfig}>
        <LoadEditorState serializedState={storedState} />
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input"
                aria-placeholder={placeholder}
                placeholder={
                  <div className="editor-placeholder">{placeholder}</div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <OnChangePlugin onChange={onChange}/>
          <AutoFocusPlugin />
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <SaveButton editorState={storedState} isSaving={isSaving} setIsSaving={setIsSaving} id={id} link={link} />
      </div>
    </LexicalComposer>
    </div>
  );
}

function SaveButton({ editorState, isSaving, setIsSaving, id, link }: any) {
  const [editor] = useLexicalComposerContext();
  const nav = useNavigate();
  
  const handleSave = async () => {
    if (!editorState) return
    
    setIsSaving(true)
  try {
    const serializedState = editor.getEditorState().toJSON()

    await axios.put(`${link}/api/body/${id}`, {
        id: id,
      content: serializedState
    })
      // alert("Content saved successfully!")
      nav("/")
    } catch (err) {
      console.error("Error saving:", err)
      alert("Error saving content")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <button 
      onClick={handleSave}
      disabled={isSaving}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition font-medium"
    > 
      {isSaving ? "Saving..." : "Save"}
    </button>
  )
}

