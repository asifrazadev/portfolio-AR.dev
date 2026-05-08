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
      
      <h2 className="text-2xl font-semibold mt-12 mb-6">Available Endpoints</h2>
      <ul className="space-y-6">
        <li className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm">
          <h3 className="text-xl font-mono text-blue-300 mb-2">GET /api/health</h3>
          <p className="text-gray-400">Returns the basic health status of the API services.</p>
        </li>
        <li className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm">
          <h3 className="text-xl font-mono text-purple-300 mb-2">GET /api/premium</h3>
          <p className="text-gray-400">Premium content endpoint secured by the Machine Payment Protocol (MPP). Requires a tempo payment transaction.</p>
        </li>
        <li className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm">
          <h3 className="text-xl font-mono text-green-300 mb-2">GET /api/x402-premium</h3>
          <p className="text-gray-400">Premium content endpoint secured by the x402 payment protocol. Returns a 402 challenge for automated agent fulfillment.</p>
        </li>
        <li className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm">
          <h3 className="text-xl font-mono text-orange-300 mb-2">GET /api/markdown</h3>
          <p className="text-gray-400">Utility endpoint used by Content Negotiation middleware to convert HTML pages into Agent-readable Markdown.</p>
        </li>
      </ul>
    </main>
  );
}
