"use client";

export function WebMCPProvider() {
  const code = `
    (function initWebMCP(retries = 0) {
      if (typeof navigator !== "undefined" && "modelContext" in navigator) {
        navigator.modelContext.provideContext({
          tools: [
            {
              name: "getPortfolioInfo",
              description: "Gets basic info about Asif Raza's portfolio",
              inputSchema: { type: "object", properties: {} },
              execute: async () => {
                return "Asif Raza is a Software Engineer specializing in React, Next.js, and Node.js. Check the website for detailed project case studies.";
              },
            },
            {
              name: "getContactInfo",
              description: "Get contact details and social links for Asif Raza",
              inputSchema: { type: "object", properties: {} },
              execute: async () => {
                return "LinkedIn: https://www.linkedin.com/in/asifraza-dev/\\nGitHub: https://github.com/asifrazadev\\nX/Twitter: https://x.com/asifrazadev";
              },
            }
          ],
        });
        console.log("[WebMCP] Context successfully provided to AI agent.");
      } else if (retries < 40) {
        // Retry every 250ms for up to 10 seconds to catch asynchronous extension injection
        setTimeout(() => initWebMCP(retries + 1), 250);
      } else {
        console.warn("[WebMCP] Agent extension not detected after 10 seconds.");
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
