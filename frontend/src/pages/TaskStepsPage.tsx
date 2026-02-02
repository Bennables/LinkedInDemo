import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import "../index.css";

const url = import.meta.env.VITE_SERVER_URL;

export interface TaskStep {
  id: number;
  name: string;
  description: string | null;
  taskId: number;
  companyId: number;
}

export default function TaskStepsPage() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState("");
  const [steps, setSteps] = useState<TaskStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addName, setAddName] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchTask = useCallback(async () => {
    if (!taskId) return;
    try {
      const res = await axios.get(`${url}/api/task/${taskId}`);
      setTaskName(res.data.name ?? "");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load task");
    }
  }, [taskId]);

  const fetchSteps = useCallback(async () => {
    if (!taskId) return;
    try {
      const res = await axios.get(`${url}/api/task/${taskId}/steps`);
      setSteps(res.data.data ?? []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load steps");
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    fetchTask();
    fetchSteps();
  }, [fetchTask, fetchSteps]);

  const handleAddStep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskId || !addName.trim()) return;
    setAdding(true);
    setError("");
    try {
      await axios.post(`${url}/api/task/${taskId}/steps`, {
        name: addName.trim(),
        description: addDescription.trim() || undefined,
      });
      setAddName("");
      setAddDescription("");
      await fetchSteps();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add step");
    } finally {
      setAdding(false);
    }
  };

  const startEdit = (step: TaskStep) => {
    setEditingId(step.id);
    setEditName(step.name);
    setEditDescription(step.description ?? "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditDescription("");
  };

  const handleUpdateStep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskId || editingId == null) return;
    setSaving(true);
    setError("");
    try {
      await axios.put(`${url}/api/task/${taskId}/steps/${editingId}`, {
        name: editName.trim(),
        description: editDescription.trim() || null,
      });
      cancelEdit();
      await fetchSteps();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update step");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteStep = async (step: TaskStep) => {
    if (!taskId || !window.confirm(`Delete step "${step.name}"?`)) return;
    setDeletingId(step.id);
    setError("");
    try {
      await axios.delete(`${url}/api/task/${taskId}/steps/${step.id}`);
      await fetchSteps();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete step");
    } finally {
      setDeletingId(null);
    }
  };

  if (!taskId) {
    return (
      <div className="flex flex-col min-h-screen bg-white px-4 py-6">
        <p className="text-red-600">Missing task id.</p>
        <button
          type="button"
          onClick={() => navigate("/tasks")}
          className="mt-2 text-slate-600 underline"
        >
          Back to tasks
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="mx-auto max-w-4xl w-full px-4 py-6">
        <div className="mb-4 flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => navigate("/tasks")}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            ← Tasks
          </button>
          <h1 className="text-xl font-semibold text-slate-900">
            Steps for: {taskName || "…"}
          </h1>
          {taskName && (
            <a
              href={`/tasks/edit/${encodeURIComponent(taskName)}`}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Edit task name
            </a>
          )}
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
            {error}
          </div>
        )}

        {/* Add step form */}
        <div className="mb-6 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-sm font-medium text-slate-700 mb-3">Add step</h2>
          <form onSubmit={handleAddStep} className="flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="add-name" className="block text-xs text-slate-500 mb-1">
                Name
              </label>
              <input
                id="add-name"
                type="text"
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
                placeholder="Step name"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                disabled={adding}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="add-desc" className="block text-xs text-slate-500 mb-1">
                Description (optional)
              </label>
              <input
                id="add-desc"
                type="text"
                value={addDescription}
                onChange={(e) => setAddDescription(e.target.value)}
                placeholder="Description"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                disabled={adding}
              />
            </div>
            <button
              type="submit"
              disabled={adding || !addName.trim()}
              className="rounded-md bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {adding ? "Adding…" : "Add step"}
            </button>
          </form>
        </div>

        {/* Steps list */}
        <div className="rounded-md border border-slate-200 overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">
                  Step
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">
                  Description
                </th>
                <th className="px-4 py-3 w-28 text-right text-sm font-semibold text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-slate-500">
                    Loading steps…
                  </td>
                </tr>
              ) : steps.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-slate-500">
                    No steps yet. Add one above.
                  </td>
                </tr>
              ) : (
                steps.map((step) => (
                  <tr key={step.id} className="hover:bg-slate-50">
                    {editingId === step.id ? (
                      <>
                        <td colSpan={3} className="px-4 py-3">
                          <form
                            onSubmit={handleUpdateStep}
                            className="flex flex-wrap items-end gap-3"
                          >
                            <div className="flex-1 min-w-[160px]">
                              <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                placeholder="Step name"
                                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                                disabled={saving}
                              />
                            </div>
                            <div className="flex-1 min-w-[160px]">
                              <input
                                type="text"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                placeholder="Description"
                                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                                disabled={saving}
                              />
                            </div>
                            <button
                              type="submit"
                              disabled={saving || !editName.trim()}
                              className="rounded-md bg-slate-700 px-3 py-2 text-sm text-white hover:bg-slate-800 disabled:bg-slate-400"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={cancelEdit}
                              disabled={saving}
                              className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                            >
                              Cancel
                            </button>
                          </form>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3 text-sm font-medium text-slate-900">
                          {step.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {step.description || "—"}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => startEdit(step)}
                            className="mr-2 text-slate-600 hover:text-slate-900 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteStep(step)}
                            disabled={deletingId === step.id}
                            className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                          >
                            {deletingId === step.id ? "Deleting…" : "Delete"}
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
