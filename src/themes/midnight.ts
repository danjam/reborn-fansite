// src/themes/midnight.ts
import type { Theme } from '@/types/theme';

export const midnightTheme: Theme = {
  name: 'midnight',
  colors: {
    text: {
      primary: 'text-blue-100',
      secondary: 'text-blue-300',
      accent: 'text-indigo-400',
      muted: 'text-gray-400',
    },
    background: {
      base: 'bg-gray-950', // Main background
      elevated: 'bg-gray-900', // Cards
      overlay: 'bg-gray-800', // Hover states
      accent: 'bg-indigo-900/30', // Highlighted areas
      gradient: 'bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-900', // Gradient background
    },
    interactive: {
      primary:
        'bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500',
      secondary:
        'bg-gray-700 text-blue-100 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400',
      ghost:
        'text-blue-200 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500',
    },
    state: {
      active: 'bg-indigo-600 text-white',
      inactive: 'text-gray-400',
      selected: 'bg-gray-800',
      unselected: 'bg-transparent',
      enabled: 'bg-indigo-600',
      disabled: 'bg-gray-700',
      danger: 'bg-red-900/30',
    },
    border: {
      subtle: 'border-gray-800',
      default: 'border-gray-700',
      accent: 'border-indigo-500',
    },
    feedback: {
      loading: 'text-gray-400',
      spinner: 'border-indigo-500',
    },
  },
};
