// src/pages/HomePage.tsx
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { reference } from '@/assets/img';
import { PageCard, PageCardData } from '@/components/PageCard';
import { useTheme } from '@/hooks/useTheme';

const HomePage = () => {
  const theme = useTheme();

  const features: PageCardData[] = [
    {
      id: 'guides',
      icon: reference,
      title: 'Guides',
      description: 'Helpful guides and frequently asked questions',
    },
    {
      id: 'reference',
      icon: reference,
      title: 'Reference',
      description: 'Quick lookup guides and comprehensive data tables',
    },
    {
      id: 'tools',
      icon: reference,
      title: 'Tools',
      description: 'Calculators and utilities to optimize your gameplay',
    },
  ];

  // Child pages for each section
  const childPages = {
    guides: [
      { title: 'How to Play', path: '/guides/how-to-play' },
      { title: 'Smithing', path: '/guides/smithing' },
      { title: 'Brewing Potions', path: '/guides/brewing-potions' },
      { title: 'Enchanting', path: '/guides/enchanting' },
      { title: 'Farming', path: '/guides/farming' },
      { title: 'Your House', path: '/guides/your-house' },
      { title: 'Tips and Tricks', path: '/guides/tips-and-tricks' },
      { title: 'FAQ', path: '/guides/faq' },
    ],
    reference: [
      { title: 'Crystals', path: '/reference/crystals' },
      { title: 'Potions', path: '/reference/potions' },
      { title: 'Vegetables', path: '/reference/vegetables' },
      { title: 'Monsters', path: '/reference/monsters' },
      { title: 'Smithing', path: '/reference/smithing' },
      { title: 'Village NPCs & Quests', path: '/reference/villagers' },
    ],
    tools: [
      { title: 'Crop Profit Calculator', path: '/tools/crop-calculator' },
    ],
  };

  return (
    <div className="py-16">
      <div className="text-center mb-16">
        <h2 className={`text-4xl font-bold mb-6 ${theme.text.accent}`}>
          Welcome to Reborn Fansite
        </h2>
        <p className={`text-xl mb-8 max-w-2xl mx-auto ${theme.text.secondary}`}>
          Your ultimate resource for Reborn game guides, calculators, and tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map(feature => (
          <div key={feature.id}>
            <PageCard item={feature} />

            {/* Child pages list */}
            <div
              className={clsx('mt-6 p-4 rounded-lg', theme.background.elevated)}
            >
              <ul className="space-y-2">
                {childPages[feature.id as keyof typeof childPages].map(
                  (child, index) => (
                    <li key={index}>
                      <Link
                        to={child.path}
                        className={clsx(
                          'text-sm hover:underline block',
                          theme.text.secondary
                        )}
                      >
                        {child.title}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Add display name for better debugging
HomePage.displayName = 'HomePage';

export default HomePage;
