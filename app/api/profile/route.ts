import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  // Simulate an OAuth Bearer token check
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new NextResponse(
      JSON.stringify({ error: "Unauthorized. Missing Bearer token." }),
      { 
        status: 401, 
        headers: {
          'Content-Type': 'application/json',
          'WWW-Authenticate': 'Bearer realm="api", resource_metadata="https://www.asifraza.site/.well-known/oauth-protected-resource", error="invalid_token", error_description="The access token expired or is missing"'
        }
      }
    );
  }

  const token = authHeader.split(' ')[1];
  
  // Validate the actual token value (using a simulated agent token for the portfolio)
  if (token !== 'asifraza-agent-token' && token !== process.env.AGENT_ACCESS_TOKEN) {
    return new NextResponse(
      JSON.stringify({ error: "Unauthorized. Invalid Bearer token." }),
      { 
        status: 401, 
        headers: {
          'Content-Type': 'application/json',
          'WWW-Authenticate': 'Bearer realm="api", resource_metadata="https://www.asifraza.site/.well-known/oauth-protected-resource", error="invalid_token", error_description="The access token is invalid"'
        }
      }
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  );

  const { data: profile, error } = await supabase
    .from('about')
    .select('*')
    .single();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data: profile });
}
