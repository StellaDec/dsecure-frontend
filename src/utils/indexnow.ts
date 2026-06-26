/**
 * IndexNow Utility — Search engines ko content changes notify karne ke liye
 * Ye utility CI/CD pipeline (post-deploy script) mein use hoti hai
 * 
 * Usage (Node.js / CI script):
 *   import { submitUrlsToIndexNow } from './indexnow';
 *   await submitUrlsToIndexNow(['https://dsecuretech.com/products/drive-eraser']);
 */

// IndexNow API endpoint — Bing aur Yandex dono support karte hain
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

// Site host — dsecuretech.com
const SITE_HOST = 'dsecuretech.com';

/**
 * IndexNow API ko URL list bhejta hai taaki search engines jaldi crawl karein
 * @param urls - Array of absolute URLs to submit
 * @param key - IndexNow key (env se ya parameter se)
 */
export async function submitUrlsToIndexNow(
  urls: string[],
  key?: string
): Promise<{ success: boolean; status: number; message: string }> {
  // Key resolve karo — parameter ya environment variable se
  const indexNowKey = key || process.env.INDEXNOW_KEY || import.meta.env?.VITE_INDEXNOW_KEY;

  if (!indexNowKey) {
    return {
      success: false,
      status: 0,
      message: 'IndexNow key nahi mili — INDEXNOW_KEY env var set karo',
    };
  }

  if (urls.length === 0) {
    return { success: false, status: 0, message: 'Koi URL submit nahi hua — empty array' };
  }

  // Single URL ke liye GET, multiple ke liye POST (batch)
  if (urls.length === 1) {
    const params = new URLSearchParams({
      url: urls[0],
      key: indexNowKey,
    });

    const response = await fetch(`${INDEXNOW_ENDPOINT}?${params.toString()}`);
    return {
      success: response.ok || response.status === 202,
      status: response.status,
      message: response.ok || response.status === 202
        ? `URL submitted successfully: ${urls[0]}`
        : `IndexNow error: ${response.status} ${response.statusText}`,
    };
  }

  // Batch submission — POST request with JSON body
  const payload = {
    host: SITE_HOST,
    key: indexNowKey,
    keyLocation: `https://${SITE_HOST}/${indexNowKey}.txt`,
    urlList: urls,
  };

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  return {
    success: response.ok || response.status === 202,
    status: response.status,
    message: response.ok || response.status === 202
      ? `${urls.length} URLs batch submitted successfully`
      : `IndexNow batch error: ${response.status} ${response.statusText}`,
  };
}

/**
 * Common pages jo deploy ke baad submit karne chahiye
 * CI/CD script mein directly import karke use kar sakte ho
 */
export const CRITICAL_URLS = [
  `https://${SITE_HOST}/`,
  `https://${SITE_HOST}/all-products`,
  `https://${SITE_HOST}/products/drive-eraser`,
  `https://${SITE_HOST}/products/file-eraser`,
  `https://${SITE_HOST}/products/hardware-diagnostics`,
  `https://${SITE_HOST}/pricing-and-plan`,
  `https://${SITE_HOST}/contact`,
  `https://${SITE_HOST}/about`,
  `https://${SITE_HOST}/blog`,
  `https://${SITE_HOST}/compliance`,
];
