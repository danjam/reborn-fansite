// src/components/Layout.tsx
import { useCallback, useMemo } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { katie } from '../assets/img';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { createStyles } from '../utils/styles';

import Navigation from './Navigation';

const Layout = () => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

  const toggleDarkMode = useCallback(
    () => setDarkMode((prev: boolean) => !prev),
    [setDarkMode]
  );

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
            <Navigation darkMode={darkMode} styles={styles} />

            {/* Right side controls */}
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleDarkMode}
                className={styles.button.darkToggle}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet context={{ darkMode }} />
      </main>

      {/* Footer */}
      <footer
        className={`${styles.bg.secondary} border-t ${styles.border} mt-auto`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center space-y-2">
            <p className={`text-sm ${styles.text.muted}`}>
              © {new Date().getFullYear()} Reborn Fansite. Made with ❤️ for the
              community.
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

export default Layout;
