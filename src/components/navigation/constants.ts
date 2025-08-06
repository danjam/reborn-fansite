// src/components/navigation/constants.ts
import { NavigationItem } from './types';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'home', label: '🏠 Home', icon: '🏠', path: '/' },
  { id: 'guides', label: '📚 Guides', icon: '📚', path: '/guides' },
  { id: 'tools', label: '🔧 Tools', icon: '🔧', path: '/tools' },
  { id: 'reference', label: '📖 Reference', icon: '📖', path: '/reference' },
  { id: 'community', label: '👥 Community', icon: '👥', path: '/community' }
];