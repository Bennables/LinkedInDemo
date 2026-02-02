



export function DepartmentRow({ department, onClick }: any) {
  return (
    <tr
      className={`hover:bg-slate-50 ${onClick ? "cursor-pointer" : ""}`}
      onClick={() => onClick?.(department)}
    >  
      <td className="px-4 py-3 flex justify-between text-sm font-medium text-slate-900">
        
        <a href={`/hires/user/${department.name}`}>{department.name || null}</a>
        <img src = "icons/drag.svg" className = "active:bg-gray-200 justify-end"></img>
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

