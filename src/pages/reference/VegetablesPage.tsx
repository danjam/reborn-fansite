// src/pages/reference/VegetablesPage.tsx
import { useCallback, useMemo } from 'react';

import PageHeader from '@/components/PageHeader';
import Table, { type Column } from '@/components/Table';
import TextWithIcon from '@/components/TextWithIcon';
import { useStyles } from '@/hooks';

import type { Vegetable } from '../../gameData';
import { gameData } from '../../gameData';

const VegetablesPage = () => {
  const { styles } = useStyles();

  // Memoize data fetching - stable references from GameDataService
  const vegetables = useMemo(() => gameData.getAllVegetables(), []);
  const potions = useMemo(() => gameData.getAllPotions(), []);

  // Memoize helper function to prevent recreation on every render
  const getPotionsUsingVegetable = useCallback(
    (vegetableId: string) => {
      return potions.filter(
        potion =>
          potion.materials.some(material => material.id === vegetableId) &&
          potion.sell_price !== null &&
          potion.sell_price > 0
      );
    },
    [potions]
  );

  // Memoized column definitions to prevent Table re-renders
  const columns: Column<Vegetable>[] = useMemo(
    () => [
      {
        header: 'Vegetable',
        minWidth: '140px',
        cellClassName: styles.text.primary,
        sortBy: 'name', // Sort alphabetically by vegetable name
        render: vegetable => (
          <TextWithIcon
            item={vegetable}
            linkTo={`/data/vegetables/${vegetable.id}`}
            textClassName={`font-medium ${styles.text.primary} hover:underline`}
            iconSize="lg"
          />
        ),
      },
      {
        header: 'Grow Time',
        minWidth: '100px',
        sortBy: 'grow_time', // Sort numerically by grow time
        render: vegetable => (
          <span className="font-medium">{vegetable.grow_time} min</span>
        ),
      },
      {
        header: 'Buy Price',
        minWidth: '80px',
        sortBy: vegetable => vegetable.buy_price || 0, // Sort numerically, treat null as 0
        render: vegetable => (
          <span className="font-medium">
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
          <span className="font-medium">
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
            return <span className={styles.text.muted}>None</span>;
          }

          return (
            <div className="flex flex-wrap gap-2">
              {usedInPotions.map(potion => (
                <TextWithIcon
                  key={potion.id}
                  item={potion}
                  linkTo={`/data/potions/${potion.id}`}
                  textClassName={`text-sm ${styles.text.primary} hover:underline`}
                  iconSize="sm"
                />
              ))}
            </div>
          );
        },
      },
    ],
    [styles.text.primary, styles.text.muted, getPotionsUsingVegetable]
  );

  return (
    <div>
      <PageHeader
        title="Vegetables"
        description="Complete guide to all vegetables, growing times, prices, and potion usage. Optimize your farming and crafting strategies."
      />

      {/* Vegetables Table */}
      <div className={styles.card}>
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
