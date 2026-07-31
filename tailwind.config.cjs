module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      xs: "475px", // Extra small devices (large phones)
      sm: "640px", // Small devices (tablets)
      md: "768px", // Medium devices (small laptops)
      lg: "1024px", // Large devices (laptops/desktops)
      xl: "1280px", // Extra large devices (large desktops)
      xxl: "1536px", // 2X Extra large devices (larger desktops)
    },
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0e7c66",
          50: "#f4fbf8",
          100: "#d4ede4",
          200: "#a9dbc9",
          300: "#7ec9ae",
          400: "#53b793",
          500: "#28a578",
          600: "#0e7c66",
          700: "#0a2e1e",
          800: "#083d28",
          900: "#041e14",
        },
      },
      boxShadow: {
        card: "0 8px 30px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        xl: "1rem",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pop: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 300ms ease-out both",
        "slide-down": "slide-down 200ms ease-out both",
        pop: "pop 180ms ease-out both",
        marquee: "marquee 25s linear infinite",
      },
    },
  },
  plugins: [],
};
