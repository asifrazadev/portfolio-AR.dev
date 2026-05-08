import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    "issuer": "https://www.asifraza.site",
    "authorization_endpoint": "https://www.asifraza.site/oauth/authorize",
    "token_endpoint": "https://www.asifraza.site/oauth/token",
    "jwks_uri": "https://www.asifraza.site/oauth/jwks",
    "grant_types_supported": [
      "authorization_code",
      "client_credentials"
    ]
  });
}
