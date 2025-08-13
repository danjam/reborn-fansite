// src/components/Navigation.tsx
import { useStyles } from '@/hooks';
import {
  DesktopNavigation,
  MobileNavigation,
  NAVIGATION_ITEMS,
} from './navigation/index';

const Navigation = () => {
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
};

export default Navigation;
