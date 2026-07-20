/**
 * @file gmailLoggerService.ts
 * @description Frontend user activity tracking aur Gmail log dispatching service.
 * Is file mein intent scoring, HTML report formatting aur email dispatch logic hai.
 */

import {
  UserSessionReport,
  PageDwellLog,
  UserClickLog,
  FormActivityLog,
  GmailConfig,
} from '../types/emailLogger';

/**
 * Gmail Credentials ko environment variables se extract karne vala function.
 */
export function getGmailConfig(): GmailConfig {
  return {
    userEmail: import.meta.env.VITE_GMAIL_USER || '',
    appPassword: import.meta.env.VITE_GMAIL_APP_PASSWORD || '',
    receiverEmail: import.meta.env.VITE_GMAIL_RECEIVER || import.meta.env.VITE_GMAIL_USER || '',
  };
}

/**
 * User behavior ke basis par Purchase Intent Score (0 - 100) calculate karta hai.
 * @param dwellLogs Page stay duration logs
 * @param clicks Click trace logs
 * @param formLogs Form activity logs
 */
export function calculatePurchaseIntent(
  dwellLogs: PageDwellLog[],
  clicks: UserClickLog[],
  formLogs: FormActivityLog[]
): { score: number; level: 'HIGH' | 'MEDIUM' | 'LOW'; pitch: string } {
  let score = 10; // Base score visitor ke liye

  // High-intent routes define karein
  const highIntentPages = ['/buy-now', '/pricing', '/checkout', '/cart', '/contact'];
  
  // 1. Check high intent page visits & stay duration
  dwellLogs.forEach((log) => {
    const isHighIntentPage = highIntentPages.some((p) => log.path.toLowerCase().includes(p));
    if (isHighIntentPage) {
      score += 25;
      if (log.dwellTimeSeconds > 20) {
        score += 15; // Extra boost agar 20s+ rukka
      }
    } else {
      score += Math.min(log.dwellTimeSeconds * 0.5, 10);
    }
  });

  // 2. Check CTA & Buy button clicks
  const buyClickKeywords = ['buy', 'purchase', 'checkout', 'pricing', 'get started', 'order', 'demo'];
  clicks.forEach((click) => {
    const text = (click.elementText || '').toLowerCase();
    if (buyClickKeywords.some((kw) => text.includes(kw))) {
      score += 15;
    }
  });

  // 3. Check Form filling progress
  if (formLogs.length > 0) {
    score += 20;
  }

  // Cap score at 100
  score = Math.min(Math.round(score), 100);

  // Intent classification aur Pitch Recommendation
  let level: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';
  let pitch = 'General Awareness Pitch - Show product features & benefits.';

  if (score >= 70) {
    level = 'HIGH';
    pitch = 'HOT LEAD! High Purchase Intent - Offer direct volume discount, fast closing pitch & schedule demo immediately.';
  } else if (score >= 40) {
    level = 'MEDIUM';
    pitch = 'WARM LEAD! Moderate interest - Send comparison guide, customer testimonials & key ROI highlights.';
  }

  return { score, level, pitch };
}

/**
 * User session log report ko beautiful HTML Email Format mein convert karta hai.
 */
export function formatSessionLogHtml(report: UserSessionReport): string {
  const dwellRows = report.pageDwellHistory
    .map(
      (d) => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${d.path}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${d.dwellTimeSeconds} seconds</td>
      </tr>
    `
    )
    .join('');

  const clickRows = report.clickTrace
    .slice(-15) // Top 15 recent clicks
    .map(
      (c) => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${c.pagePath}</td>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>${c.tagName}</strong> (${c.elementText || 'No text'})</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${new Date(c.timestamp).toLocaleTimeString()}</td>
      </tr>
    `
    )
    .join('');

  const badgeColor =
    report.intentLevel === 'HIGH' ? '#dc2626' : report.intentLevel === 'MEDIUM' ? '#d97706' : '#2563eb';

  return `
    <div style="font-family: Arial, sans-serif; color: #1f2937; max-width: 650px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
      <h2 style="color: #111827; border-bottom: 2px solid #3b82f6; padding-bottom: 8px;">
        🎯 User Activity Log & Sales Pitch Summary
      </h2>
      
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
        <p style="margin: 4px 0;"><strong>Session ID:</strong> ${report.sessionId}</p>
        <p style="margin: 4px 0;"><strong>Entry Page:</strong> ${report.entryPage}</p>
        <p style="margin: 4px 0;"><strong>Referrer:</strong> ${report.referrer || 'Direct Visit'}</p>
        <p style="margin: 4px 0;"><strong>Total Time Spent:</strong> ${report.totalDurationSeconds} seconds</p>
        <p style="margin: 4px 0;"><strong>Created At:</strong> ${report.createdAt}</p>
      </div>

      <div style="background-color: #eff6ff; border-left: 4px solid ${badgeColor}; padding: 12px 16px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 6px 0; color: #1e3a8a;">
          Purchase Intent: <span style="color: ${badgeColor}; font-weight: bold;">${report.intentLevel} (${report.intentScore}/100)</span>
        </h3>
        <p style="margin: 0; font-size: 14px; color: #1e40af;">
          <strong>Sales Pitch Guide:</strong> ${report.pitchRecommendation}
        </p>
      </div>

      <h3 style="color: #374151;">⏱ Page Stay Duration (Dwell Time)</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #f9fafb;">
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Page Path</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Stay Duration</th>
          </tr>
        </thead>
        <tbody>
          ${dwellRows || '<tr><td colspan="2" style="padding: 8px; border: 1px solid #ddd;">No page transitions recorded</td></tr>'}
        </tbody>
      </table>

      <h3 style="color: #374151;">🖱 User Click Trace (Recent 15 Clicks)</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f9fafb;">
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Page</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Clicked Element</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Time</th>
          </tr>
        </thead>
        <tbody>
          ${clickRows || '<tr><td colspan="3" style="padding: 8px; border: 1px solid #ddd;">No click events recorded</td></tr>'}
        </tbody>
      </table>
    </div>
  `;
}

/**
 * Session report log ko Gmail par dispatch karta hai via direct API / Beacon dispatch.
 * @param report Complete user session report object
 */
export async function dispatchLogToGmail(report: UserSessionReport): Promise<boolean> {
  const config = getGmailConfig();

  // Agar user credentials set nahi hain, to fallback console alert
  if (!config.userEmail || !config.appPassword) {
    console.info('[ActivityLogger] Gmail credentials not provided in .env (VITE_GMAIL_USER). Log compiled locally:', report);
    return false;
  }

  const htmlContent = formatSessionLogHtml(report);

  try {
    // SMTPJS API dispatch call (allows direct use of Gmail + App Password)
    const requestBody = JSON.stringify({
      Action: 'Send',
      Host: 'smtp.gmail.com',
      Username: config.userEmail,
      Password: config.appPassword,
      To: config.receiverEmail,
      From: config.userEmail,
      Subject: `[User Log] Intent ${report.intentLevel} (${report.intentScore}/100) - Session ${report.sessionId}`,
      Body: htmlContent,
    });

    const response = await fetch('https://smtpjs.com/v3/smtpjs.aspx?', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: requestBody,
    });

    // SMTPJS mostly returns 200 OK with string "OK" if success, else error string.
    const responseText = await response.text();
    if (response.ok && responseText.trim().toUpperCase() === 'OK') {
      return true;
    }
    
    console.error('[ActivityLogger] SMTPJS error:', responseText);
    return false;
  } catch (error) {
    console.error('[ActivityLogger] Failed to dispatch log email:', error);
    return false;
  }
}
