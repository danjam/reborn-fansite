// src/themes/pastel.ts
import type { Theme } from '@/types/theme';

export const pastelTheme: Theme = {
  name: 'pastel',
  colors: {
    text: {
      primary: 'text-pink-900',
      secondary: 'text-purple-800',
      accent: 'text-emerald-600',
      muted: 'text-gray-500',
    },
    background: {
      base: 'bg-pink-50', // Main background
      elevated: 'bg-white', // Cards
      overlay: 'bg-purple-50', // Hover states
      accent: 'bg-emerald-100', // Highlighted areas
    },
    interactive: {
      primary:
        'bg-pink-400 text-white hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-colors',
      secondary:
        'bg-purple-300 text-purple-900 hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-colors',
      ghost:
        'text-purple-700 hover:bg-pink-100 hover:text-purple-900 focus:outline-none focus:ring-2 focus:ring-emerald-300 transition-colors',
    },
    state: {
      active: 'bg-pink-400 text-white',
      inactive: 'text-purple-400',
      selected: 'bg-purple-100',
      unselected: 'bg-transparent',
      enabled: 'bg-pink-400',
      disabled: 'bg-gray-300',
      danger: 'bg-red-100',
    },
    border: {
      subtle: 'border-pink-100',
      default: 'border-purple-200',
      accent: 'border-emerald-400',
    },
    feedback: {
      loading: 'text-purple-500',
      spinner: 'border-pink-400',
    },
  },
};
