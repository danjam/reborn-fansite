// src/pages/CommunityPage.tsx
import { useOutletContext } from 'react-router-dom';
import { useMemo } from 'react';
import { createStyles } from '../utils/styles';

const CommunityPage = () => {
  const { darkMode } = useOutletContext();
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

  return (
    <div>
      <h2 className={`text-3xl font-bold mb-8 ${styles.text.accent}`}>👥 Community</h2>
      <div className={styles.card}>
        <p className={`text-lg ${styles.text.secondary} mb-4`}>
          Connect with fellow players and share your experiences!
        </p>
        <div className="space-y-4">
          <div className={`p-4 rounded border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
            <h3 className={`font-semibold mb-2 ${styles.text.primary}`}>Discord Server</h3>
            <p className={styles.text.muted}>Join our active community for real-time discussions</p>
          </div>
          <div className={`p-4 rounded border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
            <h3 className={`font-semibold mb-2 ${styles.text.primary}`}>Forums</h3>
            <p className={styles.text.muted}>Share strategies and get help from experienced players</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;