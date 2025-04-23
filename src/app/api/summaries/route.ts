import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongoose";
import Summary from "../../../../models/summary";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { videoId, title, author, summary, flashcards } = body;

    if (!videoId || !title || !author || !summary || !flashcards) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newSummary = new Summary({
      userId,
      videoId,
      title,
      author,
      summary,
      flashcards,
    });

    await newSummary.save();

    return NextResponse.json({ message: "Summary saved successfully!" });
  } catch (error) {
    console.error("Error saving summary:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { userId } = await auth(); // current authenticated user

    if (!userId) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const summaries = await Summary.find({ userId: userId });

    if (!summaries || summaries.length === 0) {
      return NextResponse.json(
        { message: "No summaries found" },
        { status: 200 }
      );
    }

    return NextResponse.json(summaries, { status: 200 });
  } catch (error) {
    console.error("Error getting summaries:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
