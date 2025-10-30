// src/lib/local-embed.ts
let _extractor: any | null = null;

async function getExtractor() {
  if (_extractor) return _extractor;
  const { pipeline } = await import("@xenova/transformers");
  // MiniLM; Node backend (আগের মতই)
  _extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  return _extractor;
}

export async function embedLocal(text: string): Promise<number[]> {
  const extractor = await getExtractor();
  // ✅ 'mean' pooling দিলে 1D ভেক্টর রেডি আসে
  const output = await extractor(text, { pooling: "mean", normalize: true });
  // output.data সাধারণত Float32Array — একে JS array করি
  const vec = Array.from(output.data as Float32Array | number[]);
  return vec;
}

export const LOCAL_EMBED_DIM = 384;
