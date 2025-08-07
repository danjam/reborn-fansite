// src/pages/ErrorPage.tsx
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { createStyles } from '@/utils/styles';

const ErrorPage = () => {
  // Since this is an error page, we can't rely on outlet context
  // Default to false for dark mode
  const darkMode = false;
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

  return (
    <div className={`min-h-screen flex items-center justify-center ${styles.bg.primary}`}>
      <div className="text-center">
        <h1 className={`text-6xl font-bold mb-4 ${styles.text.accent}`}>404</h1>
        <h2 className={`text-2xl font-semibold mb-4 ${styles.text.primary}`}>Page Not Found</h2>
        <p className={`text-lg mb-8 ${styles.text.secondary}`}>
          The page you're looking for doesn't exist.
        </p>
        <Link 
          to="/" 
          className={`${styles.button.primary} inline-block`}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;