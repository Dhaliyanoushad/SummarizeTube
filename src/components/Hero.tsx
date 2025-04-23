import React from "react";
import { useState } from "react";
import axios, { AxiosError } from "axios";

const Hero = () => {
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

    const videoIdExtracted = extractVideoId(ytLink);

    setVideoId(videoIdExtracted);

    console.log("Video ID:", videoIdExtracted);
    if (!videoIdExtracted) {
      setError("Invalid YouTube link");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }

    setIsLoading(true);
    try {
      // fetching transcript
      const transcriptRes = await axios.post("/api/transcript", {
        videoId: videoIdExtracted,
      });
      console.log("Transcript response:", transcriptRes.data);
      const transcript = transcriptRes.data.transcript;
      console.log(transcript);

      setAuthor(transcriptRes.data.metadata.author);
      setTitle(transcriptRes.data.metadata.title);
      // console.log(author, title);

      // fetching summary
      const summaryRes = await axios.post("/api/summarize", {
        transcript,
      });
      const summary = summaryRes.data.summary;

      setSummary(summary);
    } catch (err) {
      const error = err as AxiosError<{
        errorMessage?: string;
        error?: string;
      }>;

      const backendMessage =
        error.response?.data?.errorMessage || error.response?.data?.error;
      console.log(error.response?.data?.errorMessage);

      setError(
        backendMessage || "An error occurred while summarizing the video."
      );

      console.error("Error summarizing:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#030303] max-w-4xl">
          Transform YouTube Videos into Summaries and Flashcards
        </h1>
        <p className="mt-6 text-xl text-[#030303]/80 max-w-2xl">
          Learn faster and retain more with AI-powered summaries and flashcards
          from any YouTube video.
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
              frameBorder="0"
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

        {/* Display Error */}
        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
      </div>
    </section>
  );
};

export default Hero;
