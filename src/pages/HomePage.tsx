// src/pages/HomePage.tsx
import { Link, useOutletContext } from 'react-router-dom';
import { createStyles } from '../utils/styles';
import { useMemo } from 'react';

const HomePage = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

  const features = [
    {
      icon: '📚',
      title: 'Guides',
      description: 'Comprehensive guides for all aspects of the game',
      path: '/guides'
    },
    {
      icon: '🔧',
      title: 'Tools',
      description: 'Calculators and utilities to optimize your gameplay',
      path: '/tools'
    },
    {
      icon: '📖',
      title: 'Reference',
      description: 'Quick lookup guides and comprehensive data tables',
      path: '/reference'
    },
    {
      icon: '👥',
      title: 'Community',
      description: 'Connect with other players and share strategies',
      path: '/community'
    }
  ];

  return (
    <div className="py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h2 className={`text-4xl font-bold mb-6 ${styles.text.accent}`}>
          Welcome to Reborn Fansite
        </h2>
        <p className={`text-xl mb-8 max-w-2xl mx-auto ${styles.text.secondary}`}>
          Your ultimate resource for Reborn game guides, calculators, and community tools.
        </p>
      </div>

      {/* Main Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <div key={feature.title} className={styles.card}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{feature.icon}</span>
                <h3 className={`text-xl font-semibold ${styles.text.primary}`}>
                  {feature.title}
                </h3>
              </div>
            </div>
            
            <p className={`${styles.text.secondary} mb-4`}>
              {feature.description}
            </p>

            <Link
              to={feature.path}
              className={`${styles.button.primary} inline-block`}
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;