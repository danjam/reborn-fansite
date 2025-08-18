// src/components/navigation/DesktopNavigation.tsx
import { memo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useTheme } from '@/hooks/useTheme';
import type { NavigationItem } from '@/types/navigation';

interface BaseNavigationProps {
  navigationItems: NavigationItem[];
  onItemClick?: () => void;
}

const DesktopNavigation = memo(
  ({ navigationItems, onItemClick }: BaseNavigationProps) => {
    const theme = useTheme();
    const location = useLocation();

    const getNavButtonStyle = useCallback(
      (itemPath: string) => {
        const isActive =
          location.pathname === itemPath ||
          (itemPath !== '/' && location.pathname.startsWith(itemPath));

        return theme.navButton(isActive);
      },
      [location.pathname, theme]
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
  }
);

// Add display name for better debugging
DesktopNavigation.displayName = 'DesktopNavigation';

export default DesktopNavigation;
