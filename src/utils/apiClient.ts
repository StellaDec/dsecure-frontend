/**
 * ?? Axios API Client with AES-256-CBC Decryption Interceptor
 * 
 * Features:
 * - Automatic JWT token injection
 * - Smart response decryption for encrypted payloads
 * - Binary data passthrough (PDF, images, downloads)
 * - Request/Response logging in development
 * 
 * Interceptor Priority Logic:
 * 1. BINARY SAFETY: Skip decryption for binary content types and download URLs
 * 2. ENCRYPTION CHECK: Decrypt if response has { encrypted: true, data: "..." }
 * 3. FALLBACK: Return response as-is
 */

import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { EncryptionService, isEncryptedResponse } from "./EncryptionService";
import { encodeEmail } from "./encodeEmail";
import { debugLog, debugError, debugWarn } from "./debugLogger";
import { isDemoMode } from "../data/demoData";

// API Base URL from environment
// API Base URL constants ko module level se hatakar instance creation ke time access karenge

/**
 * Binary content types that should NOT be decrypted
 */
const BINARY_CONTENT_TYPES = [
  "application/pdf",
  "application/octet-stream",
  "application/zip",
  "application/x-zip-compressed",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument",
  "image/",
  "audio/",
  "video/",
];

/**
 * URL patterns that indicate binary/download requests
 */
const BINARY_URL_PATTERNS = [
  "/download",
  "/export-pdf",
  "/export",
  "/generate-pdf",
  "/file/",
  "/attachment/",
  "/blob/",
];

/**
 * Check if content type indicates binary data
 */
function isBinaryContentType(contentType: string | undefined): boolean {
  if (!contentType) return false;
  const lowerContentType = contentType.toLowerCase();
  return BINARY_CONTENT_TYPES.some((type) => lowerContentType.includes(type));
}

/**
 * Check if URL indicates a binary/download request
 */
function isBinaryUrl(url: string | undefined): boolean {
  if (!url) return false;
  const lowerUrl = url.toLowerCase();
  return BINARY_URL_PATTERNS.some((pattern) => lowerUrl.includes(pattern));
}

/**
 * Create configured Axios instance
 */
