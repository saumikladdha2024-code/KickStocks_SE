/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        base: { DEFAULT: "#0A0E14", panel: "#10151C", raised: "#161C26", border: "#1F2730" },
        ink: { primary: "#E6EAF0", secondary: "#8B98A9", muted: "#5C6776" },
        bull: { DEFAULT: "#00C875", soft: "#0F2B22", text: "#3DDB97" },
        bear: { DEFAULT: "#FF4D5E", soft: "#2B1418", text: "#FF7A87" },
        neutral: { DEFAULT: "#F2A93B", soft: "#2B2316", text: "#F5BD66" },
        accent: { DEFAULT: "#4F8CFF", soft: "#13203A", hover: "#6EA0FF" },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
      },
      fontSize: { "2xs": ["0.6875rem", { lineHeight: "1rem" }] },
      borderRadius: { sm: "6px", DEFAULT: "10px", lg: "14px", xl: "18px" },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.4), 0 1px 1px rgba(0,0,0,0.3)",
        "card-hover": "0 8px 24px -8px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
        glass: "0 4px 30px rgba(0,0,0,0.3)",
        none: "none",
      },
      backdropBlur: { xs: "2px" },
      spacing: { 4.5: "1.125rem", 18: "4.5rem" },
      transitionDuration: { 250: "250ms" },
      keyframes: {
        "fade-in": { "0%": { opacity: "0", transform: "translateY(4px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "pulse-soft": { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.6" } },
        shimmer: { "100%": { transform: "translateX(100%)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: {
        "fade-in": "fade-in 0.35s ease-out",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        shimmer: "shimmer 1.6s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};