// src/components/Navigation.tsx
import { DesktopNavigation, MobileNavigation, NAVIGATION_ITEMS } from './navigation/index';

interface NavigationProps {
  darkMode: boolean;
  styles: any; // You can type this more specifically based on your styles object
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