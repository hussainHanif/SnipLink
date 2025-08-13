import { NextResponse } from "next/server";

export async function GET() {
  try {
    const envInfo = {
      NODE_ENV: process.env.NODE_ENV,
      MONGODB_URI: process.env.MONGODB_URI ? 
        `${process.env.MONGODB_URI.substring(0, 20)}...` : 
        'NOT SET',
      MONGODB_URI_LENGTH: process.env.MONGODB_URI?.length || 0,
      DB_NAME: process.env.DB_NAME || 'sniplink (default)',
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'NOT SET',
      VERCEL: process.env.VERCEL || 'false',
      VERCEL_ENV: process.env.VERCEL_ENV || 'NOT SET',
    };

    return NextResponse.json({
      success: true,
      message: 'Environment variables check',
      data: envInfo,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
