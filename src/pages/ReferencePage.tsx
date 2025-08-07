// src/pages/ReferencePage.tsx
import { useOutletContext } from 'react-router-dom';
import { useMemo } from 'react';
import { createStyles } from '@/utils/styles';
import { Card, CardData } from '@/components/Card';

const REFERENCE_ARTICLES: CardData[] = [
  {
    id: 'potions',
    title: 'Potions',
    description: 'Complete list of all potions and their required ingredients for crafting',
    icon: '🧪',
    linkLabel: 'View',
  },
  {
    id: 'monsters',
    title: 'Monsters',
    description: 'Comprehensive guide to all monsters, their loot drops, and locations',
    icon: '🐺',
    linkLabel: 'View',
  },
  {
    id: 'villagers',
    title: 'Village NPCs & Quests',
    description: 'Guide to all villagers, their special functions, and services',
    icon: '🏘️',
    linkLabel: 'View',
  }
];

const ReferencePage = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

  return (
    <div>
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-4 ${styles.text.accent}`}>
          📖 ReferenceF
        </h1>
        <p className={`text-lg ${styles.text.secondary}`}>
          Quick reference guides and comprehensive lists for all things Reborn. 
          Find the information you need to optimize your gameplay.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REFERENCE_ARTICLES.map((article) => (
          <Card key={article.id} item={article} styles={styles} />
        ))}
      </div>
    </div>
  );
};

export default ReferencePage;