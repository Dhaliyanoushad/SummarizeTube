"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SummaryPage() {
  const [summary, setSummary] = useState({
    title: null,
    author: null,
    summary: null,
    flashcards: [],
  });
  //   const [isLoading, setIsLoading] = useState<boolean>(true); // state to hold loading status
  //   const [error, setError] = useState<string | null>(null); // state to hold error messages

  const params = useParams(); // get the params from the URL
  const { id } = params; // get the id from the request
  const fetchSummaries = async () => {
    try {
      const response = await axios.get(`/api/summaries/${id}`); // Your API endpoint to fetch summaries
      console.log(response.data);
      setSummary(response.data);
    } catch (err) {
      console.error(`Failed to load summaries ${err}`);
    } finally {
      //   setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSummaries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-800 mb-2">{summary.title}</h1>
      <p className="text-gray-600 mb-4">by {summary.author}</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">Summary</h2>
        <p className="bg-gray-800 p-4 rounded">{summary.summary}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Flashcards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {summary.flashcards.map((card: string, index: number) => (
            <div
              key={index}
              className="bg-blue-950 shadow-md border border-blue-200 p-4 rounded hover:shadow-lg transition"
            >
              {card}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
