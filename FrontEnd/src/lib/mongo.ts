import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI as string;
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
    // Debug logging for Vercel
    console.log('MongoDB URI exists:', !!uri);
    console.log('MongoDB URI length:', uri?.length || 0);
    console.log('MongoDB URI starts with mongodb:', uri?.startsWith('mongodb'));
    
    if (!uri) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }
    
    if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
      throw new Error(`Invalid MongoDB URI format. URI starts with: "${uri.substring(0, 20)}..."`);
    }
    
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
