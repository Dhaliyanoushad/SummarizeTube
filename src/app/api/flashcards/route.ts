import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function POST(req: Request) {
  const summary = await req.json().then((data) => data.summary);
  if (!summary) {
    return NextResponse.json({ error: "Missing transcript" }, { status: 400 });
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "user",
            content: `Summarize the following YouTube transcript into exactly 10 flashcards for easy learning. Use a numbered list format with Arabic numerals like '1.', '2.', etc. Do not use dashes or bullets. Keep each point concise and meaningful with maximum 10 words:\n\n${summary}`,
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

    const flashcardsRes = response.data?.choices?.[0]?.message?.content;
    const flashcards = flashcardsRes
      .trim()
      .replace(/^\d+\.\s*/, "")
      .split(/\d+\.\s+/)
      .filter(Boolean);
    if (!flashcards) {
      throw new Error("Failed to generate summary");
    }

    // console.log("Response from OpenRouter:", summary);

    return NextResponse.json({ flashcards });
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
