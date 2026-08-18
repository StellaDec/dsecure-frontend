/**
 * @file emailLogger.ts
 * @description Frontend user activity tracking ke liye TypeScript interfaces aur types.
 * Is file mein user clicks, page dwell times, form activities, aur email dispatch credentials define kiye gaye hain.
 */

// User ke har click event ki information
export interface UserClickLog {
  /** Click kiya gaya element type (e.g. BUTTON, A, INPUT, DIV) */
  tagName: string;
  /** Element ki text content ya title */
  elementText: string;
  /** Element ID (agar available ho) */
  elementId?: string;
  /** Element CSS class names */
  className?: string;
  /** Page URL jahan click hua */
  pagePath: string;
  /** Click ka timestamp */
  timestamp: number;
  /** X, Y coordinates Screen par */
  coordinates: {
    x: number;
    y: number;
  };
}

// Har page par user ne kitna time bitaya (Dwell Time)
export interface PageDwellLog {
  /** Page route path (e.g. /buy-now, /pricing) */
  path: string;
  /** Page visit ka start time (timestamp) */
  startTime: number;
  /** Page chhodne ka time (timestamp) */
  endTime: number;
  /** Total dwell time (seconds mein) */
  dwellTimeSeconds: number;
}

// Form filling activity detail
export interface FormActivityLog {
  /** Form ka ID ya identifier name */
  formId: string;
  /** Field ka name ya placeholder */
  fieldName: string;
  /** Masked value ya filled status */
  fieldStatus: 'focused' | 'filled' | 'submitted';
  /** Field me type kiya gaya data (masked for sensitive) */
  fieldValue?: string;
  /** Time spent on field in seconds */
  durationSeconds: number;
  /** Timestamp */
  timestamp: number;
}

// Form submission data capture
export interface FormSubmissionLog {
  /** Form ka ID ya name */
  formId: string;
  /** Page route path */
  pagePath: string;
  /** Captured form data (sensitive fields masked) */
  formData: Record<string, string>;
  /** Timestamp */
  timestamp: number;
}

// Overall User Session Metric Report
export interface UserSessionReport {
  /** Unique session ID */
  sessionId: string;
  /** Unique persistent visitor ID */
  visitorId: string;
  /** User ka entry page (Landing URL) */
  entryPage: string;
  /** Traffic referrer source */
  referrer: string;
  /** Total session duration in seconds */
  totalDurationSeconds: number;
  /** Har page par stay duration ka record */
  pageDwellHistory: PageDwellLog[];
  /** Sabhi clicks ka log trace */
  clickTrace: UserClickLog[];
  /** Form activity trace */
  formTrace: FormActivityLog[];
  /** Submitted forms data */
  formSubmissions?: FormSubmissionLog[];
  /** Calculated Purchase Intent Score (0 - 100) */
  intentScore: number;
  /** Intent level classification */
  intentLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  /** Pitch suggestions for sales / team */
  pitchRecommendation: string;
  /** Session creation timestamp */
  createdAt: string;
}

// Gmail Configuration settings
export interface GmailConfig {
  /** Gmail account email address */
  userEmail: string;
  /** Gmail App Password (16-digit) */
  appPassword: string;
  /** Log report receive karne vala receiver email */
  receiverEmail: string;
}
