/**
 * ARIA Labels Dictionary
 * Reusable accessibility labels for consistent screen reader announcements.
 * Comments: Hindi mein likhe gaye hain taaki samajhne mein aasani ho.
 */

export const ARIA_LABELS = {
  // Modal Actions
  CLOSE_MODAL: "Close modal",
  CLOSE_DIALOG: "Close dialog",
  
  // Accordion Actions
  EXPAND_SECTION: "Expand section",
  COLLAPSE_SECTION: "Collapse section",
  TOGGLE_DETAILS: "Toggle more details",
  
  // Form Controls
  INCREASE_QUANTITY: "Increase license quantity",
  DECREASE_QUANTITY: "Decrease license quantity",
  SELECT_PLAN: "Select this pricing plan",
  
  // Navigation
  SWITCH_TAB: "Switch to tab",
  GO_TO_SECTION: "Go to section",
  
  // Product Variants
  SELECT_VARIANT: "Select product variant",
  SELECTED: "Selected",
  
  // Social/External
  OPEN_EXTERNAL_LINK: "Opens in a new tab",
} as const;
