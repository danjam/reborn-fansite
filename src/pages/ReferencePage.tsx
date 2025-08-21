// src/pages/ReferencePage.tsx
import {
  baby_slime_red,
  boost,
  carrot,
  copper_bar,
  health,
  helmet_iron,
  katie,
} from '@/assets/img';
import { PageCard, PageCardData } from '@/components/PageCard';
import PageHeader from '@/components/PageHeader';

const REFERENCE_ARTICLES: PageCardData[] = [
  {
    id: 'crystals',
    title: 'Crystals',
    description: 'Complete list of all crystals and their magical effects',
    icon: boost,
  },
  {
    id: 'equipment',
    title: 'Equipment',
    description:
      'Complete list of all equipment, crafting materials, and slot assignments',
    icon: helmet_iron,
  },
  {
    id: 'potions',
    title: 'Potions',
    description:
      'Complete list of all potions and their required ingredients for crafting',
    icon: health,
  },
  {
    id: 'vegetables',
    title: 'Vegetables',
    description:
      'Complete guide to all vegetables, growing times, prices, and potion usage',
    icon: carrot,
  },
  {
    id: 'monsters',
    title: 'Monsters',
    description:
      'Comprehensive guide to all monsters, their loot drops, and locations',
    icon: baby_slime_red,
  },
  {
    id: 'smithing',
    title: 'Smithing',
    description:
      'Mining, smelting, and metalworking guide including ores, bars, and equipment',
    icon: copper_bar,
  },
  {
    id: 'villagers',
    title: 'Village NPCs & Quests',
    description:
      'Guide to all villagers, their special functions, and services',
    icon: katie,
  },
];

const ReferencePage = () => {
  return (
    <div>
      <PageHeader
        title="Reference"
        description="Quick reference guides and comprehensive lists for all things Reborn. Find the information you need to optimize your gameplay."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REFERENCE_ARTICLES.map(article => (
          <PageCard key={article.id} item={article} />
        ))}
      </div>
    </div>
  );
};

// Add display name for better debugging
ReferencePage.displayName = 'ReferencePage';

export default ReferencePage;
