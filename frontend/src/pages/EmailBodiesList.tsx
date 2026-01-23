import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

interface EmailBody {
  id: number;
  content?: string;
  companyId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export default function EmailBodiesList() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<EmailBody[]>([]);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const getBodies = async () => {
      try {
        //!get the body ids from the user data
        const res = await axios.get(`${url}/api/bodies/1`);
        setData(res.data.data || []);
      } catch (err) {
        console.error("Error fetching email bodies:", err);
      } finally {
        setLoading(false);
      }
    };
    getBodies();
  }, [url]);

  const filteredData = useMemo(() => {
    if (!query.trim()) return data;
    return data.filter((body) =>
      body.content?.toLowerCase().includes(query.toLowerCase()) ||
      body.id.toString().includes(query)
    );
  }, [query, data]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Bodies</h1>
          <p className="text-gray-600">Create and manage email templates</p>
        </div>

        {/* Search bar */}
        <div className="mb-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by content or ID..."
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Add New Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/email-bodies/new")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + New Email Body
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No email bodies found
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 overflow-hidden shadow">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-100">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((body) => (
                    <tr
                      key={body.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        #{body.id}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => navigate(`/email-bodies/${body.id}`)}
                          className="text-blue-600 hover:text-blue-800 font-medium transition"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
