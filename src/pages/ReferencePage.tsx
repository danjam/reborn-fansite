// src/pages/ReferencePage.tsx
import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';

import { Card, CardData } from '@/components/Card';
import { createStyles } from '@/utils/styles';
import { baby_slime_red, defimg, health, katie } from '@/assets/img';

const REFERENCE_ARTICLES: CardData[] = [
  {
    id: 'potions',
    title: 'Potions',
    description:
      'Complete list of all potions and their required ingredients for crafting',
    icon: health,
    linkLabel: 'View',
  },
  {
    id: 'vegetables',
    title: 'Vegetables',
    description:
      'Complete guide to all vegetables, growing times, prices, and potion usage',
    icon: defimg,
    linkLabel: 'View',
  },
  {
    id: 'monsters',
    title: 'Monsters',
    description:
      'Comprehensive guide to all monsters, their loot drops, and locations',
    icon: baby_slime_red,
    linkLabel: 'View',
  },
  {
    id: 'villagers',
    title: 'Village NPCs & Quests',
    description:
      'Guide to all villagers, their special functions, and services',
    icon: katie,
    linkLabel: 'View',
  },
];

const ReferencePage = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
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
        {REFERENCE_ARTICLES.map(article => (
          <Card key={article.id} item={article} styles={styles} />
        ))}
      </div>
    </div>
  );
};

export default ReferencePage;