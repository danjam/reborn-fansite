// src/components/navigation/MobileNavigation.tsx
import React, { useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { NavigationProps } from './types';

const MobileNavigation = React.memo(
  ({ navigationItems, darkMode, styles }: NavigationProps) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMobileMenu = useCallback(
      () => setMobileMenuOpen(prev => !prev),
      []
    );

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

    const handleItemClick = useCallback(() => {
      setMobileMenuOpen(false);
    }, []);

    return (
      <>
        {/* Mobile menu button */}
        <button
          onClick={toggleMobileMenu}
          className={`md:hidden p-2 rounded-md transition-colors ${
            darkMode
              ? 'text-gray-300 hover:text-white hover:bg-gray-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
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
            className={`md:hidden border-t ${styles.border} py-4 absolute top-16 left-0 right-0 ${styles.bg.secondary} z-50`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex flex-col space-y-2">
                {navigationItems.map(item => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`${getNavButtonStyle(item.path)} text-left`}
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
