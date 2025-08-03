// src/App.jsx - Updated to use localStorage for dark mode

import React, { useState, useMemo, useCallback } from 'react';
import { CropCalculator, TOOLS_LIST } from './features/tools';
import { createStyles } from './utils/styles';
import { useLocalStorage } from './hooks/useLocalStorage';

const NAVIGATION_ITEMS = [
  { id: 'home', label: '🏠 Home', icon: '🏠' },
  { id: 'guides', label: '📚 Guides', icon: '📚' },
  { id: 'tools', label: '🔧 Tools', icon: '🔧' },
  { id: 'community', label: '👥 Community', icon: '👥' }
];

function App() {
  // Use localStorage for dark mode preference (defaults to false)
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  
  const [activeTab, setActiveTab] = useState('home');
  const [activeTool, setActiveTool] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Use shared styling system
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

  const getNavButtonStyle = useCallback((itemId) => {
    const isActive = activeTab === itemId;
    if (isActive) {
      return `${styles.button.nav} bg-green-600 text-white shadow-sm`;
    }
    return `${styles.button.nav} ${darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-100'}`;
  }, [activeTab, styles.button.nav, darkMode]);

  const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), [setDarkMode]);
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen(prev => !prev), []);
  const handleNavClick = useCallback((itemId) => {
    setActiveTab(itemId);
    setActiveTool(null);
    setMobileMenuOpen(false);
  }, []);
  const handleToolClick = useCallback((toolId) => {
    setActiveTool(toolId);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="text-center py-16">
            <h2 className={`text-4xl font-bold mb-6 ${styles.text.accent}`}>
              Welcome to Reborn Fansite
            </h2>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${styles.text.secondary}`}>
              Your ultimate resource for Reborn game guides, calculators, and community tools.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {NAVIGATION_ITEMS.slice(1).map((item) => (
                <div key={item.id} className={`${styles.card} p-6 hover:shadow-lg transition-shadow cursor-pointer`} onClick={() => handleNavClick(item.id)}>
                  <div className={`text-3xl mb-3 ${styles.text.accent}`}>{item.icon}</div>
                  <h3 className={`text-lg font-semibold mb-2 ${styles.text.primary}`}>{item.label.split(' ').slice(1).join(' ')}</h3>
                  <p className={`${styles.text.muted}`}>
                    {item.id === 'guides' && 'Comprehensive guides for all aspects of the game'}
                    {item.id === 'tools' && 'Calculators and utilities to optimize your gameplay'}
                    {item.id === 'community' && 'Connect with other players and share strategies'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'tools':
        if (activeTool === 'crop-calculator') {
          return (
            <div>
              <div className="mb-6">
                <button
                  onClick={() => setActiveTool(null)}
                  className={`${styles.button.nav} ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} mb-4`}
                >
                  ← Back to Tools
                </button>
              </div>
              <CropCalculator darkMode={darkMode} />
            </div>
          );
        }
        return (
          <div>
            <div className="mb-8">
              <h2 className={`text-3xl font-bold mb-4 ${styles.text.accent}`}>🔧 Game Tools</h2>
              <p className={`text-lg ${styles.text.secondary}`}>
                Calculators and utilities to help optimize your gameplay experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TOOLS_LIST.map((tool) => (
                <div 
                  key={tool.id} 
                  className={`${styles.card} p-6 hover:shadow-lg transition-shadow cursor-pointer`}
                  onClick={() => handleToolClick(tool.id)}
                >
                  <div className={`text-3xl mb-3 ${styles.text.accent}`}>{tool.icon}</div>
                  <h3 className={`text-xl font-semibold mb-3 ${styles.text.primary}`}>{tool.name}</h3>
                  <p className={`${styles.text.secondary} mb-4`}>{tool.description}</p>
                  <div className={`inline-flex items-center ${styles.text.accent} font-medium`}>
                    Open Tool
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
              
              <div className={`${styles.card} p-6 opacity-60`}>
                <div className={`text-3xl mb-3 ${styles.text.muted}`}>🚧</div>
                <h3 className={`text-xl font-semibold mb-3 ${styles.text.muted}`}>More Tools Coming Soon</h3>
                <p className={`${styles.text.muted}`}>We're working on additional calculators and utilities.</p>
              </div>
            </div>
          </div>
        );
      case 'guides':
        return (
          <div className={styles.card + ' p-8'}>
            <h2 className={`text-2xl font-bold mb-4 ${styles.text.primary}`}>📚 Game Guides</h2>
            <p className={styles.text.secondary}>Comprehensive guides coming soon...</p>
          </div>
        );
      case 'community':
        return (
          <div className={styles.card + ' p-8'}>
            <h2 className={`text-2xl font-bold mb-4 ${styles.text.primary}`}>👥 Community</h2>
            <p className={styles.text.secondary}>Community features coming soon...</p>
          </div>
        );
      default:
        return (
          <div className="text-center py-16">
            <h2 className={`text-4xl font-bold mb-6 ${styles.text.accent}`}>
              Welcome to Reborn Fansite
            </h2>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${styles.text.secondary}`}>
              Your ultimate resource for Reborn game guides, calculators, and community tools.
            </p>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen ${styles.bg.primary}`}>
      {/* Header */}
      <header className={`${styles.bg.secondary} shadow-sm border-b ${styles.border}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Title */}
            <div className="flex items-center">
              <h1 className={`text-2xl font-bold ${styles.text.accent} cursor-pointer`} onClick={() => handleNavClick('home')}>
                🎮 Reborn Fansite
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-2">
              {NAVIGATION_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={getNavButtonStyle(item.id)}
                >
                  {item.label}
                </button>
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
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`${getNavButtonStyle(item.id)} text-left`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
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
}

export default App;