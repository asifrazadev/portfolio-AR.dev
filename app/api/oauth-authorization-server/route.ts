import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    "issuer": "https://asifraza.site",
    "authorization_endpoint": "https://asifraza.site/oauth/authorize",
    "token_endpoint": "https://asifraza.site/oauth/token",
    "jwks_uri": "https://asifraza.site/oauth/jwks",
    "grant_types_supported": [
      "authorization_code",
      "client_credentials"
    ]
  });
}
