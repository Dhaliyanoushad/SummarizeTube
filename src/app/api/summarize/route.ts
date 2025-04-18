// app/api/summarize/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { transcript } = await req.json();

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "user",
            content: `Summarize the following YouTube transcript into 5 bullet points:\n\n${transcript}`,
          },
        ],
      }),
    }
  );

  const data = await response.json();
  console.log("Response from OpenRouter:", data.choices?.[0]?.message?.content);

  return NextResponse.json({
    summary: data.choices?.[0]?.message?.content || "No summary.",
  });
}
