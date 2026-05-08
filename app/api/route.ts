import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: "Welcome to the Asif Raza Portfolio API",
    version: "v1",
    docs: "https://asifraza.site/docs/api",
    endpoints: [
      "/api/v1/health",
      "/api/markdown",
      "/.well-known/api-catalog"
    ]
  });
}
