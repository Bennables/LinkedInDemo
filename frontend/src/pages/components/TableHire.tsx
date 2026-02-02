
export function HireRow({ hire, onClick }: any) {
  return (
    <tr
      className={`hover:bg-slate-50 ${onClick ? "cursor-pointer" : ""}`}
      onClick={() => onClick?.(hire)}
    >  
      <td className="px-4 w-[38%] py-3 text-sm font-medium text-slate-900">
        <a href={`/hires/user/${hire.userId}`}>{hire.name || null}</a>
      </td>
      <td className="px-4 py-3 w-[28%] text-sm text-slate-700">{hire.startDate || null}</td>
      <td className="px-4 py-3 w-[22%] text-sm text-slate-700">{hire.lastUpdatedBy || null}</td>
      <td className="px-4 py-3 w-[22%] text-sm text-slate-700">{hire.taskName || null}</td>
    </tr>
  );
}

// {
//     newHireName:,
// startDate:,
// lastUpdatedBy:,
// currentTask:,
// }
