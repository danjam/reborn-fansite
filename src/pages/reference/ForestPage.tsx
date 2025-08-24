// src/pages/reference/ForestPage.tsx
import { useMemo } from 'react';

import PageHeader from '@/components/PageHeader';
import Table, { type Column } from '@/components/Table';
import TextWithIcon from '@/components/TextWithIcon';
import { useTheme } from '@/hooks/useTheme';

import type { Forest } from '@/gameData';
import { gameData } from '@/gameData';

const ForestPage = () => {
  const theme = useTheme();

  // Memoize data fetching - stable reference from GameDataService
  const forestItems = useMemo(() => gameData.getAllForest(), []);

  // Memoized column definitions to prevent Table re-renders
  const columns: Column<Forest>[] = useMemo(
    () => [
      {
        header: 'Forest Item',
        minWidth: '200px',
        cellClassName: theme.text.primary,
        sortBy: 'name', // Sort alphabetically by forest item name
        render: forestItem => (
          <TextWithIcon
            item={forestItem}
            linkTo={`/data/forest/${forestItem.id}`}
            textClassName={`font-medium ${theme.text.primary} hover:underline`}
            iconSize="lg"
          />
        ),
      },
      {
        header: 'Sell Price',
        minWidth: '80px',
        sortBy: forestItem => forestItem.sell_price || 0, // Sort numerically, treat null as 0
        defaultSortDirection: 'desc', // Show highest prices first by default
        render: forestItem => (
          <span className={`font-medium ${theme.text.secondary}`}>
            {forestItem.sell_price !== null
              ? forestItem.sell_price.toLocaleString()
              : 'Cannot sell'}
          </span>
        ),
      },
    ],
    [theme.text.primary, theme.text.secondary]
  );

  return (
    <div>
      <PageHeader
        title="Forest"
        description="Complete list of all forest items found while foraging. Gather these resources to craft and trade."
      />

      {/* Forest Items Table */}
      <div className={theme.card()}>
        <Table
          data={forestItems}
          columns={columns}
          initialSort={{ column: 'forestItem', direction: 'asc' }}
        />
      </div>
    </div>
  );
};

export default ForestPage;
