"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function SummaryForm() {
  const [ytLink, setYtLink] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);

  const extractVideoId = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([\w-]{11})/
    );
    // console.log("Extracted video ID:", match);

    return match ? match[1] : null;
  };

  const handleSummarize = async () => {
    // reset
    setError(null);
    setSummary("");
    setAuthor("");
    setTitle("");
    // setFlashcards([]);

    const videoId = extractVideoId(ytLink);

    setVideoId(videoId);
    if (!videoId) {
      setError("Invalid YouTube link");
      // alert("Invalid YouTube link");
      return;
    }

    setIsLoading(true);
    try {
      // fetching transcript
      const transcriptRes = await axios.post("/api/transcript", {
        videoId,
      });
      const transcript = transcriptRes.data.transcript;
      setAuthor(transcriptRes.data.metadata.author);
      setTitle(transcriptRes.data.metadata.title);
      // console.log(author, title);

      // fetching summary
      const summaryRes = await axios.post("/api/summarize", {
        transcript,
      });
      const summary = summaryRes.data.summary;

      setSummary(summary);
      toast.success("Video summarized successfully!", {
        style: {
          background: "#F1EFEC",
          color: "#123458",
          fontWeight: "bold",
          border: "1px solid #D4C9BE",
        },
        iconTheme: {
          primary: "#123458",
          secondary: "#FFF",
        },
      });
    } catch (error) {
      let message = "An error occurred while summarizing the video.";

      if (axios.isAxiosError(error)) {
        const backendMsg = error.response?.data?.errorMessage;
        if (backendMsg) {
          message = backendMsg;
        }
      }

      setError(message);

      toast.error(message, {
        style: {
          background: "#F1EFEC",
          color: "#030303",
          fontWeight: "bold",
          border: "1px solid #D4C9BE",
        },
        iconTheme: {
          primary: "#030303",
          secondary: "#FFF",
        },
      });

      console.error("Error summarizing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="pt-32 pb-20 px-4 bg-[#F1EFEC]">
      <div className="container mx-auto flex flex-col items-center text-center">
        {" "}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#030303] max-w-4xl">
          Transform YouTube Videos into Summaries and Flashcards
        </h1>
        <p className="mt-6 text-xl text-[#030303]/80 max-w-2xl">
          Turn any YouTube video into clear, concise summaries and flashcards -
          powered by AI, designed for smarter learning.
        </p>
        <div className="mt-12 w-full max-w-2xl">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Paste YouTube URL here"
              className="flex-1 px-4 py-3 rounded-lg border border-[#D4C9BE] bg-white text-[#030303] focus:outline-none focus:ring-2 focus:ring-[#123458] w-full"
              value={ytLink}
              onChange={(e) => setYtLink(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSummarize();
                }
              }}
            />

            <button
              className={`px-6 py-3 bg-[#123458] text-[#F1EFEC] rounded-lg hover:bg-[#123458]/90 transition-colors w-full sm:w-auto ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              onClick={handleSummarize}
              disabled={isLoading || !ytLink.trim()}
            >
              {isLoading ? "Processing..." : "Summarize"}
            </button>
          </div>
          <p className="mt-3 text-sm text-[#030303]/60">
            Try it now! No account required!
          </p>
        </div>
        {/* Embed YouTube video */}
        {videoId && (
          <div className="mt-10 w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-xl">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        {/* Display Summary */}
        {summary && (
          <div className="mt-10 w-full max-w-2xl bg-[#D4C9BE]/30 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-[#030303] mb-4">
              Summary of <span className="text-[#2865a8]">{title}</span> by{" "}
              <span className="text-[#2865a8]">{author}</span>
            </h2>
            <p className="text-[#030303]/80">{summary}</p>
          </div>
        )}
      </div>
    </section>
  );
}
