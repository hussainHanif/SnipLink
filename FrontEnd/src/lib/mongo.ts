import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "sniplink";

interface CachedMongo {
  conn: { client: MongoClient; db: Db } | null;
  promise: Promise<{ client: MongoClient; db: Db }> | null;
}

// Use globalThis for better Vercel compatibility
declare global {
  var _mongo: CachedMongo | undefined;
}

// Initialize cache
const cached: CachedMongo = globalThis._mongo || { conn: null, promise: null };

export async function getDB(): Promise<Db> {
  // Validate environment variables first
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined. Please set it in your Vercel environment variables.');
  }
  
  if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
    throw new Error(`Invalid MongoDB URI format. URI starts with: "${uri.substring(0, 20)}..."`);
  }

  // Return cached connection if available
  if (cached.conn) {
    try {
      // Test the connection
      await cached.conn.client.db().admin().ping();
      return cached.conn.db;
    } catch {
      // Connection is stale, clear cache
      cached.conn = null;
      cached.promise = null;
    }
  }

  // Create new connection if no cached promise
  if (!cached.promise) {
    const client = new MongoClient(uri, { 
      maxPoolSize: 1, // Reduce pool size for serverless
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      connectTimeoutMS: 10000, // 10 second timeout
    });
    
    cached.promise = client.connect().then((client) => ({
      client,
      db: client.db(dbName),
    }));
  }

  try {
    cached.conn = await cached.promise;
    globalThis._mongo = cached;
    return cached.conn.db;
  } catch (error) {
    // Clear failed promise
    cached.promise = null;
    throw new Error(`Failed to connect to MongoDB: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Cleanup function for graceful shutdown
export async function closeConnection(): Promise<void> {
  if (cached.conn) {
    await cached.conn.client.close();
    cached.conn = null;
    cached.promise = null;
    globalThis._mongo = undefined;
  }
}
