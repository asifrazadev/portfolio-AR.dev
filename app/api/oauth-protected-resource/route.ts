import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    "resource": "https://asifraza.site/api",
    "authorization_servers": [
      "https://asifraza.site"
    ],
    "scopes_supported": [
      "read",
      "write"
    ]
  });
}
