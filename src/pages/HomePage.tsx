// src/pages/HomePage.tsx
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { home_banner, reference } from '@/assets/img';
import { PageCard, PageCardData } from '@/components/PageCard';
import PageHeader from '@/components/PageHeader';
import { SteamNews } from '@/components/SteamNews';
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

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Welcome to the Reborn Fansite"
        showBreadcrumb={false}
        description={
          <>
            Your one-stop destination for all things{' '}
            <a
              href="https://store.steampowered.com/app/2850000/Reborn_An_Idle_Roguelike_RPG/"
              target="_blank"
              rel="noopener noreferrer"
              className={theme.text.accent + ' hover:underline'}
            >
              Reborn
            </a>
            . Explore{' '}
            <Link
              to="/guides"
              className={theme.text.accent + ' hover:underline'}
            >
              guides
            </Link>
            ,{' '}
            <Link
              to="/reference"
              className={theme.text.accent + ' hover:underline'}
            >
              reference materials
            </Link>
            , and{' '}
            <Link
              to="/tools"
              className={theme.text.accent + ' hover:underline'}
            >
              tools
            </Link>
            .
          </>
        }
      />

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {features.map(feature => (
          <div key={feature.id}>
            <PageCard item={feature} />
          </div>
        ))}
      </div>

      {/* Combined Card: Header Image + Steam News */}
      <div
        className={clsx(
          'mb-8 rounded-lg shadow-md overflow-hidden',
          theme.background.elevated
        )}
      >
        {/* Header Banner Image - Top rounded corners only */}
        <div className="w-full h-[240px] overflow-hidden flex items-center justify-center">
          <img
            src={home_banner}
            alt="Reborn Fansite Banner"
            className="object-none"
            style={{
              width: '1280px',
              height: '240px',
            }}
          />
        </div>

        {/* Steam News - Bottom rounded corners only */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Steam News (2/3 width) */}
            <div className="lg:col-span-2">
              <SteamNews />
            </div>

            {/* Right Column: Community Links (1/3 width) */}
            <div className="lg:col-span-1">
              <h3
                className={clsx('text-xl font-bold mb-4', theme.text.primary)}
              >
                Community Links
              </h3>
              <ul className="space-y-3 list-disc list-inside">
                <li className="text-sm">
                  <a
                    href="https://steamcommunity.com/app/2850000/discussions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx('hover:underline', theme.text.accent)}
                  >
                    Steam Community
                  </a>
                </li>
                <li className="text-sm">
                  <a
                    href="https://discord.gg/KxTeWtuN9u"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx('hover:underline', theme.text.accent)}
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Add display name for better debugging
HomePage.displayName = 'HomePage';

export default HomePage;
