import { nanoid } from "nanoid";
import { Snippet } from "@/types/snippet";
import { getDB } from "@/lib/mongo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (typeof code !== "string" || code.trim() === "") {
      return NextResponse.json({ error: "Valid code is required" }, { status: 400 });
    }

    const db = await getDB();
    const collection = db.collection<Snippet>("snippets");

    const id = nanoid(9);

    await collection.insertOne({
      _id: id,
      code,
      createdAt: new Date(),
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const url = `${baseUrl}/share/${id}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
