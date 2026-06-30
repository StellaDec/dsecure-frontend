import DOMPurify from 'isomorphic-dompurify';

// Define the strict allowlist of tags and attributes
const ALLOWED_TAGS = [
  'p', 'b', 'i', 'em', 'strong', 'a', 
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
  'ul', 'ol', 'li', 'br', 'hr', 'blockquote', 
  'code', 'pre', 'span', 'div', 'img', 
  'table', 'thead', 'tbody', 'tr', 'th', 'td'
];

const ALLOWED_ATTR = [
  'href', 'src', 'alt', 'title', 'class', 'target', 'rel'
];

/**
 * Configure DOMPurify hook to automatically add 
 * target="_blank" and rel="noopener noreferrer" 
 * to all sanitized links.
 */
DOMPurify.addHook('afterSanitizeAttributes', function(node) {
  if ('target' in node) {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
  }
  
  // Ensure href is safe, DOMPurify handles javascript: mostly, 
  // but explicitly setting noopener is required for our security standards
});

/**
 * Sanitizes HTML strings using DOMPurify with a strict allowlist.
 * Removes all scripts, inline styles, and potentially dangerous attributes.
 *
 * @param {string} dirtyHtml - The untrusted HTML string to sanitize.
 * @returns {string} The safe HTML string.
 */
export const sanitizeHtml = (dirtyHtml: string): string => {
  if (!dirtyHtml) return '';
  
  return DOMPurify.sanitize(dirtyHtml, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed'],
    FORBID_ATTR: ['style', 'on*', 'data-*'],
    ALLOW_DATA_ATTR: false,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
    RETURN_DOM_IMPORT: false
  }) as string;
};
