// src/pages/HomePage.tsx
import { Link, useOutletContext } from 'react-router-dom';
import { createStyles } from '../utils/styles';
import { useMemo } from 'react';

const HomePage = () => {
  const { darkMode } = useOutletContext();
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
      icon: '👥',
      title: 'Community',
      description: 'Connect with other players and share strategies',
      path: '/community'
    }
  ];

  return (
    <div className="text-center py-16">
      <h2 className={`text-4xl font-bold mb-6 ${styles.text.accent}`}>
        Welcome to Reborn Fansite
      </h2>
      <p className={`text-xl mb-8 max-w-2xl mx-auto ${styles.text.secondary}`}>
        Your ultimate resource for Reborn game guides, calculators, and community tools.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {features.map((feature) => (
          <Link 
            key={feature.title}
            to={feature.path}
            className={`${styles.card} p-6 hover:shadow-lg transition-shadow cursor-pointer block`}
          >
            <div className={`text-3xl mb-3 ${styles.text.accent}`}>{feature.icon}</div>
            <h3 className={`text-lg font-semibold mb-2 ${styles.text.primary}`}>{feature.title}</h3>
            <p className={`${styles.text.muted}`}>{feature.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;