// src/components/Layout.tsx
import { useCallback, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { katie } from '../assets/img';
import { StylesProvider } from '../contexts/StylesContext';
import { useStyles } from '../hooks';
import { useLocalStorage } from '../hooks/useLocalStorage';

import Navigation from './Navigation';
import SettingsPanel from './SettingsPanel';

const LayoutContent = ({
  toggleDarkMode,
  darkMode,
}: {
  toggleDarkMode: () => void;
  darkMode: boolean;
}) => {
  const { styles } = useStyles();
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);

  const handleSettingsClick = useCallback(() => {
    setIsSettingsPanelOpen(true);
  }, []);

  const handleSettingsPanelClose = useCallback(() => {
    setIsSettingsPanelOpen(false);
  }, []);

  return (
    <div className={`min-h-screen ${styles.bg.primary}`}>
      {/* Header */}
      <header
        className={`${styles.bg.secondary} shadow-sm border-b ${styles.border}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Title */}
            <div className="flex items-center">
              <Link
                to="/"
                className={`flex items-center space-x-3 hover:opacity-80 transition-opacity`}
              >
                {/* Logo Image */}
                <img
                  src={katie}
                  alt="Reborn Fansite Logo"
                  className="w-8 h-8 md:w-10 md:h-10 object-contain"
                />
                {/* Site Title */}
                <span
                  className={`text-xl md:text-2xl font-bold ${styles.text.accent}`}
                >
                  Reborn Fansite
                </span>
              </Link>
            </div>

            {/* Navigation Component */}
            <Navigation />

            {/* Settings Button (moved to right where dark mode toggle was) */}
            <button
              onClick={handleSettingsClick}
              className={`p-2 rounded-md transition-colors ${
                darkMode
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              } focus:outline-none focus:ring-2 focus:ring-green-500`}
              aria-label="Open settings"
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
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        className={`${styles.bg.secondary} border-t ${styles.border} mt-auto`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center space-y-2">
            <p className={`text-sm ${styles.text.muted}`}>
              © {new Date().getFullYear()} Reborn Fansite. Made with &hearts;
              for the community. [v{import.meta.env.VITE_REACT_APP_VERSION}]
            </p>
            <p className={`text-xs ${styles.text.muted} opacity-75`}>
              This is an unofficial fan site and is not affiliated with,
              endorsed by, or officially associated with Reborn or Fracturis
              Games. All game content, trademarks, and copyrights belong to
              their respective owners.
            </p>
          </div>
        </div>
      </footer>

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={isSettingsPanelOpen}
        onClose={handleSettingsPanelClose}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    </div>
  );
};

const Layout = () => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  const toggleDarkMode = useCallback(
    () => setDarkMode((prev: boolean) => !prev),
    [setDarkMode]
  );

  return (
    <StylesProvider darkMode={darkMode}>
      <LayoutContent toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
    </StylesProvider>
  );
};

export default Layout;
