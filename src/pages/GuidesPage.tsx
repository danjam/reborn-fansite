// src/pages/GuidesPage.tsx
import { useOutletContext } from 'react-router-dom';
import { useMemo } from 'react';
import { createStyles } from '../utils/styles';

const GuidesPage = () => {
  const { darkMode } = useOutletContext();
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

  return (
    <div>
      <h2 className={`text-3xl font-bold mb-8 ${styles.text.accent}`}>📚 Guides</h2>
      <div className={styles.card}>
        <p className={`text-lg ${styles.text.secondary} mb-4`}>
          Comprehensive guides coming soon! We're working on detailed walkthroughs and strategies.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
            <h3 className={`font-semibold mb-2 ${styles.text.primary}`}>Getting Started</h3>
            <p className={styles.text.muted}>Learn the basics and kickstart your journey</p>
          </div>
          <div className={`p-4 rounded border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
            <h3 className={`font-semibold mb-2 ${styles.text.primary}`}>Advanced Strategies</h3>
            <p className={styles.text.muted}>Master the game with pro tips and tricks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidesPage;