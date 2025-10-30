import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/mongo";
import type { IngestPayload, KnowledgeDoc } from "@/model/knowledge";
import { embedLocal } from "@/lib/local-embed";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function chunkText(text: string, maxTokensApprox = 900) {
  const words = text.split(/\s+/).filter(Boolean);
  const chunkWords = Math.max(50, Math.floor(maxTokensApprox * 0.75));
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += chunkWords) {
    chunks.push(words.slice(i, i + chunkWords).join(" "));
  }
  return chunks;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as IngestPayload;
    const { text, source, tags = [], lang = "auto", chunkSize } = body;

    if (!text || !source) {
      return NextResponse.json(
        { error: "text & source are required" },
        { status: 400 }
      );
    }

    const chunks = chunkText(text, chunkSize ?? 900);
    if (chunks.length === 0) {
      return NextResponse.json({ inserted: 0, message: "No chunks produced" });
    }

    const db = await getDB();
    const col = db.collection<KnowledgeDoc>("knowledge");

    const docs: KnowledgeDoc[] = [];

    for (const c of chunks) {
      // ✅ এখন await async context এর ভেতরে
      const embedding = await embedLocal(c);

      // ✅ ভ্যালিডেশন
      if (!embedding || embedding.length !== 384) {
        throw new Error(
          `Embedding length invalid: got ${embedding?.length}`
        );
      }

      docs.push({
        text: c,
        embedding,
        source,
        tags,
        lang,
        createdAt: new Date(),
      });
    }

    if (docs.length) {
      await col.insertMany(docs);
    }

    return NextResponse.json({ inserted: docs.length, mode: "local-embeddings" });
  } catch (err: any) {
    console.error("INGEST ERROR", err);
    return NextResponse.json(
      { error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
