// src/pages/ToolsPage.tsx
import { Link, useOutletContext } from 'react-router-dom';
import { useMemo } from 'react';
import { createStyles } from '../utils/styles';
import { TOOLS_LIST } from '../features/tools';

const ToolsPage = () => {
  const { darkMode } = useOutletContext();
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

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
          <Link 
            key={tool.id}
            to={`/tools/${tool.id}`}
            className={`${styles.card} p-6 hover:shadow-lg transition-shadow cursor-pointer block group`}
          >
            <div className={`text-4xl mb-4 ${styles.text.accent} group-hover:scale-110 transition-transform`}>
              {tool.icon}
            </div>
            <h3 className={`text-xl font-semibold mb-3 ${styles.text.primary}`}>
              {tool.name}
            </h3>
            <p className={`${styles.text.muted} leading-relaxed`}>
              {tool.description}
            </p>
            <div className={`mt-4 text-sm font-medium ${styles.text.accent} group-hover:underline`}>
              Open Tool →
            </div>
          </Link>
        ))}
        
        {/* Coming Soon Card */}
        <div className={`${styles.card} p-6 opacity-60`}>
          <div className={`text-4xl mb-4 ${styles.text.muted}`}>⏳</div>
          <h3 className={`text-xl font-semibold mb-3 ${styles.text.primary}`}>
            More Tools Coming Soon
          </h3>
          <p className={`${styles.text.muted} leading-relaxed`}>
            We're working on additional calculators and utilities. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;