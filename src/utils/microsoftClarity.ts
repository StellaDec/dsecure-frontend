// Microsoft Clarity Windows interface extension (avoiding any types)
declare global {
  interface Window {
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] };
  }
}

interface ClarityConfig {
  projectId: string;
  debug?: boolean;
}

interface ClarityEvent {
  name: string;
  properties?: Record<string, unknown>;
}

class MicrosoftClarity {
  private projectId: string;
  private debug: boolean;
  private isInitialized: boolean = false;

  constructor(config: ClarityConfig) {
    this.projectId = config.projectId;
    this.debug = config.debug || false;
  }

  // Microsoft Clarity ko dynamic defer mode mein initialize karein
  init(): void {
    if (typeof window === "undefined" || this.isInitialized) return;

    // Localhost par analytics tracking block karein
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      this.isInitialized = true;
      return;
    }

    // Development mein init check
    if (import.meta.env.DEV && !this.debug) {
      this.isInitialized = true;
      return;
    }

    // Compliance check: Opt-out cookie check karein
    const isOptedOut = document.cookie.includes("dsecure_optout=true");
    if (isOptedOut) {
      this.isInitialized = true;
      return;
    }

    // Dynamic script injection ke liye helper function
    const injectClarityScript = () => {
      if (window.clarity || document.querySelector(`script[src*="clarity.ms"]`)) {
        return;
      }

      // Clarity queue setup aur function initialization
      window.clarity = window.clarity || function (...args: unknown[]) {
        window.clarity!.q = window.clarity!.q || [];
        window.clarity!.q.push(args);
      };

      const scriptElement = document.createElement("script");
      scriptElement.async = true;
      scriptElement.src = `https://www.clarity.ms/tag/${this.projectId}`;
      
      const firstScript = document.getElementsByTagName("script")[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(scriptElement, firstScript);
      } else {
        document.head.appendChild(scriptElement);
      }
    };

    // User interaction events list setup karein
    const interactionEvents = ["scroll", "mousemove", "keydown", "touchstart", "click"];

    const triggerClarity = () => {
      injectClarityScript();
      
      // Cleanup event listeners
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, triggerClarity);
      });
      clearTimeout(fallbackTimer);
    };

    // Listen to user interactions with passive true config
    interactionEvents.forEach((event) => {
      window.addEventListener(event, triggerClarity, { passive: true });
    });

    // 10-second fallback timer taaki slower network networks par impact na ho
    const fallbackTimer = setTimeout(() => {
      triggerClarity();
    }, 10000);

    this.isInitialized = true;
  }

  // Track custom events
  trackEvent(event: ClarityEvent): void {
    if (!this.isInitialized || typeof window === "undefined") return;
    if (import.meta.env.DEV) return;

    const clarity = (window as any).clarity;
    if (clarity) {
      if (event.properties) {
        clarity("event", event.name, event.properties);
      } else {
        clarity("event", event.name);
      }

      if (this.debug) {
        //console.log('Clarity Event:', event);
      }
    }
  }

  // Set user identifier
  setUserId(userId: string): void {
    if (!this.isInitialized || typeof window === "undefined") return;

    const clarity = (window as any).clarity;
    if (clarity) {
      clarity("identify", userId);

      if (this.debug) {
        //console.log('Clarity User ID set:', userId);
      }
    }
  }

  // Set custom tags for better session organization
  setCustomTag(key: string, value: string): void {
    if (!this.isInitialized || typeof window === "undefined") return;

    const clarity = (window as any).clarity;
    if (clarity) {
      clarity("set", key, value);

      if (this.debug) {
        //console.log('Clarity Custom Tag:', key, value);
      }
    }
  }

  // Track business-specific events for D-Secure
  trackBusinessEvent(
    eventType:
      | "page_view"
      | "form_interaction"
      | "product_interest"
      | "pricing_view"
      | "demo_request"
      | "download",
    details?: Record<string, unknown>,
  ): void {
    const eventMap = {
      page_view: {
        name: "page_view",
        properties: {
          page: String(details?.page || window.location.pathname),
          title: String(details?.title || document.title),
        },
      },
      form_interaction: {
        name: "form_interaction",
        properties: {
          form_type: String(details?.formType || "unknown"),
          field: String(details?.field || "unknown"),
          action: String(details?.action || "focus"),
        },
      },
      product_interest: {
        name: "product_interest",
        properties: {
          product: String(details?.product || "unknown"),
          section: String(details?.section || "unknown"),
        },
      },
      pricing_view: {
        name: "pricing_view",
        properties: {
          plan: String(details?.plan || "unknown"),
          duration: String(details?.duration || "monthly"),
        },
      },
      demo_request: {
        name: "demo_request",
        properties: {
          source: String(details?.source || "unknown"),
          company_size: String(details?.companySize || "unknown"),
        },
      },
      download: {
        name: "resource_download",
        properties: {
          resource_type: String(details?.resourceType || "unknown"),
          resource_name: String(details?.resourceName || "unknown"),
        },
      },
    };

    const event = eventMap[eventType];
    if (event) {
      this.trackEvent(event);
    }
  }

  // Track user journey milestones
  trackMilestone(
    milestone:
      | "site_entry"
      | "product_exploration"
      | "pricing_interest"
      | "contact_engagement"
      | "conversion_start",
  ): void {
    this.setCustomTag("user_milestone", milestone);
    this.trackEvent({
      name: "milestone_reached",
      properties: {
        milestone: milestone,
        timestamp: new Date().toISOString(),
      },
    });
  }

  // Get session URL (useful for support)
  getSessionUrl(): Promise<string | null> {
    return new Promise((resolve) => {
      if (!this.isInitialized || typeof window === "undefined") {
        resolve(null);
        return;
      }

      const clarity = window.clarity;
      if (clarity) {
        clarity("getSessionUrl", (url: unknown) => {
          resolve(typeof url === "string" ? url : null);
        });
      } else {
        resolve(null);
      }
    });
  }

  // Track user behavior patterns
  trackUserBehavior(
    behaviorType:
      | "scroll_depth"
      | "time_on_page"
      | "click_pattern"
      | "form_abandonment",
    data?: Record<string, unknown>,
  ): void {
    this.trackEvent({
      name: `user_behavior_${behaviorType}`,
      properties: {
        ...data,
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
      },
    });
  }
}

// Initialize Clarity instance
export const clarity = new MicrosoftClarity({
  projectId: import.meta.env.VITE_CLARITY_ID || "XXXXXXXXXX", 
  debug: import.meta.env.VITE_DEBUG === "true",
});

// React hook for Clarity tracking
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useMicrosoftClarity() {
  const location = useLocation();

  useEffect(() => {
    // Initialize Clarity on first load but defer to avoid blocking initial render
    // and pushing 'c.gif' redirects to later
    const timer = setTimeout(() => {
      clarity.init();
    }, 5000); // 5 second delay

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Track page views on route changes
    clarity.trackBusinessEvent("page_view", {
      page: location.pathname + location.search,
      title: document.title,
    });
  }, [location]);

  return {
    trackEvent: clarity.trackEvent.bind(clarity),
    trackBusinessEvent: clarity.trackBusinessEvent.bind(clarity),
    trackMilestone: clarity.trackMilestone.bind(clarity),
    trackUserBehavior: clarity.trackUserBehavior.bind(clarity),
    setUserId: clarity.setUserId.bind(clarity),
    setCustomTag: clarity.setCustomTag.bind(clarity),
    getSessionUrl: clarity.getSessionUrl.bind(clarity),
  };
}

export default clarity;