function createApiInstance(): AxiosInstance {
  const baseURL = import.meta.env.VITE_API_BASE_URL || "https://api.dsecuretech.com";
  const timeout = Number(import.meta.env.VITE_API_TIMEOUT) || 60000;

  if (import.meta.env.DEV) {
    console.log(`?? API Instance created with BaseURL: ${baseURL}`);
  }

  const instance = axios.create({
    baseURL: baseURL,
    timeout: timeout,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // Don't transform response automatically - we handle it in interceptor
    transformResponse: [(data) => data],
  });

  // ---------------------------------------------------------------------------
  // REQUEST INTERCEPTOR - Add JWT Token, Email Header & Logging
  // ---------------------------------------------------------------------------
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Get JWT token from storage
      const token =
        sessionStorage.getItem("D-Secure:jwt") ||
        localStorage.getItem("D-Secure:jwt") ||
        localStorage.getItem("jwt_token");

      // Add Authorization header if token exists AND request is not for a public endpoint
      // Skip auth for auth endpoints to prevent token validation errors from stale tokens
      const isPublicEndpoint =
        config.url?.includes("/api/ForgotPassword/") ||
        config.url?.includes("/api/RoleBasedAuth/login") ||
        config.url?.includes("/api/RoleBasedAuth/register");

      if (token && !isPublicEndpoint) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // 🛑 BLOCK API CALLS IN DEMO MODE (except public ones like login)
      if (isDemoMode() && !isPublicEndpoint) {
        // debugWarn("DEMO", `🚫 Blocking API call in Demo Mode: ${config.url}`);
        // Cancellation using CancelToken or throwing error
        const controller = new AbortController();
        config.signal = controller.signal;
        controller.abort("DEMO_RESTRICTION");

        return Promise.reject(new Error("Action restricted in Demo Mode"));
      }

      // -------------------------------------------------------------------------
      // FRONTEND PII-SAFE REFACTOR:
      // Add user email to headers (Base64 encoded) instead of URL parameters
      // -------------------------------------------------------------------------
      const storedUserData = localStorage.getItem("user_data");
      const authUser = localStorage.getItem("authUser");

      let userEmail = "";
      if (storedUserData) {
        try {
          const userData = JSON.parse(storedUserData);
          userEmail =
            userData.user_email ||
            userData.email ||
            userData.subuser_email ||
            "";
        } catch (e) {
          // Ignore parse errors - Safe fallback logic
          void e;
        }
      } else if (authUser) {
        try {
          const userData = JSON.parse(authUser);
          userEmail = userData.user_email || userData.email || "";
        } catch (e) {
          // Ignore parse errors - Safe fallback logic
          void e;
        }
      }

      // Add encoded email to headers if available
      if (userEmail) {
        config.headers["X-User-Email"] = encodeEmail(userEmail);
      }

      // Development logging
      debugLog("API", `?? ${config.method?.toUpperCase()} ${config.url}`);

      return config;
    },
    (error) => {
      debugError("API", "Request Interceptor Error", error);
      return Promise.reject(error);
    },
  );

  // ---------------------------------------------------------------------------
  // RESPONSE INTERCEPTOR - Smart Decryption Logic
  // ---------------------------------------------------------------------------
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      const contentType = response.headers["content-type"];
      const requestUrl = response.config.url;

      // -------------------------------------------------------------------------
      // RULE 1: BINARY SAFETY - Skip decryption for binary content
      // -------------------------------------------------------------------------
      if (isBinaryContentType(contentType) || isBinaryUrl(requestUrl)) {
        debugLog(
          "API",
          `?? Binary response, skipping decryption: ${requestUrl}`,
        );
        return response;
      }

      // -------------------------------------------------------------------------
      // Parse JSON response if it's a string
      // -------------------------------------------------------------------------
      let responseData = response.data;

      // If response data is string, try to parse as JSON
      if (typeof responseData === "string") {
        try {
          responseData = JSON.parse(responseData);
          // JSON parse ho gaya, ab simplified response data use karein
          response.data = responseData;
        } catch {
          // JSON nahi mila, ye shayad HTML error page h (e.g. Vercel SPA redirect)
          debugLog("API", `?? Non-JSON response received from: ${requestUrl}`);
          
          // Agar hum API endpoint call kar rahe hain aur HTML mil raha h, toh ye ek problem h
          if (requestUrl?.includes('/api/')) {
            // ?? NAYA CODE: console.error use karo (production mein bhi survive karega)
            console.error("❌ CRITICAL: Expected JSON from API but got non-JSON response.", {
              url: requestUrl,
              responsePreview: typeof responseData === 'string' ? responseData.substring(0, 200) : 'N/A',
              hint: "Check VITE_API_BASE_URL - it might be pointing to wrong server or Vercel SPA redirect is intercepting API calls"
            });
          }
          return response;
        }
      }

      // -------------------------------------------------------------------------
      // RULE 2: ENCRYPTION CHECK - Agar response encrypted h toh decrypt karein
      // -------------------------------------------------------------------------
      if (isEncryptedResponse(responseData)) {
        try {
          debugLog("ENCRYPT", `?? Encrypted response detected, decrypting...`);

          const isCompressed = responseData.compressed !== false;
          const decryptedData = EncryptionService.decrypt(
            responseData.data,
            isCompressed,
          );

          if (!decryptedData) {
            throw new Error("Decryption failed or returned empty data");
          }

          // Decrypted data ko response body mein daalein
          response.data = decryptedData;
          debugLog("ENCRYPT", "✅ Decryption successful");
          
          // IMPORTANT: Return early so RULE 3 doesn't overwrite decrypted data
          return response;
        } catch (decryptError: any) {
          // ?? NAYA CODE: console.error use karo (production mein bhi dikhega)
          console.error("❌ Decryption Error:", decryptError.message, {
            url: requestUrl,
            dataLength: responseData?.data?.length || 0,
            compressed: responseData?.compressed,
          });
          
          // Decryption fail hone pe fallback error data bhejenge
          response.data = {
            success: false,
            error: "Failed to decrypt server response",
            message: decryptError.message || "Decryption error on client side"
          };
          return response;
        }
      }


      // -------------------------------------------------------------------------
      // RULE 3: FALLBACK - Parsed JSON return karein
      // -------------------------------------------------------------------------
      response.data = responseData;

      debugLog(
        "API",
        `?? Response: ${response.config.url} [${response.status}]`,
      );

      return response;
    },
    (error) => {
      // Handle response errors with detailed logging
      const status = error.response?.status;
      const url = error.config?.url;
      const method = error.config?.method?.toUpperCase() || "REQUEST";

      // Always log API errors with full details
      debugError(
        "API",
        `${method} ${url} failed [${status || "NETWORK"}]`,
        error,
      );

      if (error.response) {
        const isLoginEndpoint = url?.includes("/api/RoleBasedAuth/login");

        // Handle 401 Unauthorized - Token expired or invalid (Skip redirect for login to prevent page reloads)
        if (status === 401 && !isLoginEndpoint) {
          debugWarn("AUTH", "Session expired - clearing tokens");
          sessionStorage.removeItem("D-Secure:jwt");
          localStorage.removeItem("D-Secure:jwt");
          localStorage.removeItem("jwt_token");
          localStorage.removeItem("user_data");
          localStorage.removeItem("authUser");
          localStorage.removeItem("pdfExportSettingsCache");

          // Dispatch custom event for auth handling
          globalThis.dispatchEvent(
            new CustomEvent("authError", {
              detail: { status: 401, message: "Session expired" },
            }),
          );

          // Redirect to login page with expired flag
          globalThis.location.href = "/login";
        }

        // Try to parse error response
        if (typeof error.response.data === "string") {
          try {
            error.response.data = JSON.parse(error.response.data);
          } catch {
            // Keep as string
          }
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
}

// ---------------------------------------------------------------------------
// EXPORT CONFIGURED INSTANCE (Lazy-initialized to avoid module loading order issues)
// ---------------------------------------------------------------------------

/**
 * Lazy-initialized API instance
 */
let apiInstance: AxiosInstance | null = null;

/**
 * Get the configured Axios instance (lazy initialization)
 */
function getApiInstance(): AxiosInstance {
  apiInstance ??= createApiInstance();
  return apiInstance;
}

/**
 * Pre-configured Axios instance with encryption interceptor
 * Use this for all API calls to the .NET backend
 * Uses Proxy for lazy initialization to avoid module load-time execution
 */
export const api = new Proxy({} as AxiosInstance, {
  get(_, prop) {
    const instance = getApiInstance();
    const value = (instance as any)[prop];
    return typeof value === 'function' ? value.bind(instance) : value;
  },
  set(_, prop, value) {
    const instance = getApiInstance();
    (instance as any)[prop] = value;
    return true;
  }
});

/**
 * Set JWT token for all future requests
 */
export function setAuthToken(token: string, persist: boolean = false): void {
  sessionStorage.setItem('D-Secure:jwt', token);
  if (persist) {
    localStorage.setItem('D-Secure:jwt', token);
  }
  getApiInstance().defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

/**
 * Clear JWT token
 */
export function clearAuthToken(): void {
  sessionStorage.removeItem('D-Secure:jwt');
  localStorage.removeItem('D-Secure:jwt');
  localStorage.removeItem('jwt_token');
  delete getApiInstance().defaults.headers.common['Authorization'];
}

/**
 * Get current API base URL
 */
export function getApiBaseUrl(): string {
  return import.meta.env.VITE_API_BASE_URL || "https://api.dsecuretech.com";
}

// Export types
export type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export default api;

