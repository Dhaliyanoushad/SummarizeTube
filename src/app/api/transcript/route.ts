import { NextResponse } from "next/server";
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

    return NextResponse.json({ transcript, metadata: data.metadata });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error in summarizing:", errorMessage);
    return NextResponse.json({ errorMessage: errorMessage }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "GET works!" });
}
