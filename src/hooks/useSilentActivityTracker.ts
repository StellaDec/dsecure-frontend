/**
 * @file useSilentActivityTracker.ts
 * @description Pure React hook jo poori frontend application ki user activity ko silently record karta hai.
 * Clicks, page stay duration, form activity track hoti hai aur exit/unload par email report dispatch karta hai.
 */

import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  UserClickLog,
  PageDwellLog,
  FormActivityLog,
  FormSubmissionLog,
  UserSessionReport,
} from '../types/emailLogger';
import {
  calculatePurchaseIntent,
  dispatchLogToGmail,
} from '../services/gmailLoggerService';

// Random Session ID generator
function generateSessionId(): string {
  return 'sess_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
}

// Persistent Visitor ID generator (LocalStorage-based)
function getOrCreateVisitorId(): string {
  const key = 'dsecure_visitor_id';
  let vId = localStorage.getItem(key);
  if (!vId) {
    vId = 'vf_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
    localStorage.setItem(key, vId);
  }
  return vId;
}

export function useSilentActivityTracker() {
  const location = useLocation();

  // Session state references (React renders se independent)
  const sessionIdRef = useRef<string>(generateSessionId());
  const visitorIdRef = useRef<string>(getOrCreateVisitorId());
  const sessionStartTimeRef = useRef<number>(Date.now());
  const entryPageRef = useRef<string>(window.location.pathname + window.location.search);
  const referrerRef = useRef<string>(document.referrer || '');

  // Log buffers
  const clickLogsRef = useRef<UserClickLog[]>([]);
  const pageDwellLogsRef = useRef<PageDwellLog[]>([]);
  const formLogsRef = useRef<FormActivityLog[]>([]);
  const formSubmissionsRef = useRef<FormSubmissionLog[]>([]);

  // Current page tracking state
  const currentPageRef = useRef<string>(location.pathname);
  const pageStartTimeRef = useRef<number>(Date.now());

  // Helper: Report generate karne ke liye
  const generateReport = (): UserSessionReport => {
    const now = Date.now();
    const lastPageDuration = Math.round((now - pageStartTimeRef.current) / 1000);
    
    const finalDwellLogs = [
      ...pageDwellLogsRef.current,
      {
        path: currentPageRef.current,
        startTime: pageStartTimeRef.current,
        endTime: now,
        dwellTimeSeconds: Math.max(lastPageDuration, 1),
      },
    ];

    const { score, level, pitch } = calculatePurchaseIntent(
      finalDwellLogs,
      clickLogsRef.current,
      formLogsRef.current,
      formSubmissionsRef.current
    );

    const totalSessionDuration = Math.round((now - sessionStartTimeRef.current) / 1000);

    return {
      sessionId: sessionIdRef.current,
      visitorId: visitorIdRef.current,
      entryPage: entryPageRef.current,
      referrer: referrerRef.current,
      totalDurationSeconds: totalSessionDuration,
      pageDwellHistory: finalDwellLogs,
      clickTrace: clickLogsRef.current,
      formTrace: formLogsRef.current,
      formSubmissions: formSubmissionsRef.current,
      intentScore: score,
      intentLevel: level,
      pitchRecommendation: pitch,
      createdAt: new Date().toISOString(),
    };
  };

  // 1. Listen to Route Changes & Calculate Page Dwell Time
  useEffect(() => {
    const prevPage = currentPageRef.current;
    const now = Date.now();
    const durationSeconds = Math.round((now - pageStartTimeRef.current) / 1000);

    // Agar user ne kam se kam 1 sec spent kiya ho
    if (durationSeconds > 0) {
      pageDwellLogsRef.current.push({
        path: prevPage,
        startTime: pageStartTimeRef.current,
        endTime: now,
        dwellTimeSeconds: durationSeconds,
      });
    }

    // Reset for new route
    currentPageRef.current = location.pathname;
    pageStartTimeRef.current = now;
  }, [location.pathname]);

  // 2. Listen to Global Clicks, Form Field Inputs, and Form Submissions
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target) return;

      // Click log create karein
      const clickLog: UserClickLog = {
        tagName: target.tagName,
        elementText: (target.innerText || (target as HTMLInputElement).value || target.getAttribute('aria-label') || '').trim().substring(0, 60),
        elementId: target.id || undefined,
        className: target.className && typeof target.className === 'string' ? target.className.substring(0, 50) : undefined,
        pagePath: window.location.pathname,
        timestamp: Date.now(),
        coordinates: {
          x: event.clientX,
          y: event.clientY,
        },
      };

      clickLogsRef.current.push(clickLog);

      // Agar click input/textarea par hai to form activity log record karein
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        const inputElem = target as HTMLInputElement;
        const fieldName = inputElem.name || inputElem.id || inputElem.placeholder || 'Unknown Field';
        
        formLogsRef.current.push({
          formId: inputElem.form?.id || 'default_form',
          fieldName: fieldName,
          fieldStatus: 'focused',
          durationSeconds: 1,
          timestamp: Date.now(),
        });
      }
    };

    const handleFormSubmit = (event: SubmitEvent) => {
      const target = event.target as HTMLFormElement;
      if (!target || target.tagName !== 'FORM') return;

      const formData = new FormData(target);
      const data: Record<string, string> = {};
      const sensitiveKeywords = ['password', 'pwd', 'pin', 'cvv', 'secret', 'card'];

      formData.forEach((value, key) => {
        const isSensitive = sensitiveKeywords.some(kw => key.toLowerCase().includes(kw));
        if (isSensitive) {
          data[key] = '[REDACTED]';
        } else {
          data[key] = value.toString();
        }
      });

      formSubmissionsRef.current.push({
        formId: target.id || target.name || 'unknown_form',
        pagePath: window.location.pathname,
        formData: data,
        timestamp: Date.now(),
      });

      // Turant report dispatch karein form submit hone par
      const report = generateReport();
      dispatchLogToGmail(report, false);
    };

    const handleFormInput = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target) return;

      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        const inputElem = target as HTMLInputElement;
        const fieldName = inputElem.name || inputElem.id || inputElem.placeholder || 'Unknown Field';
        const sensitiveKeywords = ['password', 'pwd', 'pin', 'cvv', 'secret', 'card'];
        const isSensitive = sensitiveKeywords.some(kw => fieldName.toLowerCase().includes(kw) || inputElem.type === 'password');

        let val = inputElem.value;
        if (isSensitive) {
          val = '[REDACTED]';
        }

        const formId = inputElem.form?.id || inputElem.form?.name || 'default_form';

        // Same field ka purana typing log dhundo aur update karo taaki array me hazaro entries na bane (keystroke by keystroke)
        const existingLog = formLogsRef.current.find(log => log.formId === formId && log.fieldName === fieldName && log.fieldStatus === 'filled');
        
        if (existingLog) {
          existingLog.fieldValue = val;
          existingLog.timestamp = Date.now();
        } else {
          formLogsRef.current.push({
            formId: formId,
            fieldName: fieldName,
            fieldStatus: 'filled',
            fieldValue: val,
            durationSeconds: 1,
            timestamp: Date.now(),
          });
        }
      }
    };

    window.addEventListener('click', handleGlobalClick, { capture: true, passive: true });
    window.addEventListener('submit', handleFormSubmit, { capture: true, passive: true });
    window.addEventListener('input', handleFormInput, { capture: true, passive: true });

    return () => {
      window.removeEventListener('click', handleGlobalClick, { capture: true });
      window.removeEventListener('submit', handleFormSubmit, { capture: true });
      window.removeEventListener('input', handleFormInput, { capture: true });
    };
  }, []);

  // 3. Dispatch Session Summary Log on Page Unload / Tab Close
  useEffect(() => {
    // Duplicate dispatch rokne ke liye flag
    let hasDispatched = false;

    const handleUnloadOrFlush = () => {
      // Agar pehle se dispatch ho chuka hai toh dobara mat bhejo
      if (hasDispatched) return;
      hasDispatched = true;

      const report = generateReport();
      // Beacon mode use karo — tab close hone par bhi request complete hogi
      dispatchLogToGmail(report, true);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleUnloadOrFlush();
      }
    };

    window.addEventListener('beforeunload', handleUnloadOrFlush);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleUnloadOrFlush);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}


