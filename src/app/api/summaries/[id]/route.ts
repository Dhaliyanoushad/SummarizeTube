import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "../../../../../lib/mongoose";
import Summary from "../../../../../models/summary";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth(); // current authenticated user
    const { id } = params;

    if (!userId) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const summaries = await Summary.find({
      userId: userId,
      _id: id,
    }).lean();

    if (!summaries || summaries.length === 0) {
      return NextResponse.json(
        { message: "No summaries found" },
        { status: 404 }
      );
    }

    return NextResponse.json(summaries[0], { status: 200 });
  } catch (error) {
    console.error("Error getting summaries:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth(); // current authenticated user
    const { id } = params;

    if (!userId) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const summary = await Summary.findOneAndDelete({
      _id: id,
      userId: userId,
    }).lean();

    if (!summary) {
      return NextResponse.json(
        { message: "No summaries found" },
        { status: 404 }
      );
    }

    return NextResponse.json(summary, { status: 200 });
  } catch (error) {
    console.error("Error getting summaries:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
