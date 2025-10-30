import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
if (!uri) throw new Error("MONGODB_URI is missing in .env.local");

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDB() {
  if (db) return db;
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(process.env.MONGODB_DB || "portfolio");
  return db;
}
