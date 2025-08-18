// src/types/theme.ts

export interface Theme {
  name: string;
  colors: {
    text: {
      primary: string;
      secondary: string;
      accent: string;
      muted: string;
    };
    surface: {
      base: string;        // Main background
      elevated: string;    // Cards, modals
      overlay: string;     // Hover states
      accent: string;      // Highlighted areas
    };
    interactive: {
      primary: string;
      secondary: string;
      ghost: string;
    };
    state: {
      active: string;
      inactive: string;
      selected: string;
      unselected: string;
      enabled: string;
      disabled: string;
      danger: string;
    };
    border: {
      subtle: string;
      default: string;
      accent: string;
    };
    feedback: {
      loading: string;
      spinner: string;
    };
  };
}

export interface ThemeContextType {
  theme: Theme;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Button variant and size options
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type IconSize = 'sm' | 'md' | 'lg';
export type SpacingVariant = 'tight' | 'normal' | 'loose';

// Options interfaces for complex methods
export interface ButtonOptions {
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
}

export interface InputOptions {
  error?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface TableRowOptions {
  isDanger?: boolean;
  isSelected?: boolean;
  className?: string;
}