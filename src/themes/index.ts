// src/themes/index.ts
import { cosmicTheme } from '@/themes/cosmic';
import { darkTheme } from '@/themes/dark';
import { lightTheme } from '@/themes/light';
import { pastelTheme } from '@/themes/pastel';
import { solarizedTheme } from '@/themes/solarized';

export const themes = {
  dark: darkTheme,
  light: lightTheme,
  cosmic: cosmicTheme,
  pastel: pastelTheme,
  solarized: solarizedTheme,
} as const;

export type ThemeName = keyof typeof themes;

// Re-export individual themes for existing imports
export { cosmicTheme, darkTheme, lightTheme, pastelTheme, solarizedTheme };
