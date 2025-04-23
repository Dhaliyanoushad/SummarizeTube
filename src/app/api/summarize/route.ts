import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function POST(req: Request) {
  const transcript = await req.json().then((data) => data.transcript);
  if (!transcript) {
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
            content: `Summarize the following YouTube transcript into a paragraph. Do not exceed 200 words. Do not use dashes or bullets. Keep the paragraph concise and meaningful:\n\n${transcript}`,
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

    return NextResponse.json({ summary });
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
