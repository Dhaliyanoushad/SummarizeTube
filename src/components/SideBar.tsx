"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSidebarAction } from "../../context/SidebarActionContext";

const Sidebar = () => {
  const { setRefreshSidebar } = useSidebarAction();

  interface Summary {
    _id: string;
    title: string;
  }

  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummaries = async () => {
    try {
      const response = await axios.get("/api/summaries");
      if (response.data.message === "No summaries found") {
        setError(response.data.message);
        return;
      }
      setSummaries(response.data);
      setError(null);
    } catch (err) {
      setError(`Failed to load summaries ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/summaries/${id}`);
      fetchSummaries();
      setSummaries((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(`Failed to delete summary ${err}`);
    }
  };

  useEffect(() => {
    fetchSummaries();
    setRefreshSidebar(() => fetchSummaries);
  }, []);

  if (isLoading) {
    return (
      <div className="sidebar p-6 w-64 h-full bg-[#102844] text-[#f5f3ef]">
        <p>Loading summaries...</p>
      </div>
    );
  }

  return (
    <div className="sidebar p-6 w-64 min-h-full bg-[#102844] text-[#f5f3ef]">
      <h2 className="text-xl font-bold mb-6">Saved Summaries</h2>
      {summaries.length > 0 && (
        <ul className="mt-4 space-y-2">
          {summaries.map((item) => (
            <li
              key={item._id}
              className="flex items-center justify-between rounded p-2 mb-2 bg-[#f5f3ef]/10 hover:bg-[#f5f3ef]/20 transition-all"
            >
              <Link
                href={`/dashboard/summary/${item._id}`}
                className="block flex-grow hover:text-opacity-80 transition-all"
              >
                {item.title}
              </Link>
              <button
                onClick={() => handleDelete(item._id)}
                className="ml-2 p-1 rounded transition-transform hover:scale-110 hover:bg-[#e74c3c]/30"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="mt-4 text-[#e74c3c]">{error}</p>}
    </div>
  );
};

export default Sidebar;
