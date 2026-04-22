/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";
import fs from "node:fs";
import viteCompression from "vite-plugin-compression";
import { createHtmlPlugin } from "vite-plugin-html";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

// Read critical CSS for inlining
const criticalCSS = fs.existsSync("./src/critical.css")
  ? fs.readFileSync("./src/critical.css", "utf-8")
  : "";

export default defineConfig({
  plugins: [
    react({
      // Optimize React runtime
      jsxRuntime: "automatic",
    }),
    // Gzip compression
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 1024,
      deleteOriginFile: false,
    }),
    // [OLD CODE PRESERVED AS COMMENT]
    // Brotli compression (better compression ratio) - Disabled for faster builds, Cloudflare handles this at the edge
    // viteCompression({
    //   algorithm: 'brotliCompress',
    //   ext: '.br',
    //   threshold: 1024,
    //   deleteOriginFile: false
    // }),
    // HTML plugin for critical CSS inlining and minification
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          criticalCSS: criticalCSS,
        },
      },
    }),
    // [NEW] Bundle visualization - generates stats.html on build
    {
      ...require("rollup-plugin-visualizer").visualizer({
        filename: "stats.html",
        title: "D-Secure Bundle Stats",
        template: "treemap",
        gzipSize: true,
        brotliSize: true,
        open: false,
      }),
      apply: "build",
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // Enhanced performance optimizations
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "framer-motion",
      "@tanstack/react-query",
      "react-helmet-async",
    ],
    exclude: ["@vite/client", "@vite/env"],
  },

  // Server optimizations
  server: {
    hmr: {
      overlay: false,
    },
  },
  ssr: {
    noExternal: ["react-helmet-async", "lucide-react"],
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    // Reduce chunk size warning limit - Increased to 1000 to accommodate heavy libraries like exceljs
    chunkSizeWarningLimit: 1000,
    // Enhanced minification
    minify: "terser",
    terserOptions: {
      compress: {
        // Aapke request ke anusaar: console.log disable kar diya gaya hai
        drop_console: true,
        drop_debugger: true,
        passes: 3, // Increased passes for better minification
      },
      format: {
        comments: false,
      },
    },
    // Target modern browsers for better performance
    target: ["es2020", "chrome80", "firefox78", "safari14"],
    // Disable compressed size reporting for faster builds
    reportCompressedSize: false,
    // Enhanced performance settings
    cssCodeSplit: true,
    cssMinify: true,
    rollupOptions: {
      // Aggressive tree-shaking hata diya gaya hai kyunki is se crypto-js ke modules toot rahe the
      // Ab default Vite build tree-shaking use hogi jo safe aur stable hai
      output: {
        // [REFINE CHUNKING STRATEGY]
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            // 1. Core React & Navigation (Essentials)
            if (
              id.includes("react/") ||
              id.includes("react-dom") ||
              id.includes("react-router") ||
              id.includes("react-helmet") ||
              id.includes("scheduler")
            ) {
              return "vendor-core";
            }

            // 2. Large Visualization & UI Libraries
            if (id.includes("recharts") || id.includes("d3")) return "vendor-viz";
            if (id.includes("leaflet") || id.includes("react-leaflet")) return "vendor-maps";
            if (id.includes("framer-motion")) return "vendor-motion";
            if (id.includes("lucide-react")) return "vendor-icons";

            // 3. Document Processing (Heavy) - Keep these separate as they are rarely used together
            if (id.includes("exceljs")) return "vendor-exceljs";
            if (id.includes("pdfjs-dist") || id.includes("react-pdf")) return "vendor-pdf-viewer";
            if (id.includes("jspdf")) return "vendor-jspdf";
            if (id.includes("jszip")) return "vendor-zip";
            
            // 4. Cloud & Utilities
            if (id.includes("@cloudinary") || id.includes("cloudinary")) return "vendor-cloudinary";
            if (id.includes("crypto-js")) return "vendor-crypto";
            if (id.includes("pako")) return "vendor-compression";
            if (id.includes("@tanstack") || id.includes("axios") || id.includes("i18next")) return "vendor-utils";

            // 5. Catch-all for remaining node_modules (splits them into smaller chunks automatically)
            // return 'vendor-others'; // Isko disable rakhte hain taaki Vite default logic use kare
          }
        },

        // Optimize file names for caching
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || "asset";
          const info = name.split(".");
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `img/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
  },
  // CSS optimization
  css: {
    devSourcemap: false,
  },
  // Production mein console logs completely disable karne ke liye 
  // esbuild se bhi console aur debugger drop kar rahe hain
  esbuild: {
    drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
    legalComments: "none",
    treeShaking: true,
  },
  // Vitest configuration
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
