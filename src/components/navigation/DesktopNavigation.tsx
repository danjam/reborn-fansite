// src/components/navigation/DesktopNavigation.tsx
import { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { BaseNavigationProps } from './types';

const DesktopNavigation = ({
  navigationItems,
  darkMode,
  styles,
  onItemClick,
}: BaseNavigationProps) => {
  const location = useLocation();

  const getNavButtonStyle = useCallback(
    (itemPath: string) => {
      const isActive =
        location.pathname === itemPath ||
        (itemPath !== '/' && location.pathname.startsWith(itemPath));

      if (isActive) {
        return `${styles.button.nav} bg-green-600 text-white shadow-sm`;
      }
      return `${styles.button.nav} ${
        darkMode
          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`;
    },
    [location.pathname, styles.button.nav, darkMode]
  );

  return (
    <nav className="hidden md:flex space-x-2">
      {navigationItems.map(item => (
        <Link
          key={item.id}
          to={item.path}
          className={getNavButtonStyle(item.path)}
          onClick={onItemClick}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNavigation;
