import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: "Welcome to the Asif Raza Portfolio API",
    version: "1.0.0",
    docs: "https://asifraza.site/docs/api",
    endpoints: [
      "/api/health",
      "/api/premium",
      "/api/x402-premium",
      "/api/markdown",
      "/.well-known/api-catalog"
    ]
  });
}
