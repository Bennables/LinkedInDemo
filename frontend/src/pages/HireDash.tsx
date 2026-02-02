 import React, { useMemo, useState } from "react";
 import '../index.css'
 import { HireRow } from "./components/TableHire";
 import { useEffect } from "react";
 import axios from "axios";



/**
 * Row shape (customize as you like):
 * {
 *   id: string;
 *   newHireName: string;
 *   startDate: string;       // e.g. "2026-01-19" or "Jan 19, 2026"
 *   lastUpdatedBy: string;
 *   currentTask: string;
 * }
 */

export default function NewHiresTablePage({
  rows = [],
  title = "New Hires",
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState({ key: "newHireName", dir: "asc" });
  const [data,setData] = useState([])
  const url = import.meta.env.VITE_SERVER_URL

  console.log(url)
  useEffect(()=>{
    
    const getHires = async () => {
      const res = await axios.get(`${url}/api/hires`);
      setData(res.data.data)
    }
    getHires();
  }, [])

  const filteredData = useMemo(() => {
    if (!query.trim()) return data;
    return data.filter(hire =>
      hire.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, data])
  
  return (
    <div className="min-h-screen bg-white">
      


      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
        </div>

        {/* Search bar */}
        <div className="mb-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search By New Hire Name"
            className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>

        {/* Table */}
        <div className="rounded-md border border-slate-200 h-96 overflow-hidden">
          <div className="overflow-x-auto overflow-y-auto h-full">
            <table className="min-w-full table-fixed">
              <thead className="sticky top-0 z-10">
                <tr className="border-b border-slate-200">
                  <th
                    scope="col"
                    className="w-[38%] cursor-pointer select-none bg-slate-700 px-4 py-3 text-left text-sm font-semibold text-white"
                  >Hire
                    <span className="inline-flex items-center">
                    </span>
                  </th>

                  <th
                    scope="col"
                    className="w-[18%] bg-slate-600 px-4 py-3 text-left text-sm font-semibold text-white"
                  >
                    Start Date
                  </th>
                  <th
                    scope="col"
                    className="w-[22%] bg-slate-600 px-4 py-3 text-left text-sm font-semibold text-white"
                  >
                    Last Updated By
                  </th>
                  <th
                    scope="col"
                    className="w-[22%] bg-slate-600 px-4 py-3 text-left text-sm font-semibold text-white"
                  >
                    Current Task
                  </th>
                </tr>
              </thead> 
              <tbody className=" min-h-auto h-200px overflow-scroll">   
                {filteredData.map(entry => (

                  <HireRow hire={entry}/>
                ))}
                  
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
    newHireName: "Ava Nguyen",
    startDate: "2026-01-22",
    lastUpdatedBy: "Jordan",
    currentTask: "Complete I-9 & onboarding for
    */
