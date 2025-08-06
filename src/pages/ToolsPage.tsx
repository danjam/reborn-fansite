// src/pages/ToolsPage.tsx
import { Link, useOutletContext } from 'react-router-dom';
import { useMemo } from 'react';
import { createStyles } from '../utils/styles';
import { TOOLS_LIST } from '../features/tools';

const ToolsPage = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

  return (
    <div>
      <div className="mb-8">
        <h2 className={`text-3xl font-bold mb-4 ${styles.text.accent}`}>🔧 Game Tools</h2>
        <p className={`text-lg ${styles.text.secondary}`}>
          Calculators and utilities to help optimize your gameplay experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TOOLS_LIST.map((tool) => (
          <div key={tool.id} className={styles.card}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{tool.icon}</span>
                <h3 className={`text-xl font-semibold ${styles.text.primary}`}>
                  {tool.name}
                </h3>
              </div>
            </div>
            
            <p className={`${styles.text.secondary} mb-4`}>
              {tool.description}
            </p>

            <Link
              to={`/tools/${tool.id}`}
              className={`${styles.button.primary} inline-block`}
            >
              View
            </Link>
          </div>
        ))}
        
        {/* Coming Soon Card */}
        <div className={styles.card}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">⏳</span>
              <h3 className={`text-xl font-semibold ${styles.text.primary}`}>
                More Tools Coming Soon
              </h3>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              darkMode 
                ? 'bg-yellow-900 text-yellow-300' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              Coming Soon
            </span>
          </div>
          
          <p className={`${styles.text.secondary} mb-4`}>
            We're working on additional calculators and utilities. Stay tuned!
          </p>

          <div className={`${styles.button.secondary} inline-block cursor-not-allowed opacity-50`}>
            Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;