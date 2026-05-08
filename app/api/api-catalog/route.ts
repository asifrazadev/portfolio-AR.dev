import { NextResponse } from 'next/server';

export async function GET() {
  const catalog = {
    linkset: [
      {
        anchor: "https://asifraza.site/api",
        "service-desc": [
          {
            href: "https://asifraza.site/openapi.json",
            type: "application/vnd.oai.openapi+json;version=3.0"
          }
        ],
        "service-doc": [
          {
            href: "https://asifraza.site/docs/api",
            type: "text/html"
          }
        ],
        status: [
          {
            href: "https://asifraza.site/api/health",
            type: "application/json"
          }
        ]
      }
    ]
  };

  return new NextResponse(JSON.stringify(catalog, null, 2), {
    headers: {
      'Content-Type': 'application/linkset+json',
    },
  });
}
