 import React, { useMemo, useState } from "react";
 import '../index.css'
import { TaskRow } from "./components/TaskRow"
import { useEffect } from "react";
import axios from "axios";



export default function TaskTable({
  rows = [],
  title = "Tasks",
}) {
  const [query, setQuery] = useState("");
  const [data,setData] = useState([])
  const url = import.meta.env.VITE_SERVER_URL

  useEffect(()=>{
    
    const getTasks = async () => {
      const res = await axios.get(`${url}/api/task`);
      console.log(res.data);
      setData(res.data.data)
      console.log(res.data.data);
    }
    getTasks();
  }, [])

  const filteredData = useMemo(() => {
    if (!query.trim()) return data;
    return data.filter(task =>{
      task.name?.toLowerCase().includes(query.toLowerCase())}
    )
  }, [query,data])
  return (
    <div className="flex flex-col min-h-screen bg-white">
      


      <div className="mx-auto max-w-6xl justify-center px-4 py-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
        </div>

        {/* Search bar */}
        <div className="mb-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Task Name"
            className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>

        {/* Table */}
        <div className="rounded-md border min-w-2xs border-slate-200 h-96 overflow-hidden">
          <div className="overflow-x-auto justify-center overflow-y-auto h-full">
            <table className="min-w-full table-fixed">
              <thead className="sticky top-0 z-10">
                <tr className="border-b border-slate-200">
                  <th
                    scope="col"
                    className="w-[50%] cursor-pointer select-none bg-slate-700 px-4 py-3 text-left text-sm font-semibold text-white">Task
                    <span className="inline-flex items-center">
                    </span>
                  </th>
                </tr>
              </thead> 
              <tbody className=" min-h-auto h-200px overflow-scroll">   
                {filteredData && filteredData.map(entry => (
                  <TaskRow task={entry}/>
                ))}
                <tr
      className={`hover:bg-gray-100   ${onclick ? "cursor-pointer" : ""}`}
    
    >  
  <a href={`/tasks/new`}>
      <td className="px-4 py-3 flex justify-center text-sm border-2 rounded-xl border-white hover:border-gray-400 font-medium text-slate-900">
        
        <img src="/icons/plus.svg"/>
      </td>
    </a>
    </tr>
                  
              </tbody>
            </table>
          </div>
        </div>

        {/* Optional: footer / count */}

      </div>
    </div>
  );
}

/* Example usage:

const rows = [
  {
    id: "1",
    newDepartmentName: "Ava Nguyen",
    startDate: "2026-01-22",
    lastUpdatedBy: "Jordan",
    currentTask: "Complete I-9 & onboarding for
    */
