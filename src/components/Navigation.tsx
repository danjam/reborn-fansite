// src/components/Navigation.tsx
import { useStyles } from '@/hooks';
import React from 'react';
import {
  DesktopNavigation,
  MobileNavigation,
  type NavigationItem,
} from './navigation/index';

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
