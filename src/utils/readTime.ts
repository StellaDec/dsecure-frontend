/**
 * Calculation for estimated read time based on word count.
 * HTML tags strip karke pure text ka word count nikalta hai.
 * Average reading speed: 200 words per minute (industry standard).
 *
 * @param text Plain text ya HTML content jiska reading time calculate karna hai.
 * @returns Estimated minutes string (e.g., "5 min read").
 */
export const getReadTime = (text: string): string => {
  if (!text || text.trim().length === 0) return '1 min read';

  // HTML tags strip karo — lawsContent se aane wala content HTML mein hota hai
  const plainText = text.replace(/<[^>]*>/g, '');

  // Page ka reading time calculate karne ke liye — pure word count, koi multiplier nahi
  const wordsPerMinute = 200;
  const wordCount = plainText.split(/\s+/).filter(w => w.length > 0).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  // Minimum 1 min read dikhao
  return `${Math.max(1, minutes)} min read`;
};
