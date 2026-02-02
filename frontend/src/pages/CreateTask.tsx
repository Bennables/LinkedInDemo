import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "../index.css";

export default function CreateTask() {
  const [taskName, setTaskName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_SERVER_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!taskName.trim()) {
      setError("Task name is required");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${url}/api/task`, {
        name: taskName.trim(),
      });

      // Navigate back to Tasks list on success
      navigate("/tasks");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create Task");
      console.error("Error creating Task:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="mx-auto max-w-2xl justify-center px-4 py-6 w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">
            Create New Task
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Add a new Task to your organization
          </p>
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="taskName"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Task Name
              </label>
              <input
                id="taskName"
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter task name"
                className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-md bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Creating..." : "Create Task"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/tasks")}
                disabled={loading}
                className="flex-1 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:bg-slate-100 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
