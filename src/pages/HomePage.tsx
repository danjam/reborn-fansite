// src/pages/HomePage.tsx
import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';

import { reference } from '@/assets/img';
import { Card, CardData } from '@/components/Card';
import { createStyles } from '@/utils/styles';

const HomePage = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

  const features: CardData[] = [
    {
      id: 'tools',
      icon: reference,
      title: 'Tools',
      description: 'Calculators and utilities to optimize your gameplay',
      linkLabel: 'Explore Tools ⇒',
    },
    {
      id: 'reference',
      icon: reference,
      title: 'Reference',
      description: 'Quick lookup guides and comprehensive data tables',
      linkLabel: 'View Reference ⇒',
    },
  ];

  return (
    <div className="py-16">
      <div className="text-center mb-16">
        <h2 className={`text-4xl font-bold mb-6 ${styles.text.accent}`}>
          Welcome to Reborn Fansite
        </h2>
        <p
          className={`text-xl mb-8 max-w-2xl mx-auto ${styles.text.secondary}`}
        >
          Your ultimate resource for Reborn game guides, calculators, and tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map(feature => (
          <Card key={feature.id} item={feature} styles={styles} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
