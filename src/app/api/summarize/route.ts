import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { YouTubeTranscriptApi } from "youtube-transcript-ts";

export async function POST(req: Request) {
  const videoId = await req.json().then((data) => data.videoId);
  if (!videoId) {
    return NextResponse.json({ error: "Missing videoId" }, { status: 400 });
  }

  try {
    const api = new YouTubeTranscriptApi();
    const data = await api.fetchTranscript(videoId);
    const transcriptArray = data.transcript.snippets;
    const transcript = transcriptArray
      ?.map((line: { text: string }) => line.text)
      .join(" ");

    if (!transcript) {
      return NextResponse.json(
        { error: "Missing transcript" },
        { status: 400 }
      );
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "user",
            content: `Summarize the following YouTube transcript into exactly 5 bullet points. Use a numbered list format with Arabic numerals like '1.', '2.', etc. Do not use dashes or bullets. Keep each point concise and meaningful:\n\n${transcript}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const summary = response.data?.choices?.[0]?.message?.content;
    if (!summary) {
      throw new Error("Failed to generate summary");
    }

    // console.log("Response from OpenRouter:", summary);

    return NextResponse.json({ summary, metadata: data.metadata });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Axios error:", error.response?.data || error.message);
      return NextResponse.json(
        { error: `API request failed: ${error.message}` },
        { status: 500 }
      );
    }

    console.error(
      "Error in summarizing:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
