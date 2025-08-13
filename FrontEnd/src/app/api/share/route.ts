import { nanoid } from "nanoid";
import { Snippet } from "@/types/snippet";
import { getDB } from "@/lib/mongo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Validate request body
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body" }, 
        { status: 400 }
      );
    }

    const { code } = body;

    if (typeof code !== "string" || code.trim() === "") {
      return NextResponse.json(
        { error: "Valid code is required" }, 
        { status: 400 }
      );
    }

    // Validate code length (prevent extremely long snippets)
    if (code.length > 100000) { // 100KB limit
      return NextResponse.json(
        { error: "Code snippet too long. Maximum 100KB allowed." }, 
        { status: 400 }
      );
    }

    const db = await getDB();
    const collection = db.collection<Snippet>("snippets");

    const id = nanoid(9);

    try {
      await collection.insertOne({
        _id: id,
        code,
        createdAt: new Date(),
      });
    } catch (dbError) {
      console.error("Database error inserting snippet:", dbError);
      return NextResponse.json(
        { error: "Failed to save code snippet. Please try again." }, 
        { status: 500 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const url = `${baseUrl}/share/${id}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Unexpected error in share API:", error);
    
    // Don't expose internal errors to client
    return NextResponse.json(
      { error: "Internal server error. Please try again later." }, 
      { status: 500 }
    );
  }
}

// Add OPTIONS method for CORS if needed
export async function OPTIONS() {
  return new NextResponse(null, { status: 200 });
}
