/**
 * Dodo Payments Overlay Checkout Utility
 * Overlay checkout SDK se payment form full-screen overlay mein dikhta hai
 * Product-based aur Payment Link dono support karta hai
 */

import { DodoPayments } from 'dodopayments-checkout';
import type { CheckoutEvent } from 'dodopayments-checkout';

// SDK kis mode mein initialized hai track karne ke liye
let currentLinkType: 'static' | 'session' | null = null;

/**
 * Checkout ke liye callback types
 */
interface CheckoutCallbacks {
  /** Jab checkout successfully complete ho jaye */
  onComplete?: () => void;
  /** Jab user checkout band kare */
  onClose?: () => void;
}

// Callbacks store karna zaroori hai taaki event handler mein access ho sake
let storedCallbacks: CheckoutCallbacks = {};

/**
 * SDK ko specific linkType ke saath initialize karo
 * Agar already same linkType se init ho chuka hai toh skip karega
 */
function ensureInitialized(linkType: 'static' | 'session', callbacks?: CheckoutCallbacks): void {
  // Callbacks store karo
  if (callbacks) {
    storedCallbacks = callbacks;
  }

  // Agar same linkType se already initialized hai toh skip karo
  if (currentLinkType === linkType) return;

  // SDK ko required mode mein initialize karo
  DodoPayments.Initialize({
    mode: 'live',
    displayType: 'overlay',
    linkType: linkType,
    onEvent: (event: CheckoutEvent) => {
      console.log('🔔 Dodo Checkout Event:', event.event_type, event.data);

      // Event types ke basis par callbacks trigger karo
      switch (event.event_type) {
        case 'checkout.closed':
          storedCallbacks.onClose?.();
          break;
        case 'checkout.redirect':
        case 'checkout.redirect_requested':
          storedCallbacks.onComplete?.();
          break;
        case 'checkout.keys_provided':
          // License keys mil gaye — payment complete
          storedCallbacks.onComplete?.();
          break;
        default:
          break;
      }
    },
  });

  currentLinkType = linkType;
}

/**
 * Dodo Payments SDK ko product mode (static) mein initialize karo
 * Page mount hone pe call hota hai
 */
export function initDodoCheckout(callbacks?: CheckoutCallbacks): void {
  ensureInitialized('static', callbacks);
}

// D-Secure website ke colors se matching theme config
const dsecureTheme = {
  light: {
    bgPrimary: '#ffffff',
    bgSecondary: '#f0fdfa',        // teal-50 — light teal background
    borderPrimary: '#ccfbf1',      // teal-100
    borderSecondary: '#99f6e4',    // teal-200
    textPrimary: '#0f172a',        // slate-900
    textSecondary: '#475569',      // slate-500
    textPlaceholder: '#94a3b8',    // slate-400
    textError: '#dc2626',
    textSuccess: '#0d9488',        // teal-600
    buttonPrimary: '#0d9488',      // teal-600 — main brand color
    buttonPrimaryHover: '#0f766e', // teal-700
    buttonTextPrimary: '#ffffff',
    buttonSecondary: '#f0fdfa',    // teal-50
    buttonSecondaryHover: '#ccfbf1', // teal-100
    buttonTextSecondary: '#0d9488',  // teal-600
    inputFocusBorder: '#14b8a6',   // teal-500
  },
};

/**
 * Product-based overlay checkout open karo (Drive Eraser etc.)
 * 
 * @param productId - Dodo Payments product ID (e.g., "pdt_0NVH5wJYMX70syW3ioj9R")
 * @param quantity - Kitne licenses chahiye
 * @param redirectUrl - Payment complete hone ke baad redirect URL (optional)
 */
export function openOverlayCheckout(
  productId: string,
  quantity: number,
  redirectUrl?: string
): void {
  // Static mode mein ensure karo
  ensureInitialized('static');

  DodoPayments.Checkout.open({
    products: [{ productId, quantity }],
    redirectUrl: redirectUrl,
    options: {
      themeConfig: dsecureTheme,
      payButtonText: 'Pay Now',
    },
  });
}

/**
 * Payment Link based overlay checkout open karo (File Eraser etc.)
 * Dodo pe se banayi gayi session URLs ke liye
 * 
 * @param checkoutUrl - Dodo session checkout URL
 */
export function openPaymentLinkCheckout(checkoutUrl: string): void {
  // Payment links ke liye session mode chahiye
  ensureInitialized('session');

  DodoPayments.Checkout.open({
    checkoutUrl: checkoutUrl,
    options: {
      themeConfig: dsecureTheme,
      payButtonText: 'Pay Now',
    },
  });
}

/**
 * Checkout band karo (agar user manually close kare)
 */
export function closeOverlayCheckout(): void {
  try {
    DodoPayments.Checkout.close();
  } catch (error) {
    console.warn('Checkout close mein error:', error);
  }
}

export default {
  initDodoCheckout,
  openOverlayCheckout,
  openPaymentLinkCheckout,
  closeOverlayCheckout,
};
