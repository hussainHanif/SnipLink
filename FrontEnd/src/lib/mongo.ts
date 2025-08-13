import { MongoClient, Db } from "mongodb";

// Clean the URI by removing any surrounding quotes
const rawUri = process.env.MONGODB_URI;
const uri = rawUri ? rawUri.replace(/^["']|["']$/g, '') : undefined;
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
  // Enhanced debugging for Vercel
  console.log('=== MongoDB Connection Debug ===');
  console.log('Environment check:');
  console.log('- NODE_ENV:', process.env.NODE_ENV);
  console.log('- Raw MONGODB_URI:', rawUri ? `"${rawUri.substring(0, 30)}..."` : 'NOT SET');
  console.log('- Cleaned MONGODB_URI:', uri ? `"${uri.substring(0, 30)}..."` : 'NOT SET');
  console.log('- MONGODB_URI length:', uri?.length || 0);
  console.log('- MONGODB_URI starts with mongodb:', uri?.startsWith('mongodb'));
  console.log('- DB_NAME:', dbName);
  console.log('===============================');

  // Validate environment variables first
  if (!uri) {
    const error = 'MONGODB_URI environment variable is not defined. Please set it in your Vercel environment variables.';
    console.error('Environment Error:', error);
    throw new Error(error);
  }
  
  if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
    const error = `Invalid MongoDB URI format. URI starts with: "${uri.substring(0, 20)}..."`;
    console.error('URI Format Error:', error);
    throw new Error(error);
  }

  // Return cached connection if available
  if (cached.conn) {
    try {
      console.log('Testing cached connection...');
      // Test the connection
      await cached.conn.client.db().admin().ping();
      console.log('Cached connection is valid');
      return cached.conn.db;
    } catch {
      console.log('Cached connection is stale, clearing cache...');
      // Connection is stale, clear cache
      cached.conn = null;
      cached.promise = null;
    }
  }

  // Create new connection if no cached promise
  if (!cached.promise) {
    console.log('Creating new MongoDB connection...');
    const client = new MongoClient(uri, { 
      maxPoolSize: 1, // Reduce pool size for serverless
      serverSelectionTimeoutMS: 10000, // Increase timeout to 10 seconds
      connectTimeoutMS: 15000, // Increase timeout to 15 seconds
      socketTimeoutMS: 20000, // Socket timeout
    });
    
    cached.promise = client.connect().then((client) => {
      console.log('MongoDB connection established successfully');
      return {
        client,
        db: client.db(dbName),
      };
    }).catch((error) => {
      console.error('MongoDB connection failed:', error);
      throw error;
    });
  }

  try {
    console.log('Waiting for connection promise...');
    cached.conn = await cached.promise;
    globalThis._mongo = cached;
    console.log('MongoDB connection cached successfully');
    return cached.conn.db;
  } catch (error) {
    console.error('Failed to establish MongoDB connection:', error);
    // Clear failed promise
    cached.promise = null;
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED')) {
        throw new Error('Cannot connect to MongoDB server. Please check if the server is running and accessible.');
      } else if (error.message.includes('ENOTFOUND')) {
        throw new Error('MongoDB host not found. Please check your connection string.');
      } else if (error.message.includes('Authentication failed')) {
        throw new Error('MongoDB authentication failed. Please check your username and password.');
      } else if (error.message.includes('Server selection timed out')) {
        throw new Error('MongoDB server selection timed out. Please check your connection string and network connectivity.');
      }
    }
    
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
