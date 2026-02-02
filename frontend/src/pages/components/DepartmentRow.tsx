



export function DepartmentRow({ department, onClick }: any) {
  return (
    <tr>
    <a href={`/departments/${department.name}`}>
      <td className="px-4 py-3 flex border-2 rounded-xl border-white hover:border-gray-400 justify-between text-sm font-medium text-slate-900">
        
        {department.name || null}
        <img src = "icons/drag.svg" className = "active:bg-gray-200 justify-end"></img>
      </td>
      </a>
    </tr>
  );
}

// {
//     newHireName:,
// startDate:,
// lastUpdatedBy:,
// currentTask:,
// }

