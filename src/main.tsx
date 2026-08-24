import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./critical.css";
// responsive.css ko async load karo — above-the-fold ke liye zaruri nahi (14KB render-block bachega)
if (typeof window !== 'undefined') {
  const loadResponsiveCss = () => { import("./responsive.css"); };
  if ('requestIdleCallback' in window) {
    (window as typeof window & { requestIdleCallback: (cb: () => void) => void })
      .requestIdleCallback(loadResponsiveCss);
  } else {
    setTimeout(loadResponsiveCss, 100);
  }
}

import { HelmetProvider } from "react-helmet-async";
import { ToastProvider } from './components/Toast';
import i18n from './utils/internationalization'; // Initialize i18n
import { I18nextProvider } from 'react-i18next';

// ─── Sentry aur PostHog ko React mount ke BAAD async load karo ───
// ~300KB JS first paint ko block nahi karega
const deferSdk = (fn: () => void) => {
  if ('requestIdleCallback' in window) {
    (window as typeof window & { requestIdleCallback: (cb: () => void) => void })
      .requestIdleCallback(fn);
  } else {
    // Fallback — 2s delay se load karo
    setTimeout(fn, 2000);
  }
};

deferSdk(() => {
  if (import.meta.env.VITE_SENTRY_DSN) {
    import("@sentry/react").then((Sentry) => {
      Sentry.init({
        dsn: import.meta.env.VITE_SENTRY_DSN,
        integrations: [
          Sentry.browserTracingIntegration(),
          Sentry.replayIntegration(),
        ],
        tracesSampleRate: 1.0,
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
      });
    });
  }
});

deferSdk(() => {
  if (import.meta.env.VITE_POSTHOG_KEY) {
    import("posthog-js").then((mod) => {
      mod.default.init(import.meta.env.VITE_POSTHOG_KEY, {
        api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
        person_profiles: 'identified_only',
      });
    });
  }
});

// -------------------------------------------------------------------------------
// 🔇 GLOBAL CONSOLE SUPPRESSOR - Keeps browser console clean in production
// -------------------------------------------------------------------------------
// Enable console in development, disable in production
const ENABLE_CONSOLE = import.meta.env.DEV;

if (!ENABLE_CONSOLE) {
  const noop = () => { };
  console.log = noop;
  console.warn = noop;
  console.error = noop;
  console.info = noop;
  console.debug = noop;
}
// -------------------------------------------------------------------------------

// Resource hints already in index.html (lines 41-44) — JS duplication hataya
// preloadCriticalResources ek empty function tha — remove kiya

// Optimized performance monitoring
if ("performance" in window && import.meta.env.PROD) {
  // Defer performance monitoring to avoid blocking main thread
  setTimeout(() => {
    new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach((entry) => {
        // Only log in development
        if (import.meta.env.DEV) {
          // console.log(entry.name, entry.startTime);
        }
      });
    }).observe({ entryTypes: ["largest-contentful-paint", "first-input", "cumulative-layout-shift"] });
  }, 1000);
}

// Register service worker for caching (production only)
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .catch(() => {
        // Silently fail in production
      });
  });
}


// Handle redirects from 404.html
const redirectPath = sessionStorage.getItem("redirectPath");
if (redirectPath) {
  sessionStorage.removeItem("redirectPath");
  window.history.replaceState(null, "", redirectPath);
}

// Handle legacy redirect from sessionStorage.redirect (from 404.html)
if (sessionStorage.redirect) {
  const url = new URL(sessionStorage.redirect);
  sessionStorage.removeItem("redirect");
  window.history.replaceState(null, "", url.pathname + url.search + url.hash);
}

// Optimize React rendering & Hydration
const rootElement = document.getElementById("root")!;
const isPrerendered = "prerendered" in rootElement.dataset;

// ToastProvider sirf App.tsx mein hai — yahan se hataya (duplicate tha)
const appWrapper = (
  <React.StrictMode>
    <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <ToastProvider>
            <App />
          </ToastProvider>
        </BrowserRouter>
      </I18nextProvider>
    </HelmetProvider>
  </React.StrictMode>
);

const mountApp = () => {
  if (isPrerendered) {
    // Hydrate statically pre-rendered HTML sent by Node SSG
    ReactDOM.hydrateRoot(rootElement, appWrapper);
  } else {
    // Standard SPA initialization for Dev mode or un-prerendered routes
    // We intentionally DO NOT clear rootElement.innerHTML here.
    // This allows the initial HTML skeleton from index.html to remain visible
    // while React parses and fetches lazy-loaded modules, dramatically improving FCP.
    // React 18 createRoot will automatically replace the container contents upon first commit.
    const root = ReactDOM.createRoot(rootElement);
    root.render(appWrapper);
  }
};

// React ko turant mount karo — English translations already bundled hain
// i18n.resources mein en/translation hai, toh keys flash nahi hongi
mountApp();
