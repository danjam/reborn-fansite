// src/pages/ToolsPage.tsx
import { memo } from 'react';

import { boost, carrot, exp_boost, health } from '@/assets/img';
import { PageCard, PageCardData } from '@/components/PageCard';
import PageHeader from '@/components/PageHeader';

// Tools list - moved inline from features/tools
const TOOLS_LIST: PageCardData[] = [
  {
    id: 'crop-calculator',
    title: 'Crop Profit Calculator',
    icon: carrot,
    description: 'Calculate optimal crop profits and farming strategies',
  },
  {
    id: 'potion-ingredients-calculator',
    title: 'Potion Ingredients Calculator',
    icon: health,
    description:
      'Calculate how many containers and monster drops you need to craft potions from your vegetables',
  },
  {
    id: 'wishing-well-calculator',
    title: 'Wishing Well Calculator',
    icon: boost,
    description:
      'Calculate how many wishes you can get from your coins and wishing well level',
  },
  {
    id: 'rest-calculator',
    title: 'Rest Calculator',
    icon: exp_boost,
    description:
      'Calculate how much rested XP time you get based on your rest duration and bed multiplier',
  },
];

const ToolsPage = memo(() => {
  return (
    <div>
      <PageHeader
        title="Game Tools"
        description="Calculators and utilities to help optimize your gameplay experience."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS_LIST.map(tool => (
          <PageCard key={tool.id} item={tool} />
        ))}
      </div>
    </div>
  );
});

// Add display name for better debugging
ToolsPage.displayName = 'ToolsPage';

export default ToolsPage;
