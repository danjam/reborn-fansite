// src/components/Navigation.tsx
import { useStyles } from '@/hooks';
import React from 'react';
import {
  DesktopNavigation,
  MobileNavigation,
  NAVIGATION_ITEMS,
} from './navigation/index';

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
