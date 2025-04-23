"use client";

// /components/Sidebar.tsx
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

  // Fetch summaries from your backend
  const fetchSummaries = async () => {
    try {
      const response = await axios.get("/api/summaries"); // Your API endpoint to fetch summaries
      if (response.data.message == "No summaries found") {
        setError(response.data.message);
        return;
      }
      // console.log("dools", response.data);
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
      await axios.delete(`/api/summaries/${id}`); // Your API endpoint to delete summaries
      // alert("Summary deleted successfully!");
      fetchSummaries();
      setSummaries((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(`Failed to delete summary ${err}`);
    }
  };

  useEffect(() => {
    fetchSummaries();
    setRefreshSidebar(() => fetchSummaries); // register
  }, []);

  if (isLoading) {
    return (
      <div className="sidebar bg-blue-900 p-6 w-64 h-screen text-white">
        <p>Loading summaries...</p>
      </div>
    );
  }

  return (
    <div className="sidebar bg-blue-900 p-6 w-64 h-screen text-white">
      <h2 className="text-xl font-bold text-blue-200">Saved Summaries</h2>
      {summaries.length > 0 && (
        <ul className="mt-4 space-y-2">
          {summaries.map((item) => (
            <li key={item._id}>
              <Link
                href={`/dashboard/summary/${item._id}`}
                className="block p-2 rounded hover:bg-blue-700"
              >
                {item.title}
              </Link>
              <button onClick={() => handleDelete(item._id)}>🗑️</button>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default Sidebar;
