// src/pages/reference/VegetablesPage.tsx
import { useCallback, useMemo } from 'react';

import PageHeader from '@/components/PageHeader';
import Table, { type Column } from '@/components/Table';
import TextWithIcon from '@/components/TextWithIcon';
import { useTheme } from '@/hooks/useTheme';

import type { Potion, Vegetable } from '@/gameData';
import { gameData } from '@/gameData';

const VegetablesPage = () => {
  const theme = useTheme();

  // Memoize vegetables data - stable reference from GameDataService
  const vegetables = useMemo(() => gameData.getAllVegetables(), []);

  // Memoize helper function to prevent recreation on every render
  const getPotionsUsingVegetable = useCallback(
    (vegetableId: string): Potion[] => {
      return gameData.getPotionsUsingVegetable(vegetableId);
    },
    []
  );

  // Memoized column definitions to prevent Table re-renders
  const columns: Column<Vegetable>[] = useMemo(
    () => [
      {
        header: 'Vegetable',
        minWidth: '140px',
        cellClassName: theme.text.primary,
        sortBy: 'name', // Sort alphabetically by vegetable name
        render: vegetable => (
          <TextWithIcon
            item={vegetable}
            linkTo={`/data/vegetables/${vegetable.id}`}
            textClassName={`font-medium ${theme.text.primary} hover:underline`}
            iconSize="lg"
          />
        ),
      },
      {
        header: 'Grow Time',
        minWidth: '100px',
        sortBy: 'grow_time', // Sort numerically by grow time
        render: vegetable => (
          <span className={`font-medium ${theme.text.secondary}`}>
            {vegetable.grow_time} min
          </span>
        ),
      },
      {
        header: 'Buy Price',
        minWidth: '80px',
        sortBy: vegetable => vegetable.buy_price || 0, // Sort numerically, treat null as 0
        defaultSortDirection: 'desc', // Show highest prices first by default
        render: vegetable => (
          <span className={`font-medium ${theme.text.secondary}`}>
            {vegetable.buy_price !== null
              ? vegetable.buy_price.toLocaleString()
              : 'N/A'}
          </span>
        ),
      },
      {
        header: 'Sell Price',
        minWidth: '80px',
        sortBy: vegetable => vegetable.sell_price || 0, // Sort numerically, treat null as 0
        defaultSortDirection: 'desc', // Show highest prices first by default
        render: vegetable => (
          <span className={`font-medium ${theme.text.secondary}`}>
            {vegetable.sell_price !== null && vegetable.sell_price > 0
              ? vegetable.sell_price.toLocaleString()
              : 'N/A'}
          </span>
        ),
      },
      {
        header: 'Used in Potions',
        minWidth: '200px',
        // No sortBy - complex JSX content with multiple potions
        render: vegetable => {
          const usedInPotions = getPotionsUsingVegetable(vegetable.id);

          if (usedInPotions.length === 0) {
            return <span className={theme.text.muted}>None</span>;
          }

          return (
            <div className="flex flex-wrap gap-2">
              {usedInPotions.map(potion => (
                <TextWithIcon
                  key={potion.id}
                  item={potion}
                  linkTo={`/data/potions/${potion.id}`}
                  textClassName={`text-sm ${theme.text.primary} hover:underline`}
                  iconSize="sm"
                />
              ))}
            </div>
          );
        },
      },
    ],
    [
      theme.text.primary,
      theme.text.secondary,
      theme.text.muted,
      getPotionsUsingVegetable,
    ]
  );

  return (
    <div>
      <PageHeader
        title="Vegetables"
        description="Complete guide to all vegetables, growing times, prices, and potion usage. Optimize your farming and crafting strategies."
      />

      {/* Vegetables Table */}
      <div className={theme.card()}>
        <Table
          data={vegetables}
          columns={columns}
          initialSort={{ column: 'vegetable', direction: 'asc' }}
        />
      </div>
    </div>
  );
};

export default VegetablesPage;
