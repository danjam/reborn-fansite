// src/themes/index.ts
import type { Theme } from '@/types/theme';
import { darkTheme } from './dark';
import { lightTheme } from './light';

export const themes = {
  dark: darkTheme,
  light: lightTheme,
} as const;

export type ThemeName = keyof typeof themes;

// Existing getTheme function (unchanged for compatibility)
export const getTheme = (name: ThemeName): Theme => themes[name];

// NEW: Helper functions for multi-theme system
export const getAvailableThemes = (): ThemeName[] => {
  return Object.keys(themes) as ThemeName[];
};

export const getAvailableThemeNames = (): string[] => {
  return Object.keys(themes);
};

export const isValidTheme = (themeName: string): themeName is ThemeName => {
  return themeName in themes;
};

export const getThemeByName = (themeName: string): Theme => {
  if (!isValidTheme(themeName)) {
    console.warn(`Invalid theme name: ${themeName}, falling back to 'dark'`);
    return themes.dark;
  }
  return themes[themeName];
};

// Re-export individual themes for existing imports
export { darkTheme, lightTheme };
