// src/components/Navigation.tsx
import { Styles } from '@/utils/styles';

import {
  DesktopNavigation,
  MobileNavigation,
  NAVIGATION_ITEMS,
} from './navigation/index';

interface NavigationProps {
  darkMode: boolean;
  styles: Styles;
}

const Navigation = ({ darkMode, styles }: NavigationProps) => {
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
