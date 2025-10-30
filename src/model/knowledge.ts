export type KnowledgeDoc = {
  _id?: string;
  text: string;
  embedding: number[];       // Atlas Vector Search index on this field
  source: string;            // e.g., "cv.pdf", "about.md", "project:shop-app"
  tags?: string[];           // e.g., ["cv","experience"]
  lang?: "bn" | "en" | "auto";
  createdAt?: Date;
};

export type IngestPayload = {
  text: string;              // raw text (extracted from CV/About/Projects)
  source: string;
  tags?: string[];
  lang?: "bn" | "en" | "auto";
  chunkSize?: number;        // optional override
};
