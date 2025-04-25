import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "../../../../../lib/mongoose";
import Summary from "../../../../../models/summary";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const { userId } = await auth();

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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const { userId } = await auth();

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
    console.error("Error deleting summary:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
