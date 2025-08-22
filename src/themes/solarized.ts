// src/themes/solarized.ts
import type { Theme } from '@/types/theme';

export const solarizedTheme: Theme = {
  name: 'solarized',
  colors: {
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-700',
      accent: 'text-amber-600',
      muted: 'text-gray-500',
    },
    background: {
      base: 'bg-amber-50', // Main background
      elevated: 'bg-white', // Cards
      overlay: 'bg-amber-100', // Hover states
      accent: 'bg-amber-200', // Highlighted areas
      gradient: 'bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100', // Gradient background
      well: 'bg-amber-50', // Input fields, inset areas
    },
    interactive: {
      primary:
        'bg-amber-600 text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500',
      secondary:
        'bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500',
      ghost:
        'text-amber-700 hover:bg-amber-100 hover:text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500',
    },
    state: {
      active: 'bg-amber-600 text-white',
      inactive: 'text-gray-600',
      selected: 'bg-amber-100',
      unselected: 'bg-transparent',
      enabled: 'bg-amber-600',
      disabled: 'bg-gray-400',
      danger: 'bg-red-100',
    },
    border: {
      subtle: 'border-amber-100',
      default: 'border-amber-200',
      accent: 'border-amber-500',
    },
    focus: {
      ring: 'focus:ring-amber-500',
    },
    feedback: {
      loading: 'text-amber-600',
      spinner: 'border-amber-500',
      progressGradient: 'from-amber-500 to-amber-400',
    },
  },
};
