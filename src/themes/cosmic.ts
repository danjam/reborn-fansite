// src/themes/cosmic.ts
import type { Theme } from '@/types/theme';

export const cosmicTheme: Theme = {
  name: 'cosmic',
  colors: {
    text: {
      primary: 'text-violet-100',
      secondary: 'text-violet-200',
      accent: 'text-violet-400',
      muted: 'text-gray-400',
    },
    background: {
      base: 'bg-slate-900', // Main background
      elevated: 'bg-slate-800', // Cards, modals
      overlay: 'bg-slate-700', // Hover states
      accent: 'bg-violet-900/30', // Highlighted areas
      gradient: 'bg-gradient-to-br from-purple-950 to-black', // Gradient background
      well: 'bg-slate-700', // Input fields, inset areas
    },
    interactive: {
      primary:
        'bg-violet-600 text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500',
      secondary:
        'bg-slate-600 text-violet-100 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400',
      ghost:
        'text-violet-300 hover:bg-slate-700 hover:text-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-500',
    },
    state: {
      active: 'bg-violet-600 text-white',
      inactive: 'text-violet-400',
      selected: 'bg-slate-700',
      unselected: 'bg-transparent',
      enabled: 'bg-violet-600',
      disabled: 'bg-slate-600',
      danger: 'bg-red-900/30',
    },
    border: {
      subtle: 'border-slate-700',
      default: 'border-slate-600',
      accent: 'border-violet-500',
    },
    focus: {
      ring: 'focus:ring-violet-500',
    },
    feedback: {
      loading: 'text-violet-400',
      spinner: 'border-violet-500',
      progressGradient: 'from-violet-500 to-violet-400',
    },
  },
};
