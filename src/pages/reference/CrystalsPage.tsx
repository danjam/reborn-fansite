// src/pages/reference/CrystalsPage.tsx
import { useMemo } from 'react';

import PageHeader from '@/components/PageHeader';
import Table, { type Column } from '@/components/Table';
import TextWithIcon from '@/components/TextWithIcon';
import { useTheme } from '@/hooks/useTheme';

import type { Crystal } from '@/gameData';
import { gameData } from '@/gameData';

const CrystalsPage = () => {
  const theme = useTheme();

  // Memoize data fetching - stable reference from GameDataService
  const crystals = useMemo(() => gameData.getAllCrystals(), []);

  // Memoized column definitions to prevent Table re-renders
  const columns: Column<Crystal>[] = useMemo(
    () => [
      {
        header: 'Crystal',
        minWidth: '200px',
        cellClassName: theme.text.primary,
        sortBy: 'name', // Sort alphabetically by crystal name
        render: crystal => (
          <TextWithIcon
            item={crystal}
            linkTo={`/data/crystals/${crystal.id}`}
            textClassName={`font-medium ${theme.text.primary} hover:underline`}
            iconSize="lg"
          />
        ),
      },
      {
        header: 'Effect',
        minWidth: '180px',
        // No sortBy - effect descriptions aren't meaningful to sort
        render: crystal => (
          <span className={`text-sm ${theme.text.secondary}`}>
            {crystal.effect}
          </span>
        ),
      },
      {
        header: 'Sell Price',
        minWidth: '80px',
        sortBy: crystal => crystal.sell_price || 0, // Sort numerically, treat null as 0
        defaultSortDirection: 'desc', // Show highest prices first by default
        render: crystal => (
          <span className={`font-medium ${theme.text.secondary}`}>
            {crystal.sell_price !== null
              ? crystal.sell_price.toLocaleString()
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
        title="Crystals"
        description="Complete list of all crystals and their magical effects. Enhance your gameplay with these powerful enchantments."
      />

      {/* Crystals Table */}
      <div className={theme.card()}>
        <Table
          data={crystals}
          columns={columns}
          initialSort={{ column: 'crystal', direction: 'asc' }}
        />
      </div>
    </div>
  );
};

export default CrystalsPage;
