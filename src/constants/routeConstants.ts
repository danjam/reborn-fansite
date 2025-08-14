// src/constants/routeConstants.ts

/**
 * Special case mappings for route segments that can't be auto-converted from kebab-case
 * Everything else will be automatically converted using kebabToTitleCase
 */
export const SPECIAL_ROUTE_NAMES: Record<string, string> = {
  '': 'Home',
  data: 'Details', // For individual game object pages
};
