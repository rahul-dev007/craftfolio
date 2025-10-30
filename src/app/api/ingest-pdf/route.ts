import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/mongo";
import { embedLocal } from "@/lib/local-embed";
import type { KnowledgeDoc } from "@/model/knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Text chunker
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
    // ✅ pdf-parse CJS entrypoint ফোর্স করি (ESM/CJS মিক্সআপ এড়াতে)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pdfParse: (buf: Buffer | Uint8Array) => Promise<{ text: string }> =
      require("pdf-parse/lib/pdf-parse.js");

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No PDF file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const data = await pdfParse(buffer);
    const text = (data?.text || "").trim();

    if (!text) {
      return NextResponse.json({ error: "No text extracted from PDF" }, { status: 400 });
    }

    const chunks = chunkText(text);
    const db = await getDB();
    const col = db.collection<KnowledgeDoc>("knowledge");

    const docs: KnowledgeDoc[] = [];
    for (const c of chunks) {
      const embedding = await embedLocal(c);
      if (!embedding || embedding.length !== 384) {
        throw new Error(`Invalid embedding length: ${embedding?.length}`);
      }
      docs.push({
        text: c,
        embedding,
        source: file.name,
        tags: ["pdf", "cv"],
        lang: "en",
        createdAt: new Date(),
      });
    }

    if (docs.length) await col.insertMany(docs);

    return NextResponse.json({
      inserted: docs.length,
      source: file.name,
      mode: "pdf-ingest",
    });
  } catch (err: any) {
    console.error("PDF INGEST ERROR", err);
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 });
  }
}
