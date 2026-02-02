



export function TaskRow({ task, onClick }: any) {
  return (
    <tr>
      <td className="px-4 py-3 flex border-2 rounded-xl border-white hover:border-gray-400 justify-between text-sm font-medium text-slate-900">
        <a
          href={`/tasks/${task.id}`}
          className="flex flex-1 items-center justify-between hover:underline"
        >
          {task.name || null}
          <img src="/icons/drag.svg" alt="" className="active:bg-gray-200 justify-end" />
        </a>
      </td>
    </tr>
  );
}

// {
//     newHireName:,
// startDate:,
// lastUpdatedBy:,
// currentTask:,
// }

