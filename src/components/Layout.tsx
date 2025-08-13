// src/components/Layout.tsx
import { useCallback } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { katie } from '../assets/img';
import { StylesProvider } from '../contexts/StylesContext';
import { useStyles } from '../hooks';
import { useLocalStorage } from '../hooks/useLocalStorage';

import Navigation from './Navigation';

const LayoutContent = ({
  toggleDarkMode,
  darkMode,
}: {
  toggleDarkMode: () => void;
  darkMode: boolean;
}) => {
  const { styles } = useStyles();

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

            {/* Right side controls */}
            <DarkModeToggle
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />
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
    </div>
  );
};

const DarkModeToggle = ({
  darkMode,
  toggleDarkMode,
}: {
  darkMode: boolean;
  toggleDarkMode: () => void;
}) => {
  const { styles } = useStyles();

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={toggleDarkMode}
        className={styles.button.darkToggle}
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
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
