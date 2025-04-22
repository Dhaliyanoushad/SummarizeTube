"use client";

import { useState } from "react";
import axios from "axios";

export default function SummaryForm() {
  const [ytLink, setYtLink] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractVideoId = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([\w-]{11})/
    );
    console.log("Extracted video ID:", match);

    return match ? match[1] : null;
  };

  const handleSummarize = async () => {
    const videoId = extractVideoId(ytLink);
    if (!videoId) {
      setError("Invalid YouTube link");
      // alert("Invalid YouTube link");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("/api/summarize", {
        videoId,
      });

      const data = res.data;
      setSummary(data.summary);
    } catch (error) {
      setError("An error occurred while summarizing the video.");
      console.error("Error summarizing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto backdrop-blur-lg bg-blue-950/30 rounded-3xl p-8 border border-blue-800/40 shadow-2xl">
      <input
        type="text"
        className="w-full bg-blue-900/30 border-0 rounded-2xl p-6 text-blue-50 placeholder-blue-400/70 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-inner backdrop-blur-sm"
        placeholder="Enter a YouTube video link..."
        value={ytLink}
        onChange={(e) => setYtLink(e.target.value)}
      />

      {error && (
        <p className="text-red-500 text-sm mt-2 flex justify-center ">
          {error}
        </p>
      )}
      <div className="mt-6 flex justify-center">
        <button
          className={`px-10 py-3 bg-blue-500 text-white font-medium rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 ease-in-out ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          onClick={handleSummarize}
          disabled={isLoading || !ytLink.trim()}
        >
          {isLoading ? "Processing..." : "Summarize"}
        </button>
      </div>

      {summary && (
        <div className="mt-10 p-6 bg-blue-900/20 backdrop-blur-md rounded-2xl border border-blue-700/30">
          <h3 className="text-xl font-medium text-blue-200 mb-4">Summary</h3>
          <ul className="list-decimal list-inside space-y-2 text-blue-100 leading-relaxed">
            {summary
              .trim()
              .replace(/^\d+\.\s*/, "")
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
