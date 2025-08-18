// src/themes/index.ts
import { darkTheme } from './dark';
import { lightTheme } from './light';
import { midnightTheme } from './midnight';
import { pastelTheme } from './pastel';
import { solarizedTheme } from './solarized';

export const themes = {
  dark: darkTheme,
  light: lightTheme,
  midnight: midnightTheme,
  pastel: pastelTheme,
  solarized: solarizedTheme,
} as const;

export type ThemeName = keyof typeof themes;

// Re-export individual themes for existing imports
export { darkTheme, lightTheme, midnightTheme, pastelTheme, solarizedTheme };
