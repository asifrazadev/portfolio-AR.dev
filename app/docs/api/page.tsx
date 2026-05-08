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
          <h3 className="text-xl font-mono text-blue-300 mb-2">GET /api/v1/health</h3>
          <p className="text-gray-400 mb-4">Returns the basic health status of the API services.</p>
          <div className="bg-black/50 p-4 rounded text-sm font-mono text-gray-300">
            <div className="mb-2 text-gray-500">// Request</div>
            <div>GET /api/v1/health</div>
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


    </main>
  );
}
