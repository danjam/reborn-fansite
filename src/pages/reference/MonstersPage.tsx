// src/pages/reference/MonstersPage.tsx
import { useMemo } from 'react';

import PageHeader from '@/components/PageHeader';
import Table, { type Column } from '@/components/Table';
import TextWithIcon from '@/components/TextWithIcon';
import { useTheme } from '@/hooks/useTheme';

import type { Monster } from '@/gameData';
import { gameData } from '@/gameData';

const MonstersPage = () => {
  const theme = useTheme();

  // Memoize monsters data - stable reference from GameDataService
  const monsters = useMemo(() => gameData.getAllMonsters(), []);

  // Pre-compute monster drops lookup for all monsters
  // This eliminates expensive getDropsByMonsterId calls in render functions
  const monsterDropsLookup = useMemo(() => {
    const lookup = new Map<
      string,
      ReturnType<typeof gameData.getDropsByMonsterId>
    >();
    monsters.forEach(monster => {
      lookup.set(monster.id, gameData.getDropsByMonsterId(monster.id));
    });
    return lookup;
  }, [monsters]);

  // Memoized column definitions to prevent Table re-renders
  const columns: Column<Monster>[] = useMemo(
    () => [
      {
        header: 'Monster',
        minWidth: '140px',
        cellClassName: theme.text.primary,
        sortBy: 'name', // Sort alphabetically by monster name
        render: monster => (
          <div className="flex items-center space-x-2">
            <TextWithIcon
              item={monster}
              textClassName={`font-semibold ${theme.text.primary}`}
              iconSize="lg"
            />
            {monster.boss && (
              <span className="text-[10px] bg-red-500 text-white px-1 py-0.5 rounded-full font-bold">
                BOSS
              </span>
            )}
          </div>
        ),
      },
      {
        header: 'Loot Drops',
        minWidth: '120px',
        // No sortBy - complex JSX content with multiple drops
        render: monster => {
          // Use pre-computed lookup instead of expensive function call
          const monsterDrops = monsterDropsLookup.get(monster.id) || [];

          if (monsterDrops.length === 0) {
            return <span className={theme.text.muted}>None</span>;
          }

          return (
            <div className="flex flex-wrap gap-2">
              {monsterDrops.map(drop => (
                <TextWithIcon
                  key={drop.id}
                  item={drop}
                  linkTo={`/data/drops/${drop.id}`}
                  textClassName={`text-sm ${theme.text.primary} hover:underline`}
                  iconSize="sm"
                />
              ))}
            </div>
          );
        },
      },
    ],
    [theme.text.primary, theme.text.muted, monsterDropsLookup]
  );

  return (
    <div>
      <PageHeader
        title="Monsters"
        description="Comprehensive guide to all monsters, their loot drops, and locations. Know your enemies and plan your battles."
      />

      {/* Monsters Table */}
      <div className={theme.card()}>
        <Table
          data={monsters}
          columns={columns}
          initialSort={{ column: 'monster', direction: 'asc' }}
        />
      </div>
    </div>
  );
};

export default MonstersPage;
