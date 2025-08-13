export function validateEnvironment() {
    const requiredVars = {
      MONGODB_URI: process.env.MONGODB_URI,
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    };
  
    const missingVars = Object.entries(requiredVars)
      .filter(([,value]) => !value)
      .map(([key]) => key);
  
    if (missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(', ')}. ` +
        'Please set these in your Vercel environment variables.'
      );
    }
  
    // Validate MongoDB URI format
    const mongoUri = process.env.MONGODB_URI!;
    if (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://')) {
      throw new Error(
        `Invalid MONGODB_URI format. Must start with 'mongodb://' or 'mongodb+srv://'. ` +
        `Current value starts with: "${mongoUri.substring(0, 20)}..."`
      );
    }
  
    return {
      MONGODB_URI: mongoUri,
      DB_NAME: process.env.DB_NAME || 'sniplink',
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL!,
    };
  }