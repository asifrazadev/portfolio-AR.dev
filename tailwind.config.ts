import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#050505",
                foreground: "#ffffff",
                secondary: "#888888",
            },
            fontFamily: {
                heading: ["var(--font-heading)"],
                body: ["var(--font-body)"],
            },
            keyframes: {
                breathing: {
                    '0%, 100%': { transform: 'scale(1)', opacity: '0.3' },
                    '50%': { transform: 'scale(1.1)', opacity: '0.5' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
            },
            animation: {
                breathing: 'breathing 8s ease-in-out infinite',
                float: 'float 6s ease-in-out infinite',
            },
        },
    },
    plugins: [],
};
export default config;
