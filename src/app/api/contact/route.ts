import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Contact from "@/model/Contact";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

