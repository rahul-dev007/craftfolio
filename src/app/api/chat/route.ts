// src/app/api/chat/route.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const preferredRegion = "auto"; // optional: vercel hint

const K = 6;

const SYSTEM_PROMPT = `You are "Rahul's Portfolio Assistant".
Answer concisely in the user's language (Bengali if the question is in Bengali; otherwise English).
Only use the provided context about Rahul. If the answer is not in the context, say you don't know.
Format with short bullets where helpful, and reference source titles in square brackets.`;

// --- helpers ---
function need(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set`);
  return v;
}

// try importing local embed; if missing, return null (we'll fallback)
async function getLocalEmbed() {
  try {
    const mod = await import("@/lib/local-embed");
    return mod.embedLocal as (text: string) => Promise<number[]>;
  } catch {
    return null;
  }
}

// try importing OpenAI helper; if missing, we’ll call REST directly or fallback
async function getOpenAI() {
  try {
    const mod = await import("@/lib/ai");
    // expecting: openai.chat.completions.create and GENERATION_MODEL
    return {
      client: (mod as any).openai ?? null,
      model: (mod as any).GENERATION_MODEL ?? "gpt-4o-mini",
      baseUrl: (mod as any).OPENAI_BASE_URL ?? process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1",
    };
  } catch {
    return {
      client: null,
      model: process.env.AI_MODEL || "gpt-4o-mini",
      baseUrl: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
    };
  }
}

async function embedWithFallback(text: string) {
  // 1) prefer local embed
  const embedLocal = await getLocalEmbed();
  if (embedLocal) {
    try {
      return await embedLocal(text);
    } catch {
      // continue to REST fallback
    }
  }
  // 2) fallback: OpenAI embeddings (if key exists)
  const key = process.env.OPENAI_API_KEY;
  if (key) {
    const model = process.env.EMBEDDING_MODEL || "text-embedding-3-small";
    const r = await fetch((process.env.OPENAI_BASE_URL || "https://api.openai.com/v1") + "/embeddings", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ model, input: text }),
    });
    if (r.ok) {
      const j = await r.json();
      return j?.data?.[0]?.embedding as number[] | undefined;
    }
  }
  // 3) ultimate fallback
  return undefined;
}

function buildContext(results: any[]) {
  const ctx = results
    .map((r: any, i: number) => `(${i + 1}) [${r.source ?? r.title ?? "source"}] ${r.text ?? ""}`)
    .join("\n\n")
    .slice(0, 7000);
  return ctx;
}

async function answerWithLLM({
  question,
  context,
}: {
  question: string;
  context: string;
}) {
  const { client, model, baseUrl } = await getOpenAI();
  const user = context
    ? `Question: ${question}\n\nContext:\n${context}`
    : question;

  // 1) If an SDK client exists, try it
  if (client?.chat?.completions?.create) {
    const completion = await client.chat.completions.create({
      model,
      temperature: 0.2,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: user },
      ],
    });
    return completion?.choices?.[0]?.message?.content ?? "";
  }

  // 2) REST call (no SDK)
  const apiKey = need("OPENAI_API_KEY");
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: user },
      ],
    }),
  });
  if (!res.ok) throw new Error(`OpenAI error: ${await res.text()}`);
  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? "";
}

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    if (!question || typeof question !== "string") {
      return NextResponse.json({ success: false, error: "question is required" }, { status: 400 });
    }

    // --- vector query
    const qvec = await embedWithFallback(question);
    const db = await getDB();
    const col = db.collection("knowledge");

    let results: any[] = [];
    if (qvec && Array.isArray(qvec)) {
      try {
        results = await col
          .aggregate([
            {
              $vectorSearch: {
                index: "vector_index",
                path: "embedding",
                queryVector: qvec,
                numCandidates: 200,
                limit: K,
              },
            },
            { $project: { text: 1, source: 1, title: 1, score: { $meta: "vectorSearchScore" } } },
          ])
          .toArray();
      } catch (e) {
        // $vectorSearch not available (local dev / index missing) → graceful fallback
        results = await col.find({}, { projection: { text: 1, source: 1, title: 1 } }).limit(K).toArray();
      }
    } else {
      // no embeddings available → fallback to last K docs
      results = await col.find({}, { projection: { text: 1, source: 1, title: 1 } }).limit(K).toArray();
    }

    const context = buildContext(results);

    // Try LLM; if it fails, send extractive fallback
    try {
      const answer = await answerWithLLM({ question, context });
      return NextResponse.json({
        success: true,
        answer: answer || "Sorry, no answer.",
        meta: {
          hits: results.map((r: any) => ({ source: r.source ?? r.title ?? "source", score: r.score ?? null })),
          grounded: Boolean(context),
        },
      });
    } catch (e: any) {
      const fallback = context
        ? "Here are the most relevant details I found:\n\n" +
          results
            .map((r: any) => `• [${r.source ?? r.title ?? "source"}] ${String(r.text ?? "").slice(0, 220)}${(r.text?.length ?? 0) > 220 ? "..." : ""}`)
            .join("\n")
        : "Sorry, I couldn't find information in the knowledge base.";
      return NextResponse.json({
        success: true,
        answer: `${fallback}\n\n_(Fallback mode — model unavailable)_`,
        meta: {
          hits: results.map((r: any) => ({ source: r.source ?? r.title ?? "source", score: r.score ?? null })),
          grounded: Boolean(context),
        },
      });
    }
  } catch (err: any) {
    console.error("CHAT ERROR", err);
    return NextResponse.json({ success: false, error: err?.message ?? "Unknown error" }, { status: 500 });
  }
}
