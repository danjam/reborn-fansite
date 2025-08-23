// src/pages/reference/MonsterDropsPage.tsx
import { useMemo } from 'react';

import PageHeader from '@/components/PageHeader';
import Table, { type Column } from '@/components/Table';
import TextWithIcon from '@/components/TextWithIcon';
import { useTheme } from '@/hooks/useTheme';

import type { Drop, Monster } from '@/gameData';
import { gameData } from '@/gameData';

const MonsterDropsPage = () => {
  const theme = useTheme();

  // Memoize data fetching - stable reference from GameDataService
  const drops = useMemo(() => gameData.getAllDrops(), []);

  // Pre-compute monsters lookup for all drops to show which monsters drop each item
  // This eliminates expensive getObjectById calls in render functions
  const dropMonstersLookup = useMemo(() => {
    const lookup = new Map<string, Monster[]>();
    drops.forEach(drop => {
      const monsters = drop.monster_ids
        .map(monsterId => gameData.getObjectById<Monster>(monsterId))
        .filter((monster): monster is Monster => monster !== undefined);
      lookup.set(drop.id, monsters);
    });
    return lookup;
  }, [drops]);

  // Memoized column definitions to prevent Table re-renders
  const columns: Column<Drop>[] = useMemo(
    () => [
      {
        header: 'Drop',
        minWidth: '200px',
        cellClassName: theme.text.primary,
        sortBy: 'name', // Sort alphabetically by drop name
        render: drop => (
          <TextWithIcon
            item={drop}
            linkTo={`/data/drops/${drop.id}`}
            textClassName={`font-medium ${theme.text.primary} hover:underline`}
            iconSize="lg"
          />
        ),
      },
      {
        header: 'Monster',
        minWidth: '200px',
        // No sortBy - complex JSX content with multiple monsters
        render: drop => {
          // Use pre-computed lookup instead of expensive function calls
          const monsters = dropMonstersLookup.get(drop.id) || [];

          if (monsters.length === 0) {
            return <span className={theme.text.muted}>Unknown</span>;
          }

          return (
            <div className="space-y-1">
              {monsters.map(monster => (
                <TextWithIcon
                  key={monster.id}
                  item={monster}
                  linkTo={`/data/monsters/${monster.id}`}
                  textClassName={`text-sm ${theme.text.primary} hover:underline`}
                  iconSize="sm"
                />
              ))}
            </div>
          );
        },
      },
      {
        header: 'Floor(s)',
        minWidth: '120px',
        sortBy: drop => {
          const floors = gameData.getFloorsByDropId(drop.id);
          // Return first floor for sorting, or high number if no floors
          return floors.length > 0 ? floors[0]! : 999999;
        },
        defaultSortDirection: 'asc',
        render: drop => {
          const floorsText = gameData.getFormattedFloorsByDropId(drop.id);
          return (
            <span className={`text-sm font-mono ${theme.text.secondary}`}>
              {floorsText || 'Unknown'}
            </span>
          );
        },
      },
      {
        header: 'Sell Price',
        minWidth: '100px',
        sortBy: drop => drop.sell_price || 0, // Sort numerically, treat null as 0
        defaultSortDirection: 'desc', // Show highest prices first by default
        render: drop => (
          <span className={`font-medium ${theme.text.secondary}`}>
            {drop.sell_price !== null && drop.sell_price !== undefined
              ? drop.sell_price.toLocaleString()
              : 'Cannot sell'}
          </span>
        ),
      },
    ],
    [
      theme.text.primary,
      theme.text.secondary,
      theme.text.muted,
      dropMonstersLookup,
    ]
  );

  return (
    <div>
      <PageHeader
        title="Monster Drops"
        description="Complete list of all monster drops, their sources, and sell values. Track down rare loot and plan your hunting expeditions."
      />

      {/* Monster Drops Table */}
      <div className={theme.card()}>
        <Table
          data={drops}
          columns={columns}
          initialSort={{ column: 'drop', direction: 'asc' }}
        />
      </div>
    </div>
  );
};

export default MonsterDropsPage;
