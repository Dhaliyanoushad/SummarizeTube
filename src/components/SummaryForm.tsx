// components/SummaryForm.tsx

"use client";

import { useState } from "react";

export default function SummaryForm() {
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");

  const handleSummarize = async () => {
    const res = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript }),
    });

    const data = await res.json();
    setSummary(data.summary);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <textarea
        className="w-full border rounded p-2 h-40"
        placeholder="Paste your YouTube transcript here..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleSummarize}
      >
        Summarize
      </button>

      {summary && (
        <div className="mt-4 p-4 bg-gray-100 rounded text-black">
          <h3 className="font-semibold mb-2">Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}
