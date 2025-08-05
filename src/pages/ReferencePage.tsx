// src/pages/ReferencePage.tsx
import { Link, useOutletContext } from 'react-router-dom';
import { useMemo } from 'react';
import { createStyles } from '../utils/styles';

const REFERENCE_ARTICLES = [
  {
    id: 'potions',
    title: 'Potions',
    description: 'Complete list of all potions and their required ingredients for crafting',
    icon: '🧪',
    path: '/reference/potions',
    status: 'available'
  },
  {
    id: 'monsters',
    title: 'Monsters',
    description: 'Comprehensive guide to all monsters, their loot drops, and locations',
    icon: '🐺',
    path: '/reference/monsters',
    status: 'available'
  },
  {
    id: 'villagers',
    title: 'Village NPCs & Quests',
    description: 'Guide to all villagers, their special functions, and services',
    icon: '🏘️',
    path: '/reference/villagers',
    status: 'available'
  },
  {
    id: 'equipment',
    title: 'Equipment & Upgrades',
    description: 'All weapons, armor, and upgrade paths with stats',
    icon: '⚔️',
    path: '/reference/equipment',
    status: 'coming-soon'
  }
];

const ReferencePage = () => {
  const { darkMode } = useOutletContext();
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

  return (
    <div>
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-4 ${styles.text.accent}`}>
          📖 Reference
        </h1>
        <p className={`text-lg ${styles.text.secondary}`}>
          Quick reference guides and comprehensive lists for all things Reborn. 
          Find the information you need to optimize your gameplay.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REFERENCE_ARTICLES.map((article) => (
          <div key={article.id} className={styles.card}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{article.icon}</span>
                <h3 className={`text-xl font-semibold ${styles.text.primary}`}>
                  {article.title}
                </h3>
              </div>
              {article.status === 'coming-soon' && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  darkMode 
                    ? 'bg-yellow-900 text-yellow-300' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  Coming Soon
                </span>
              )}
            </div>
            
            <p className={`${styles.text.secondary} mb-4`}>
              {article.description}
            </p>

            {article.status === 'available' ? (
              <Link
                to={article.path}
                className={`${styles.button.primary} inline-block`}
              >
                View Guide →
              </Link>
            ) : (
              <div className={`${styles.button.secondary} inline-block cursor-not-allowed opacity-50`}>
                Coming Soon
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={`mt-12 p-6 rounded-lg border-l-4 ${
        darkMode 
          ? 'bg-blue-900/20 border-blue-400' 
          : 'bg-blue-50 border-blue-500'
      }`}>
        <h3 className={`text-lg font-semibold mb-2 ${styles.text.primary}`}>
          💡 Contributing
        </h3>
        <p className={styles.text.secondary}>
          Found an error or have additional information? We welcome community contributions 
          to keep these reference guides accurate and up-to-date. Join our community section 
          to get involved!
        </p>
      </div>
    </div>
  );
};

export default ReferencePage;