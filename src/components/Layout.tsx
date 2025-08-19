// src/components/Layout.tsx
import clsx from 'clsx';
import { memo, useCallback, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { katie } from '@/assets/img';
import Navigation from '@/components/Navigation';
import SettingsPanel from '@/components/SettingsPanel';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useTheme } from '@/hooks/useTheme';

// LayoutContent component that uses the theme system
const LayoutContent = memo(() => {
  const theme = useTheme();
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);

  const handleSettingsClick = useCallback(() => {
    setIsSettingsPanelOpen(true);
  }, []);

  const handleSettingsPanelClose = useCallback(() => {
    setIsSettingsPanelOpen(false);
  }, []);

  return (
    <div
      className={clsx(
        'min-h-screen flex flex-col bg-fixed',
        theme.background.gradient
      )}
    >
      {/* Header */}
      <header
        className={clsx(
          theme.background.elevated,
          'shadow-sm border-b',
          theme.border.default
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Title */}
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                {/* Logo Image - Fixed to use standard sizes */}
                <img
                  src={katie}
                  alt="Reborn Fansite Logo"
                  className="w-8 h-8 object-contain"
                />
                {/* Site Title */}
                <span
                  className={clsx(
                    'text-xl md:text-2xl font-bold',
                    theme.text.accent
                  )}
                >
                  Reborn Fansite
                </span>
              </Link>
            </div>

            {/* Navigation and Settings grouped on the right */}
            <div className="flex items-center space-x-4">
              {/* Navigation Component */}
              <Navigation />

              {/* Settings Button */}
              <button
                onClick={handleSettingsClick}
                className={clsx(
                  'p-2 rounded-md transition-colors',
                  theme.text.muted +
                    ' hover:' +
                    theme.text.secondary.replace('text-', '')
                )}
                title="Settings"
              >
                {/* Settings Icon - Fixed to use standard size */}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer
        className={clsx(
          theme.background.elevated,
          'border-t',
          theme.border.default
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="text-center space-y-2">
              <p className={clsx('text-sm', theme.text.secondary)}>
                Made with &hearts; for the community{' '}
                <a
                  href="https://github.com/danjam/reborn-fansite/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    theme.text.muted,
                    'hover:underline transition-colors'
                  )}
                  title="View release notes (opens in new window)"
                >
                  v{import.meta.env.VITE_REACT_APP_VERSION}
                  {import.meta.env.VITE_REACT_APP_GIT_HASH &&
                    `-${import.meta.env.VITE_REACT_APP_GIT_HASH}`}
                </a>
              </p>
              <p className={clsx('text-xs', theme.text.muted, 'opacity-75')}>
                This is an unofficial fan site and is not affiliated with,
                endorsed by, or officially associated with{' '}
                <a
                  href="https://store.steampowered.com/app/2850000/Reborn_An_Idle_Roguelike_RPG/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    theme.text.primary,
                    'hover:underline transition-colors'
                  )}
                >
                  Reborn
                </a>{' '}
                or{' '}
                <a
                  href="https://www.fracturis.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    theme.text.primary,
                    'hover:underline transition-colors'
                  )}
                >
                  Fracturis Games
                </a>
                . All game content, trademarks, and copyrights belong to their
                respective owners.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* UPDATED: Settings Panel - Removed legacy theme props */}
      <SettingsPanel
        isOpen={isSettingsPanelOpen}
        onClose={handleSettingsPanelClose}
      />
    </div>
  );
});

// Add display name for better debugging
LayoutContent.displayName = 'LayoutContent';

// Main Layout component - simplified to just provide ThemeProvider
const Layout = memo(() => {
  return (
    <ThemeProvider>
      <LayoutContent />
    </ThemeProvider>
  );
});

// Add display name for better debugging
Layout.displayName = 'Layout';

export default Layout;
