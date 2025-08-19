// src/themes/index.ts
import { darkTheme } from '@/themes/dark';
import { lightTheme } from '@/themes/light';
import { midnightTheme } from '@/themes/midnight';
import { pastelTheme } from '@/themes/pastel';
import { solarizedTheme } from '@/themes/solarized';

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
