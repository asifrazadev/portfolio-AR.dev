import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Asif Raza',
  description: 'Privacy Policy for Asif Raza Developer Portfolio',
};

export default function PrivacyPolicy() {
  return (
    <main className="container mx-auto px-4 py-16 mt-20 text-white min-h-screen max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-gray-300">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Information Collection</h2>
        <p>As a developer portfolio, this website generally does not collect personal data from visitors unless voluntarily provided through contact forms or similar mechanisms. Analytics may be used to understand general traffic patterns.</p>
        
        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. AI and Agent Interactions</h2>
        <p>This website implements machine-readable protocols to facilitate interactions with AI agents. We do not strictly prohibit AI indexing but ask that automated tools respect our stated content signals.</p>

        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Third-Party Links</h2>
        <p>This site may contain links to third-party repositories, social media profiles, or deployed projects. We are not responsible for the privacy practices of these external sites.</p>

        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Contact</h2>
        <p>If you have any questions about this policy, please reach out via the provided social links on the homepage.</p>
      </div>
    </main>
  );
}
