// src/themes/light.ts
import type { Theme } from '@/types/theme';

export const lightTheme: Theme = {
  name: 'light',
  colors: {
    text: {
      primary: 'text-gray-800',
      secondary: 'text-gray-700',
      accent: 'text-green-600',
      muted: 'text-gray-500',
    },
    surface: {
      base: 'bg-gray-50',         // Main background
      elevated: 'bg-white',       // Cards, modals
      overlay: 'bg-gray-100',     // Hover states
      accent: 'bg-green-100',     // Highlighted areas
    },
    interactive: {
      primary: 'bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors',
      ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors',
    },
    state: {
      active: 'bg-green-600 text-white',
      inactive: 'text-gray-600',
      selected: 'bg-gray-100',
      unselected: 'bg-transparent',
      enabled: 'bg-green-600',
      disabled: 'bg-gray-400',
      danger: 'bg-red-50',
    },
    border: {
      subtle: 'border-gray-100',
      default: 'border-gray-200',
      accent: 'border-green-500',
    },
    feedback: {
      loading: 'text-gray-500',
      spinner: 'border-green-500',
    }
  }
};