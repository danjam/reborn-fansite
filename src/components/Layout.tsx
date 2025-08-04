// src/components/Layout.tsx
import { useState, useMemo, useCallback } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { createStyles } from '../utils/styles';
import { useLocalStorage } from '../hooks/useLocalStorage';

const NAVIGATION_ITEMS = [
  { id: 'home', label: '🏠 Home', icon: '🏠', path: '/' },
  { id: 'guides', label: '📚 Guides', icon: '📚', path: '/guides' },
  { id: 'tools', label: '🔧 Tools', icon: '🔧', path: '/tools' },
  { id: 'community', label: '👥 Community', icon: '👥', path: '/community' }
];

const Layout = () => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

  const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), [setDarkMode]);
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen(prev => !prev), []);

  const getNavButtonStyle = useCallback((itemPath) => {
    const isActive = location.pathname === itemPath || 
                    (itemPath !== '/' && location.pathname.startsWith(itemPath));
    
    if (isActive) {
      return `${styles.button.nav} bg-green-600 text-white shadow-sm`;
    }
    return `${styles.button.nav} ${darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-100'}`;
  }, [location.pathname, styles.button.nav, darkMode]);

  return (
    <div className={`min-h-screen ${styles.bg.primary}`}>
      {/* Header */}
      <header className={`${styles.bg.secondary} shadow-sm border-b ${styles.border}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Title */}
            <div className="flex items-center">
              <Link 
                to="/" 
                className={`text-2xl font-bold ${styles.text.accent} hover:opacity-80 transition-opacity`}
              >
                🎮 Reborn Fansite
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-2">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={getNavButtonStyle(item.path)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side controls */}
            <div className="flex items-center space-x-3">
              <button onClick={toggleDarkMode} className={styles.button.darkToggle}>
                {darkMode ? '☀️' : '🌙'}
              </button>
              
              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className={`md:hidden ${styles.button.mobile}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className={`md:hidden border-t ${styles.border} py-4`}>
              <nav className="flex flex-col space-y-2">
                {NAVIGATION_ITEMS.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`${getNavButtonStyle(item.path)} text-left`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet context={{ darkMode }} />
      </main>

      {/* Footer */}
      <footer className={`${styles.bg.secondary} border-t ${styles.border} mt-auto`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className={`text-sm ${styles.text.muted}`}>
              © 2025 Reborn Fansite. Made with ❤️ for the community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;