// src/utils/stringHelpers.ts

/**
 * Convert kebab-case to Title Case
 * @example kebabToTitleCase('crop-calculator') => 'Crop Calculator'
 */
export const kebabToTitleCase = (str: string): string => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
