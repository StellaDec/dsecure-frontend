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

export function useSilentActivityTracker() {
  const location = useLocation();

  // Session state references (React renders se independent)
  const sessionIdRef = useRef<string>(generateSessionId());
  const sessionStartTimeRef = useRef<number>(Date.now());
  const entryPageRef = useRef<string>(window.location.pathname + window.location.search);
  const referrerRef = useRef<string>(document.referrer || '');

  // Log buffers
  const clickLogsRef = useRef<UserClickLog[]>([]);
  const pageDwellLogsRef = useRef<PageDwellLog[]>([]);
  const formLogsRef = useRef<FormActivityLog[]>([]);

  // Current page tracking state
  const currentPageRef = useRef<string>(location.pathname);
  const pageStartTimeRef = useRef<number>(Date.now());

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

  // 2. Listen to Global Clicks & Form Field Inputs
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

    window.addEventListener('click', handleGlobalClick, { capture: true, passive: true });

    return () => {
      window.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, []);

  // 3. Dispatch Session Summary Log on Page Unload / Tab Close
  useEffect(() => {
    const handleUnloadOrFlush = () => {
      const now = Date.now();
      const lastPageDuration = Math.round((now - pageStartTimeRef.current) / 1000);
      
      // Final page duration record karein
      const finalDwellLogs = [
        ...pageDwellLogsRef.current,
        {
          path: currentPageRef.current,
          startTime: pageStartTimeRef.current,
          endTime: now,
          dwellTimeSeconds: Math.max(lastPageDuration, 1),
        },
      ];

      // Intent calculation
      const { score, level, pitch } = calculatePurchaseIntent(
        finalDwellLogs,
        clickLogsRef.current,
        formLogsRef.current
      );

      const totalSessionDuration = Math.round((now - sessionStartTimeRef.current) / 1000);

      const report: UserSessionReport = {
        sessionId: sessionIdRef.current,
        entryPage: entryPageRef.current,
        referrer: referrerRef.current,
        totalDurationSeconds: totalSessionDuration,
        pageDwellHistory: finalDwellLogs,
        clickTrace: clickLogsRef.current,
        formTrace: formLogsRef.current,
        intentScore: score,
        intentLevel: level,
        pitchRecommendation: pitch,
        createdAt: new Date().toISOString(),
      };

      // Dispatch to Gmail
      dispatchLogToGmail(report);
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
