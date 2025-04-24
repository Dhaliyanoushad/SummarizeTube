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
      <div
        className="sidebar p-6 w-64 h-screen"
        style={{ backgroundColor: "#123458", color: "#F1EFEC" }}
      >
        <p>Loading summaries...</p>
      </div>
    );
  }

  return (
    <div
      className="sidebar p-6 w-64 h-screen"
      style={{ backgroundColor: "#123458", color: "#F1EFEC" }}
    >
      <h2 className="text-xl font-bold mb-6" style={{ color: "#F1EFEC" }}>
        Saved Summaries
      </h2>
      {summaries.length > 0 && (
        <ul className="mt-4 space-y-2">
          {summaries.map((item) => (
            <li
              key={item._id}
              className="flex items-center justify-between rounded p-2 mb-2"
              style={{ backgroundColor: "rgba(212, 201, 190, 0.1)" }}
            >
              <Link
                href={`/dashboard/summary/${item._id}`}
                className="block flex-grow hover:text-opacity-80 transition-all"
                style={{ color: "#F1EFEC" }}
              >
                {item.title}
              </Link>
              <button
                onClick={() => handleDelete(item._id)}
                className="ml-2 p-1 rounded transition-colors cursor-pointer hover:scale-110"
                style={{
                  backgroundColor: "rgba(212, 201, 190, 0.2)",
                  color: "#F1EFEC",
                }}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && (
        <p className="mt-4" style={{ color: "#D4C9BE" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Sidebar;
