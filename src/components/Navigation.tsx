// src/components/Navigation.tsx
import {
  DesktopNavigation,
  MobileNavigation,
} from '@/components/navigation/index';
import { useStyles } from '@/hooks';
import type { NavigationItem } from '@/types/navigation';
import React from 'react';

// Navigation items defined inline for easy maintenance
const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'tools', label: 'Tools', path: '/tools' },
  { id: 'reference', label: 'Reference', path: '/reference' },
];

const Navigation = React.memo(() => {
  const { styles, darkMode } = useStyles();

  return (
    <>
      <DesktopNavigation
        navigationItems={NAVIGATION_ITEMS}
        darkMode={darkMode}
        styles={styles}
      />
      <MobileNavigation
        navigationItems={NAVIGATION_ITEMS}
        darkMode={darkMode}
        styles={styles}
      />
    </>
  );
});

// Add display name for better debugging
Navigation.displayName = 'Navigation';

export default Navigation;
