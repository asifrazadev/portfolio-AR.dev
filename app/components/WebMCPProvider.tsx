"use client";

export function WebMCPProvider() {
  const code = `
    if (typeof navigator !== "undefined" && "modelContext" in navigator) {
      navigator.modelContext.provideContext({
        tools: [
          {
            name: "getPortfolioInfo",
            description: "Gets basic info about Asif Raza's portfolio",
            inputSchema: {
              type: "object",
              properties: {},
            },
            execute: async () => {
              return "Asif Raza is a Software Engineer specializing in React, Next.js, and Node.js. Check the website for detailed project case studies.";
            },
          },
          {
            name: "getContactInfo",
            description: "Get contact details and social links for Asif Raza",
            inputSchema: {
              type: "object",
              properties: {},
            },
            execute: async () => {
              return "LinkedIn: https://www.linkedin.com/in/asifraza-dev/\\nGitHub: https://github.com/asifrazadev\\nX/Twitter: https://x.com/asifrazadev";
            },
          }
        ],
      });
    }
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
