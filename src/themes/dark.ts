// src/themes/dark.ts
import type { Theme } from '@/types/theme';

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    text: {
      primary: 'text-gray-200',
      secondary: 'text-gray-300',
      accent: 'text-green-400',
      muted: 'text-gray-400',
    },
    background: {
      base: 'bg-gray-900', // Main background
      elevated: 'bg-gray-800', // Cards, modals
      overlay: 'bg-gray-700', // Hover states
      accent: 'bg-green-900/20', // Highlighted areas
      gradient: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700', // Gradient background
    },
    interactive: {
      primary:
        'bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors',
      secondary:
        'bg-gray-600 text-gray-200 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors',
      ghost:
        'text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors',
    },
    state: {
      active: 'bg-green-600 text-white',
      inactive: 'text-gray-300',
      selected: 'bg-gray-700',
      unselected: 'bg-transparent',
      enabled: 'bg-green-600',
      disabled: 'bg-gray-600',
      danger: 'bg-red-900/20',
    },
    border: {
      subtle: 'border-gray-700',
      default: 'border-gray-600',
      accent: 'border-green-500',
    },
    feedback: {
      loading: 'text-gray-400',
      spinner: 'border-green-500',
    },
  },
};
