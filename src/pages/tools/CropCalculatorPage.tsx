// src/pages/tools/CropCalculatorPage.tsx
import { useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import { CropCalculator } from '@/features/tools';
import { createStyles } from '@/utils/styles';

const CropCalculatorPage = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <nav className="flex items-center space-x-2 text-sm">
          <Link to="/tools" className={`${styles.text.accent} hover:underline`}>
            Tools
          </Link>
          <span className={styles.text.muted}>/</span>
          <span className={styles.text.secondary}>Crop Profit Calculator</span>
        </nav>
      </div>

      {/* Crop Calculator Component */}
      <CropCalculator darkMode={darkMode} />
    </div>
  );
};

export default CropCalculatorPage;
