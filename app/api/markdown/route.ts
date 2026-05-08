import { NextRequest, NextResponse } from 'next/server';
import TurndownService from 'turndown';

export async function GET(request: NextRequest) {
    const targetUrl = request.nextUrl.searchParams.get('url');
    
    if (!targetUrl) {
        return new NextResponse('Missing URL parameter', { status: 400 });
    }

    try {
        const response = await fetch(targetUrl, {
            headers: {
                // Prevent infinite loops by avoiding markdown accept header
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
            }
        });

        if (!response.ok) {
            return new NextResponse(`Failed to fetch URL: ${response.status}`, { status: 500 });
        }

        const html = await response.text();
        const turndownService = new TurndownService();
        const markdown = turndownService.turndown(html);

        return new NextResponse(markdown, {
            status: 200,
            headers: {
                'Content-Type': 'text/markdown',
                'x-markdown-tokens': markdown.split(/\s+/).length.toString(),
            },
        });
    } catch (error) {
        return new NextResponse(`Error generating markdown: ${error}`, { status: 500 });
    }
}
