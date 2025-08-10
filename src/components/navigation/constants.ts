// src/components/navigation/constants.ts
import { NavigationItem } from './types';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'home', label: 'Home', icon: '🏠', path: '/' },
  { id: 'tools', label: 'Tools', icon: '🔧', path: '/tools' },
  { id: 'reference', label: 'Reference', icon: '📖', path: '/reference' },
  { id: 'settings', label: 'My Settings', icon: '⚙️', path: '/my-settings' },
];
