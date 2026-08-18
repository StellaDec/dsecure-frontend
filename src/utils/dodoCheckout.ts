/**
 * Dodo Payments Checkout Utility
 * Session-based overlay checkout using backend API
 */

import { DodoPayments } from 'dodopayments-checkout';
import type { CheckoutEvent } from 'dodopayments-checkout';
import { api } from './apiClient';

let isInitialized = false;
let isCheckoutOpen = false;

interface CheckoutCallbacks {
  onComplete?: () => void;
  onClose?: () => void;
}

let storedCallbacks: CheckoutCallbacks = {};

const dsecureTheme = {
  bgPrimary: '#ffffff',
  bgSecondary: '#f0fdfa',
  borderPrimary: '#ccfbf1',
  borderSecondary: '#99f6e4',
  textPrimary: '#0f172a',
  textSecondary: '#475569',
  textPlaceholder: '#94a3b8',
  textError: '#dc2626',
  textSuccess: '#0d9488',
  buttonPrimary: '#0d9488',
  buttonPrimaryHover: '#0f766e',
  buttonTextPrimary: '#ffffff',
  buttonSecondary: '#f0fdfa',
  buttonSecondaryHover: '#ccfbf1',
  buttonTextSecondary: '#0d9488',
  inputFocusBorder: '#14b8a6',
};

function ensureInitialized(callbacks?: CheckoutCallbacks): void {
  if (callbacks) {
    storedCallbacks = callbacks;
  }
  
  if (isInitialized) return;

  DodoPayments.Initialize({
    mode: 'live',
    displayType: 'overlay', // OVERLAY MODE
    linkType: 'session',    // SESSION MODE (No double checkout bug)
    onEvent: (event: CheckoutEvent) => {
      console.log('🔔 Dodo Checkout Event:', event.event_type);
      switch (event.event_type) {
        case 'checkout.opened': 
          isCheckoutOpen = true; 
          break;
        case 'checkout.closed': 
          isCheckoutOpen = false; 
          storedCallbacks.onClose?.(); 
          break;
        case 'checkout.redirect':
        case 'checkout.redirect_requested':
        case 'checkout.keys_provided': 
          isCheckoutOpen = false; 
          storedCallbacks.onComplete?.(); 
          break;
        default:
          break;
      }
    },
  });

  isInitialized = true;
}

export function initDodoCheckout(callbacks?: CheckoutCallbacks): void {
  ensureInitialized(callbacks);
}

/**
 * Product-based checkout — overlay mode using backend session API
 */
export async function openOverlayCheckout(
  productId: string,
  quantity: number,
  _redirectUrl?: string
): Promise<void> {
  if (isCheckoutOpen) {
    console.warn('⚠️ Checkout already open — skipping');
    return;
  }

  try {
    console.log('🚀 Creating checkout session for product:', productId);
    
    // Call backend API to create session (GET request as per backend configuration)
    const response = await api.get('/api/CheckoutLinks/create-session', {
      params: {
        productId,
        quantity,
      }
    });

    const checkoutUrl = response.data?.checkoutUrl || response.data?.url || response.data;
    
    if (typeof checkoutUrl === 'string' && checkoutUrl.startsWith('http')) {
      console.log('🚀 Opening Dodo Overlay for session:', checkoutUrl);
      
      // Ensure SDK is ready before opening
      ensureInitialized();
      isCheckoutOpen = true;

      // Open the overlay
      DodoPayments.Checkout.open({
        checkoutUrl: checkoutUrl,
        options: {
          themeConfig: dsecureTheme as unknown as Record<string, string>,
          payButtonText: 'Pay Now',
        },
      });
    } else {
      console.error("Invalid response from create-session API:", response.data);
      alert("Failed to initialize checkout session. Invalid response.");
    }
  } catch (error) {
    console.error("Error calling create-session API:", error);
    alert("Network error while creating checkout session.");
    throw error; // Let PricingAndPlanPage handle the loading state
  }
}

/**
 * Payment Link / Session based checkout — overlay mode
 */
export async function openPaymentLinkCheckout(checkoutUrl: string): Promise<void> {
  if (isCheckoutOpen) {
    console.warn('⚠️ Checkout already open — skipping');
    return;
  }

  console.log('🚀 Opening payment link in overlay:', checkoutUrl);
  ensureInitialized();
  isCheckoutOpen = true;

  DodoPayments.Checkout.open({
    checkoutUrl: checkoutUrl,
    options: {
      themeConfig: dsecureTheme as unknown as Record<string, string>,
      payButtonText: 'Pay Now',
    },
  });
}

/**
 * Close the overlay checkout programmatically
 */
export function closeOverlayCheckout(): void {
  try {
    if (isInitialized && isCheckoutOpen) {
      DodoPayments.Checkout.close();
      isCheckoutOpen = false;
    }
  } catch (error) {
    console.warn('Error closing checkout overlay:', error);
  }
}

export default {
  initDodoCheckout,
  openOverlayCheckout,
  openPaymentLinkCheckout,
  closeOverlayCheckout,
};
