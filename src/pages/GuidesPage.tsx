// src/pages/GuidesPage.tsx
import {
  boost,
  carrot,
  copper_bar,
  health,
  radiate,
  reference,
  shield,
} from '@/assets/img';
import { PageCard, PageCardData } from '@/components/PageCard';
import PageHeader from '@/components/PageHeader';

const GUIDE_ARTICLES: PageCardData[] = [
  {
    id: 'how-to-play',
    title: 'How to Play',
    description: 'Complete beginner guide to get started with Reborn gameplay',
    icon: reference,
    linkLabel: 'View',
  },
  {
    id: 'smithing',
    title: 'Smithing',
    description:
      'Mining, smelting, and crafting guide for weapons and equipment',
    icon: copper_bar,
    linkLabel: 'View',
  },
  {
    id: 'brewing-potions',
    title: 'Brewing Potions',
    description:
      'Guide to potion crafting, ingredients, and brewing strategies',
    icon: health,
    linkLabel: 'View',
  },
  {
    id: 'enchanting',
    title: 'Enchanting',
    description: 'Crystal crafting and magical enhancement guide',
    icon: radiate,
    linkLabel: 'View',
  },
  {
    id: 'farming',
    title: 'Farming',
    description:
      'Complete guide to growing crops, farming mechanics, and optimization',
    icon: carrot,
    linkLabel: 'View',
  },
  {
    id: 'your-house',
    title: 'Your House',
    description:
      'Housing upgrades, decorations, and building progression guide',
    icon: shield,
    linkLabel: 'View',
  },
  {
    id: 'tips-and-tricks',
    title: 'Tips and Tricks',
    description:
      'Advanced strategies and helpful tips to optimize your gameplay',
    icon: boost,
    linkLabel: 'View',
  },
  {
    id: 'faq',
    title: 'Frequently Asked Questions',
    description:
      'Common questions about Reborn gameplay, mechanics, and strategies',
    icon: reference,
    linkLabel: 'View',
  },
];

const GuidesPage = () => {
  return (
    <div>
      <PageHeader
        title="Guides"
        description="Comprehensive guides and helpful information to improve your Reborn gameplay experience."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GUIDE_ARTICLES.map(article => (
          <PageCard key={article.id} item={article} />
        ))}
      </div>
    </div>
  );
};

// Add display name for better debugging
GuidesPage.displayName = 'GuidesPage';

export default GuidesPage;
