"use client";

import { useState } from "react";

export default function SummaryForm() {
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (!transcript.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });

      const data = await res.json();
      setSummary(data.summary);
    } catch (error) {
      console.error("Error summarizing transcript:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto backdrop-blur-lg bg-blue-950/30 rounded-3xl p-8 border border-blue-800/40 shadow-2xl">
      <textarea
        className="w-full bg-blue-900/30 border-0 rounded-2xl p-6 h-48 text-blue-50 placeholder-blue-400/70 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none shadow-inner backdrop-blur-sm"
        placeholder="Paste your YouTube transcript here..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />

      <div className="mt-6 flex justify-center">
        <button
          className={`px-10 py-3 bg-blue-500 text-white font-medium rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 ease-in-out ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          onClick={handleSummarize}
          disabled={isLoading || !transcript.trim()}
        >
          {isLoading ? "Processing..." : "Summarize"}
        </button>
      </div>

      {summary && (
        <div className="mt-10 p-6 bg-blue-900/20 backdrop-blur-md rounded-2xl border border-blue-700/30">
          <h3 className="text-xl font-medium text-blue-200 mb-4">Summary</h3>
          {/* <p className="text-blue-100 leading-relaxed">{summary}</p> */}

          <ul className="list-decimal list-inside space-y-2 text-blue-100 leading-relaxed">
            {summary
              .trim()
              .replace(/^\d+\.\s*/, "") // remove the leading "1. " at the very start
              .split(/\d+\.\s+/)
              .filter(Boolean)
              .map((point, idx) => (
                <li key={idx}>{point.trim()}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
