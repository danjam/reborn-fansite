// src/pages/reference/PotionsPage.tsx
import { useMemo } from 'react';

import MaterialsList from '@/components/MaterialsList';
import PageHeader from '@/components/PageHeader';
import Table, { type Column } from '@/components/Table';
import TextWithIcon from '@/components/TextWithIcon';
import { useStyles } from '@/hooks';

import type { Potion } from '../../gameData';
import { gameData } from '../../gameData';

const PotionsPage = () => {
  const { styles } = useStyles();

  // Memoize potions data - stable reference from GameDataService
  const potions = useMemo(() => gameData.getAllPotions(), []);

  // Memoized column definitions to prevent Table re-renders
  // MaterialsList components will benefit from our earlier optimizations
  const columns: Column<Potion>[] = useMemo(
    () => [
      {
        header: 'Potion',
        minWidth: '200px',
        cellClassName: styles.text.primary,
        sortBy: 'name', // Sort alphabetically by potion name
        render: potion => (
          <TextWithIcon
            item={potion}
            linkTo={`/data/potions/${potion.id}`}
            textClassName={`font-medium ${styles.text.primary} hover:underline`}
            iconSize="lg"
          />
        ),
      },
      {
        header: 'Effect',
        minWidth: '180px',
        sortBy: 'effect', // Sort alphabetically by effect description
        render: potion => <span className="text-sm">{potion.effect}</span>,
      },
      {
        header: 'Sell Price',
        minWidth: '80px',
        sortBy: potion => potion.sell_price || 0, // Sort numerically, treat null as 0
        defaultSortDirection: 'desc', // Show highest prices first by default
        render: potion => (
          <span className="font-medium">
            {potion.sell_price !== null
              ? potion.sell_price.toLocaleString()
              : 'Cannot sell'}
          </span>
        ),
      },
      {
        header: 'Materials Required',
        minWidth: '250px',
        // No sortBy - this column would be complex/meaningless to sort
        render: potion => <MaterialsList materials={potion.materials} />,
      },
    ],
    [styles.text.primary]
  );

  return (
    <div>
      <PageHeader
        title="Potions"
        description="Complete list of all potions and their required ingredients for crafting."
      />

      {/* Potions Table */}
      <div className={styles.card}>
        <Table
          data={potions}
          columns={columns}
          initialSort={{ column: 'potion', direction: 'asc' }}
        />
      </div>
    </div>
  );
};

export default PotionsPage;
