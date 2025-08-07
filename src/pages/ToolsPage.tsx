import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';

import { Card } from '@/components/Card';
import { TOOLS_LIST } from '@/features/tools';
import { createStyles } from '@/utils/styles';

const ToolsPage = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

  return (
    <div>
      <div className="mb-8">
        <h2 className={`text-3xl font-bold mb-4 ${styles.text.accent}`}>
          🔧 Game Tools
        </h2>
        <p className={`text-lg ${styles.text.secondary}`}>
          Calculators and utilities to help optimize your gameplay experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TOOLS_LIST.map(tool => (
          <Card key={tool.id} item={tool} styles={styles} />
        ))}
      </div>
    </div>
  );
};

export default ToolsPage;
