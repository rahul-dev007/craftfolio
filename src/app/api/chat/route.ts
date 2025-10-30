import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/mongo";
import { openai, GENERATION_MODEL, EMBEDDING_MODEL } from "@/lib/ai";
import { embedLocal } from "@/lib/local-embed";
// src/app/api/chat/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const K = 6;

const SYSTEM_PROMPT = `You are "Rahul's Portfolio Assistant".
Answer concisely in the user's language (Bengali if the question is in Bengali; otherwise English).
Only use the provided context about Rahul. If the answer is not in the context, say you don't know.
Format with short bullets where helpful, and reference source titles in square brackets.`;

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "question is required" }, { status: 400 });
    }

    // ✅ Always use local embedding for the query too
    const qvec = await embedLocal(question);

    const db = await getDB();
    const col = db.collection("knowledge");

    const results = await col.aggregate([
      {
        $vectorSearch: {
          index: "vector_index",
          path: "embedding",
          queryVector: qvec,
          numCandidates: 200,
          limit: K,
        },
      },
      { $project: { text: 1, source: 1, score: { $meta: "vectorSearchScore" } } },
    ]).toArray();

    const context = results.map((r: any, i: number) => `(${i + 1}) [${r.source}] ${r.text}`).join("\n\n").slice(0, 7000);

    // --- Try OpenAI generation; if quota fails, fall back to context-only summary ---
    try {
      const completion = await openai.chat.completions.create({
        model: GENERATION_MODEL,
        temperature: 0.2,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Question: ${question}\n\nContext:\n${context}` },
        ],
      });

      const answer = completion.choices?.[0]?.message?.content ?? "Sorry, no answer.";
      return NextResponse.json({
        answer,
        meta: { hits: results.map((r: any) => ({ source: r.source, score: r.score })) },
      });
    } catch (e: any) {
      // Fallback: quick extractive summary without LLM (so UI still works)
      const fallback = context
        ? "Here are the most relevant details I found:\n\n" +
          results.map((r: any, i: number) =>
            `• [${r.source}] ${r.text.slice(0, 220)}${r.text.length > 220 ? "..." : ""}`
          ).join("\n")
        : "Sorry, I couldn't find information in the knowledge base.";

      return NextResponse.json({
        answer: fallback + "\n\n_(Fallback mode — model unavailable)_",
        meta: { hits: results.map((r: any) => ({ source: r.source, score: r.score })) },
      });
    }
  } catch (err: any) {
    console.error("CHAT ERROR", err);
    return NextResponse.json({ error: err?.message ?? "Unknown error" }, { status: 500 });
  }
}
