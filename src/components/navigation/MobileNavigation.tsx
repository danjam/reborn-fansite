// src/components/navigation/MobileNavigation.tsx
import clsx from 'clsx';
import { memo, useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useTheme } from '@/hooks/useTheme';
import type { NavigationItem } from '@/types/navigation';

interface BaseNavigationProps {
  navigationItems: NavigationItem[];
  onItemClick?: () => void;
}

const MobileNavigation = memo(
  ({ navigationItems, onItemClick }: BaseNavigationProps) => {
    const theme = useTheme();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const getNavButtonStyle = useCallback(
      (itemPath: string) => {
        const isActive =
          location.pathname === itemPath ||
          (itemPath !== '/' && location.pathname.startsWith(itemPath));

        return theme.navButton(isActive, 'text-left');
      },
      [location.pathname, theme]
    );

    const handleItemClick = useCallback(() => {
      setMobileMenuOpen(false);
      onItemClick?.();
    }, [onItemClick]);

    return (
      <>
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={clsx(
            'md:hidden p-2 rounded-md transition-colors',
            theme.interactive.ghost
          )}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                mobileMenuOpen
                  ? 'M6 18L18 6M6 6l12 12'
                  : 'M4 6h16M4 12h16M4 18h16'
              }
            />
          </svg>
        </button>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div
            className={clsx(
              'md:hidden border-t py-4 absolute top-16 left-0 right-0 z-50',
              theme.border.default,
              theme.background.elevated
            )}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex flex-col space-y-2">
                {navigationItems.map(item => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={getNavButtonStyle(item.path)}
                    onClick={handleItemClick}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </>
    );
  }
);

// Add display name for better debugging
MobileNavigation.displayName = 'MobileNavigation';

export default MobileNavigation;
