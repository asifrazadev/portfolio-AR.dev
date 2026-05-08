import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Asif Raza',
  description: 'Terms of Service for Asif Raza Developer Portfolio',
};

export default function TermsOfService() {
  return (
    <main className="container mx-auto px-4 py-16 mt-20 text-white min-h-screen max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="space-y-6 text-gray-300">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>By accessing and using this portfolio website, you accept and agree to be bound by the terms and provision of this agreement.</p>
        
        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Use License</h2>
        <p>The code examples, tutorials, and snippets provided on this site are for educational and demonstrative purposes. While open-source projects linked from here carry their own respective licenses, the specific design, layout, and written content of this portfolio are proprietary unless otherwise stated.</p>

        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Automated Access & AI Agents</h2>
        <p>AI agents, crawlers, and automated tools are welcome to consume the machine-readable endpoints provided by this site. Please ensure requests are reasonably rate-limited so as not to disrupt service.</p>

        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Disclaimer</h2>
        <p>The materials on Asif Raza's website are provided on an 'as is' basis. Asif Raza makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
      </div>
    </main>
  );
}
