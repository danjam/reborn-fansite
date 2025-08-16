// src/constants/styles.ts
import type { Styles } from '@/types/styles';

export const lightModeStyles: Styles = {
  card: 'rounded-lg shadow-md p-6 mb-6 bg-white',
  text: {
    primary: 'text-gray-800',
    secondary: 'text-gray-700',
    accent: 'text-green-600',
    muted: 'text-gray-500',
  },
  bg: {
    primary: 'bg-gray-50',
    secondary: 'bg-white',
    accent: 'bg-green-100',
  },
  input:
    'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white border-gray-300 text-gray-900',
  border: 'border-gray-200',
  checkbox:
    'flex items-center space-x-3 px-3 py-2 border rounded-md border-gray-300 bg-gray-50',
  button: {
    primary:
      'px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors',
    secondary:
      'px-4 py-2 rounded-md focus:outline-none focus:ring-2 transition-colors bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    darkToggle:
      'px-4 py-2 rounded-md focus:outline-none focus:ring-2 transition-colors bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
    nav: 'px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500',
  },
  comingSoon: 'bg-yellow-100 text-yellow-800',
  table: {
    rowDanger: 'bg-red-50',
    rowBorderBottom: 'border-gray-100',
    overlayRed: 'bg-red-50',
    overlayGreen: 'bg-green-50',
    overlayPurple: 'bg-purple-50',
  },
};

export const darkModeStyles: Styles = {
  card: 'rounded-lg shadow-md p-6 mb-6 bg-gray-800',
  text: {
    primary: 'text-gray-200',
    secondary: 'text-gray-300',
    accent: 'text-green-400',
    muted: 'text-gray-400',
  },
  bg: {
    primary: 'bg-gray-900',
    secondary: 'bg-gray-800',
    accent: 'bg-green-900/20',
  },
  input:
    'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-700 border-gray-600 text-gray-200',
  border: 'border-gray-600',
  checkbox:
    'flex items-center space-x-3 px-3 py-2 border rounded-md border-gray-600 bg-gray-700',
  button: {
    primary:
      'px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors',
    secondary:
      'px-4 py-2 rounded-md focus:outline-none focus:ring-2 transition-colors bg-gray-600 text-gray-200 hover:bg-gray-500 focus:ring-gray-400',
    darkToggle:
      'px-4 py-2 rounded-md focus:outline-none focus:ring-2 transition-colors bg-gray-700 text-yellow-400 hover:bg-gray-600 focus:ring-yellow-500',
    nav: 'px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500',
  },
  comingSoon: 'bg-yellow-900 text-yellow-300',
  table: {
    rowDanger: 'bg-red-900/10',
    rowBorderBottom: 'border-gray-700',
    overlayRed: 'bg-red-900/20',
    overlayGreen: 'bg-green-900/20',
    overlayPurple: 'bg-purple-900/20',
  },
};
