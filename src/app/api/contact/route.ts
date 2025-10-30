import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongo";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "All fields (name, email, message) are required." },
        { status: 400 }
      );
    }

    // ✔️ Correct email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format." },
        { status: 400 }
      );
    }

    const db = await getDB();
    const collection = db.collection("contacts");

    const result = await collection.insertOne({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      message: String(message).trim(),
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Message received successfully!",
      id: result.insertedId,
    });
  } catch (err: any) {
    console.error("Error in contact route:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await getDB();
    const messages = await db
      .collection("contacts")
      .find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    return NextResponse.json({ success: true, messages });
  } catch (err: any) {
    console.error("Error fetching contacts:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
