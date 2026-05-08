import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    "resource": "https://www.asifraza.site",
    "authorization_servers": [
      "https://www.asifraza.site"
    ],
    "scopes_supported": [
      "read",
      "write",
      "profile"
    ],
    "bearer_methods_supported": [
      "header"
    ],
    "resource_server": "Asif Raza Portfolio API",
    "description": "Personal portfolio API for projects, skills and profile data"
  });
}
