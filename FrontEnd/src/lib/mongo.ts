import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = "sniplink";

const cached = (global as any)._mongo || { conn: null, promise: null };

export async function getDB(): Promise<Db> {
  if (cached.conn) return cached.conn.db;

  if (!cached.promise) {
    const client = new MongoClient(uri, {
      maxPoolSize: 5,
    });
    cached.promise = client.connect().then((client) => ({
      client,
      db: client.db(dbName),
    }));
  }

  cached.conn = await cached.promise;
  (global as any)._mongo = cached;

  return cached.conn.db;
}
