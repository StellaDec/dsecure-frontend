// Enhanced Google Analytics utility for D-Secure
// Provides better tracking and event management

// Google Analytics Window interface ke liye custom declaration (avoiding any types)
declare global {
  var dataLayer: unknown[] | undefined;
  var gtag: ((...args: unknown[]) => void) | undefined;
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

interface GAConfig {
  trackingId: string;
  debug?: boolean;
}

class GoogleAnalytics {
  private readonly trackingId: string;
  private readonly debug: boolean;
  private isInitialized: boolean = false;

  constructor(config: GAConfig) {
    this.trackingId = config.trackingId;
    this.debug = config.debug || false;
  }

  // Google Analytics ko defer mode mein initialize karein
  init(): void {
    if (typeof globalThis.window === "undefined" || this.isInitialized) return;

    // Localhost par analytics initialize nahi karenge
    if (
      globalThis.location.hostname === "localhost" ||
      globalThis.location.hostname === "127.0.0.1"
    ) {
      this.isInitialized = true;
      return;
    }

    // dataLayer aur gtag ke global stubs set karein agar setup nahi hain
    globalThis.dataLayer = globalThis.dataLayer || [];
    globalThis.gtag = globalThis.gtag || function (...args: unknown[]) {
      globalThis.dataLayer?.push(args);
    };

    // Initial GTag configurations aur manual pageview properties configure karein
    globalThis.gtag("js", new Date());
    globalThis.gtag("config", this.trackingId, {
      page_title: document.title,
      page_location: globalThis.location.href,
      custom_parameter: "D-Secure_website",
      send_page_view: false, // Page view tracking dynamically manually useGoogleAnalytics dwara handle hoga
    });

    // Dynamic GTag script inject karne ke liye helper function
    const injectGTagScript = () => {
      // Dubara injection se bachne ke liye check karein
      if (document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) {
        return;
      }

      // GDPR aur privacy compliance ke liye user opt-out cookie check karein
      const isOptedOut = document.cookie.includes("dsecure_optout=true");
      if (isOptedOut) {
        return; // User ne opt-out kiya hai, isliye script load nahi karenge
      }

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.trackingId}`;
      document.head.appendChild(script);
    };

    // User interactions ko sunne ke liye target events
    const interactionEvents = ["scroll", "mousemove", "keydown", "touchstart", "click"];

    const triggerInitialization = () => {
      injectGTagScript();
      
      // Memory leaks aur double triggers se bachne ke liye sabhi listeners ko remove karein
      interactionEvents.forEach((event) => {
        globalThis.removeEventListener(event, triggerInitialization);
      });
      clearTimeout(fallbackTimer);
    };

    // Active passive event listeners registered karein
    interactionEvents.forEach((event) => {
      globalThis.addEventListener(event, triggerInitialization, { passive: true });
    });

    // Crawler aur slow networks support ke liye 8-second fallback timeout
    const fallbackTimer = setTimeout(() => {
      triggerInitialization();
    }, 8000);

    this.isInitialized = true;
  }

  // Page views ko track karne ka function
  trackPageView(path: string, title?: string): void {
    if (!this.isInitialized || typeof globalThis.window === 'undefined') return;

    const gtag = globalThis.gtag;
    if (gtag) {
      gtag('config', this.trackingId, {
        page_path: path,
        page_title: title || document.title,
        page_location: globalThis.location.href
      });
    }
  }

  // Custom events ko track karne ka function
  trackEvent(event: GAEvent): void {
    if (!this.isInitialized || typeof globalThis.window === 'undefined') return;

    const gtag = globalThis.gtag;
    if (gtag) {
      gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value
      });
    }
  }

  // Business-specific events ko track karne ka function
  trackBusinessEvent(eventType: 'contact_form' | 'pricing_view' | 'product_interest' | 'demo_request' | 'download', details?: Record<string, unknown>): void {
    const eventMap = {
      contact_form: {
        action: 'form_submit',
        category: 'engagement',
        label: 'contact_form_submission'
      },
      pricing_view: {
        action: 'view_item',
        category: 'engagement',
        label: 'pricing_page_view'
      },
      product_interest: {
        action: 'select_content',
        category: 'engagement',
        label: typeof details?.product === 'string' ? details.product : 'product_view'
      },
      demo_request: {
        action: 'generate_lead',
        category: 'conversion',
        label: 'demo_request'
      },
      download: {
        action: 'download',
        category: 'engagement',
        label: typeof details?.resource === 'string' ? details.resource : 'resource_download'
      }
    };

    const event = eventMap[eventType];
    if (event) {
      this.trackEvent({
        ...event,
        value: typeof details?.value === 'number' ? details.value : 1
      });
    }
  }

  // User interactions ko track karne ka function
  trackUserInteraction(element: string, action: string): void {
    this.trackEvent({
      action: action,
      category: 'user_interaction',
      label: element
    });
  }

  // Conversions track karne ka function
  trackConversion(type: 'signup' | 'purchase' | 'trial' | 'consultation', value?: number): void {
    this.trackEvent({
      action: 'conversion',
      category: 'conversion',
      label: type,
      value: value || 1
    });
  }

  // Site search query track karne ka function
  trackSiteSearch(query: string, _page?: string): void {
    this.trackEvent({
      action: 'search',
      category: 'site_search',
      label: query
    });
  }
}

// GA instance initialize karein
export const ga = new GoogleAnalytics({
  trackingId: import.meta.env.VITE_GA4_ID || "G-XXXXXXXXXX", 
  debug: import.meta.env.VITE_DEBUG === "true"
});

// React hook for GA tracking
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useGoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // GA ko first load par initialize karein
    ga.init();
  }, []);

  useEffect(() => {
    // Route changes par page views ko track karein
    ga.trackPageView(location.pathname + location.search);
  }, [location]);

  return {
    trackEvent: ga.trackEvent.bind(ga),
    trackBusinessEvent: ga.trackBusinessEvent.bind(ga),
    trackUserInteraction: ga.trackUserInteraction.bind(ga),
    trackConversion: ga.trackConversion.bind(ga),
    trackSiteSearch: ga.trackSiteSearch.bind(ga)
  };
}

export default ga;