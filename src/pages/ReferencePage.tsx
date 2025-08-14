// src/pages/ReferencePage.tsx
import {
  baby_slime_red,
  boost,
  copper_bar,
  defimg,
  health,
  katie,
} from '@/assets/img';
import Breadcrumb from '@/components/Breadcrumb';
import { Card, CardData } from '@/components/Card';
import { useStyles } from '@/hooks';

const REFERENCE_ARTICLES: CardData[] = [
  {
    id: 'crystals',
    title: 'Crystals',
    description: 'Complete list of all crystals and their magical effects',
    icon: boost,
    linkLabel: 'View',
  },
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
    id: 'smithing',
    title: 'Smithing',
    description:
      'Mining, smelting, and metalworking guide including ores, bars, and equipment',
    icon: copper_bar,
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
  const { styles } = useStyles();

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-4 ${styles.text.accent}`}>
          Reference
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
