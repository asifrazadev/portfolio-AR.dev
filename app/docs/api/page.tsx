import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Documentation | Asif Raza',
  description: 'Documentation for the Asif Raza Portfolio API',
};

export default function ApiDocs() {
  return (
    <main className="container mx-auto px-4 py-16 mt-20 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8">API Documentation</h1>
      <p className="mb-4 text-gray-300">
        Welcome to the portfolio API. The OpenAPI specification is available at <a href="/openapi.json" className="text-blue-400 hover:underline">/openapi.json</a>.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-6">General Endpoints</h2>
      <ul className="space-y-8 mb-12">
        <li className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm">
          <h3 className="text-xl font-mono text-blue-300 mb-2">GET /api/health</h3>
          <p className="text-gray-400 mb-4">Returns the basic health status of the API services.</p>
          <div className="bg-black/50 p-4 rounded text-sm font-mono text-gray-300">
            <div className="mb-2 text-gray-500">// Request</div>
            <div>GET /api/health</div>
            <div className="mt-4 mb-2 text-gray-500">// Response</div>
            <pre>{`{
  "status": "pass",
  "description": "Health check OK"
}`}</pre>
          </div>
        </li>
        <li className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm">
          <h3 className="text-xl font-mono text-orange-300 mb-2">GET /api/markdown</h3>
          <p className="text-gray-400">Converts HTML responses into clean Markdown for AI agents and LLM-based tools.</p>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-12 mb-6">Structured API Layer</h2>
      <ul className="space-y-8 mb-12">
        <li className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm">
          <h3 className="text-xl font-mono text-emerald-300 mb-2">GET /api/projects</h3>
          <p className="text-gray-400 mb-4">Returns a structured JSON array of all portfolio projects.</p>
        </li>
        <li className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm">
          <h3 className="text-xl font-mono text-teal-300 mb-2">GET /api/skills</h3>
          <p className="text-gray-400 mb-4">Returns a structured JSON array of all technical skills.</p>
        </li>
        <li className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm">
          <h3 className="text-xl font-mono text-red-400 mb-2">GET /api/profile (Protected)</h3>
          <p className="text-gray-400 mb-4">Returns private profile details. Requires an OAuth Bearer token in the Authorization header. If omitted, returns a 401 WWW-Authenticate challenge.</p>
          <div className="bg-black/50 p-4 rounded text-sm font-mono text-gray-300 overflow-x-auto">
            <div className="mb-2 text-gray-500">// Request (Missing Token)</div>
            <div>GET /api/profile</div>
            <div className="mt-4 mb-2 text-gray-500">// Response</div>
            <pre>{`HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer realm="api", error="invalid_token"`}</pre>
          </div>
        </li>
      </ul>
      <h2 className="text-2xl font-semibold mt-12 mb-6">Authentication Metadata</h2>
      <ul className="space-y-8 mb-12">
        <li className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm">
          <h3 className="text-xl font-mono text-purple-300 mb-2">GET /.well-known/oauth-protected-resource</h3>
          <p className="text-gray-400 mb-4">Returns OAuth Protected Resource Metadata (RFC 9728). Tells AI agents how to obtain access tokens for protected APIs on this site.</p>
          <div className="bg-black/50 p-4 rounded text-sm font-mono text-gray-300 overflow-x-auto">
            <div className="mb-2 text-gray-500">// Request</div>
            <div>GET /.well-known/oauth-protected-resource</div>
            <div className="mt-4 mb-2 text-gray-500">// Response</div>
            <pre>{`{
  "resource": "https://asifraza.site/api",
  "authorization_servers": ["https://asifraza.site"],
  "scopes_supported": ["read", "write"]
}`}</pre>
          </div>
        </li>
        <li className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm">
          <h3 className="text-xl font-mono text-pink-300 mb-2">GET /.well-known/oauth-authorization-server</h3>
          <p className="text-gray-400 mb-4">Returns OAuth Authorization Server Discovery Metadata (RFC 8414). Allows dynamic discovery of authentication endpoints.</p>
          <div className="bg-black/50 p-4 rounded text-sm font-mono text-gray-300 overflow-x-auto">
            <div className="mb-2 text-gray-500">// Request</div>
            <div>GET /.well-known/oauth-authorization-server</div>
            <div className="mt-4 mb-2 text-gray-500">// Response</div>
            <pre>{`{
  "issuer": "https://asifraza.site",
  "authorization_endpoint": "https://asifraza.site/oauth/authorize",
  "token_endpoint": "https://asifraza.site/oauth/token",
  "jwks_uri": "https://asifraza.site/oauth/jwks",
  "grant_types_supported": ["authorization_code", "client_credentials"]
}`}</pre>
          </div>
        </li>
      </ul>


    </main>
  );
}
