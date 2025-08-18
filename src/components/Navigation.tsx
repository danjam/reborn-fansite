// src/components/Navigation.tsx
import { memo } from 'react';

import {
  DesktopNavigation,
  MobileNavigation,
} from '@/components/navigation/index';
import type { NavigationItem } from '@/types/navigation';

// Navigation items defined inline for easy maintenance
const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'tools', label: 'Tools', path: '/tools' },
  { id: 'reference', label: 'Reference', path: '/reference' },
];

const Navigation = memo(() => {
  return (
    <>
      <DesktopNavigation navigationItems={NAVIGATION_ITEMS} />
      <MobileNavigation navigationItems={NAVIGATION_ITEMS} />
    </>
  );
});

// Add display name for better debugging
Navigation.displayName = 'Navigation';

export default Navigation;
