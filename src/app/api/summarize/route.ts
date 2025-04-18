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
            content: `Summarize the following YouTube transcript into exactly 5 bullet points. Use a numbered list format with Arabic numerals like '1.', '2.', etc. Do not use dashes or bullets. Keep each point concise and meaningful:\n\n${transcript}`,
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
