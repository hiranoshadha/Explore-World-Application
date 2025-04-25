/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#3b82f6", // sky blue
          background: "#ffffff",
          card: "#f8fafc",
          text: "#1e293b"
        },
        dark: {
          primary: "#fbbf24", // accent gold
          background: "#0f172a", // navy
          card: "#1e293b", // charcoal
          text: "#f8fafc"
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-in-out"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 }
        },
      },
    },
  },
  plugins: [
    // Make sure these plugins are installed
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
