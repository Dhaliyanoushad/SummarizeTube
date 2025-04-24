"use client";

import { Key, useState } from "react";
import axios from "axios";
import { useSidebarAction } from "../../context/SidebarActionContext";
import toast from "react-hot-toast";

export default function SummaryForm() {
  const { refreshSidebar } = useSidebarAction();

  const [ytLink, setYtLink] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState([]);

  const extractVideoId = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([\w-]{11})/
    );
    return match ? match[1] : null;
  };

  const handleSummarize = async () => {
    setError(null);
    setSummary("");
    setAuthor("");
    setTitle("");
    setFlashcards([]);

    const videoId = extractVideoId(ytLink);

    setVideoId(videoId);
    if (!videoId) {
      setError("Invalid YouTube link");
      return;
    }

    setIsLoading(true);
    try {
      const transcriptRes = await axios.post("/api/transcript", {
        videoId,
      });
      const transcript = transcriptRes.data.transcript;
      setAuthor(transcriptRes.data.metadata.author);
      setTitle(transcriptRes.data.metadata.title);

      const summaryRes = await axios.post("/api/summarize", {
        transcript,
      });
      const summary = summaryRes.data.summary;

      setSummary(summary);
    } catch (error) {
      setError("An error occurred while summarizing the video.");
      console.error("Error summarizing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFlashCards = async () => {
    setFlashcards([]);
    if (!summary) return;
    try {
      const response = await axios.post("/api/flashcards", {
        summary,
      });
      const flashcards = response.data.flashcards;
      console.log("Flashcards:", flashcards);

      setFlashcards(flashcards);

      if (response.status === 200) {
        toast.success("Flashcards created successfully!");
      } else {
        toast.error("Failed to create flashcards.");
      }
    } catch (error) {
      console.error("Error creating flashcards:", error);
      alert("An error occurred while creating the flashcards.");
    }
  };

  const handleSave = async () => {
    if (!summary) return;
    try {
      const response = await axios.post("/api/summaries", {
        videoId,
        title,
        author,
        summary,
        flashcards,
      });

      if (response.status === 200) {
        toast.success("Summary saved successfully!");
        refreshSidebar();
      } else {
        toast.error("Failed to save summary.");
      }
    } catch (error) {
      console.error("Error saving summary:", error);
      alert("An error occurred while saving the summary.");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-20 text-[#030303]">
      <h1 className="text-5xl font-semibold mb-6 text-center tracking-tight text-[#123458]">
        YouTube AI <span className="text-[#123458]">Summary</span>
      </h1>
      <p className="text-xl text-center mb-16 max-w-2xl mx-auto font-light leading-relaxed text-[#123458]">
        Transform lengthy video transcripts into concise summaries with the
        power of AI.
      </p>

      <div className="max-w-3xl mx-auto rounded-3xl p-8 border shadow-2xl bg-[#D4C9BE] border-[#123458]">
        <input
          type="text"
          className="w-full border-0 rounded-2xl p-6 focus:ring-2 focus:outline-none shadow-inner bg-[#F1EFEC] text-[#030303]"
          placeholder="Paste a YouTube video link..."
          value={ytLink}
          onChange={(e) => setYtLink(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSummarize();
            }
          }}
        />
        {error && (
          <p className="text-sm mt-2 flex justify-center text-[#d00000]">
            {error}
          </p>
        )}
        <div className="mt-6 flex justify-center gap-4">
          <button
            className={`px-10 py-3 font-medium rounded-full shadow-lg transition-all duration-300 ease-in-out bg-[#123458] text-[#F1EFEC] ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            onClick={handleSummarize}
            disabled={isLoading || !ytLink.trim()}
          >
            {isLoading ? "Processing..." : "Summarize"}
          </button>
          <button
            className={`px-10 py-3 font-medium rounded-full shadow-lg transition-all duration-300 ease-in-out bg-[#123458] text-[#F1EFEC] ${
              isLoading || !summary ? "opacity-70 cursor-not-allowed" : ""
            }`}
            onClick={handleFlashCards}
            disabled={!summary}
          >
            Create Flashcards
          </button>
        </div>
        {summary && (
          <div className="mt-10 p-6 rounded-2xl border border-[#123458] bg-[#F1EFEC]">
            <h3 className="text-xl font-medium mb-4 text-[#123458]">
              Summary of <span className="font-bold">{title}</span> by{" "}
              <span className="font-bold">{author}</span>
            </h3>
            <p className="space-y-2 leading-relaxed text-[#030303]">
              {summary}
            </p>
          </div>
        )}
        {flashcards.length > 0 && (
          <div className="mt-10 p-6 rounded-2xl border border-[#123458] bg-[#F1EFEC]">
            <h3 className="text-xl font-medium mb-4 text-[#123458]">
              FLASHCARDS
            </h3>
            <ul className="list-decimal list-inside space-y-2 leading-relaxed text-[#030303]">
              {flashcards.map((point: string, idx: Key | null | undefined) => (
                <li key={idx}>{point.trim()}</li>
              ))}
            </ul>
          </div>
        )}
        {summary && (
          <div className="mt-6 flex justify-center">
            <button
              className="px-10 py-3 font-medium rounded-full shadow-lg transition-all duration-300 ease-in-out bg-[#123458] text-[#F1EFEC]"
              onClick={handleSave}
            >
              Save Summary
            </button>
          </div>
        )}
      </div>
      <div className="mt-20 text-center">
        <p className="text-sm opacity-70 text-[#123458]">
          Designed to help you study smarter, not harder.
        </p>
      </div>
    </div>
  );
}
