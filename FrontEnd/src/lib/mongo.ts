import { MongoClient, Db } from "mongodb";

const uri = "mongodb+srv://sniplink:OqNq5hBKYv4jQz3a@cluster0.3vxvf.mongodb.net/sniplink?retryWrites=true&w=majority";
const dbName = "sniplink";

interface CachedMongo {
  conn: { client: MongoClient; db: Db } | null;
  promise: Promise<{ client: MongoClient; db: Db }> | null;
}

declare global {
  var _mongo: CachedMongo | undefined;
}

const cached: CachedMongo = global._mongo || { conn: null, promise: null };

export async function getDB(): Promise<Db> {
  if (cached.conn) return cached.conn.db;

  if (!cached.promise) {
    const client = new MongoClient(uri, { maxPoolSize: 5 });
    cached.promise = client.connect().then((client) => ({
      client,
      db: client.db(dbName),
    }));
  }

  cached.conn = await cached.promise;
  global._mongo = cached;

  return cached.conn.db;
}
