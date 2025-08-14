// src/pages/reference/CrystalsPage.tsx
import { Link } from 'react-router-dom';

import PageHeader from '@/components/PageHeader';
import { PixelArtImage } from '@/components/PixelArtImage';
import Table, { type Column } from '@/components/Table';
import { useStyles } from '@/hooks';

import type { Crystal } from '../../gameData';
import { gameData } from '../../gameData';

const CrystalsPage = () => {
  const { styles } = useStyles();
  const crystals = gameData.getAllCrystals();

  const columns: Column<Crystal>[] = [
    {
      header: 'Crystal',
      minWidth: '200px',
      cellClassName: styles.text.primary,
      sortBy: 'name', // Sort alphabetically by crystal name
      render: crystal => (
        <div className="flex items-center space-x-3">
          <PixelArtImage
            src={crystal.icon}
            alt={crystal.name}
            className="w-16 h-16 object-contain"
          />
          <Link
            to={`/data/crystals/${crystal.id}`}
            className={`font-medium ${styles.text.primary} hover:underline`}
          >
            {crystal.name}
          </Link>
        </div>
      ),
    },
    {
      header: 'Effect',
      minWidth: '180px',
      // No sortBy - effect descriptions aren't meaningful to sort
      render: crystal => <span className="text-sm">{crystal.effect}</span>,
    },
    {
      header: 'Sell Price',
      minWidth: '80px',
      sortBy: crystal => crystal.sell_price || 0, // Sort numerically, treat null as 0
      defaultSortDirection: 'desc', // Show highest prices first by default
      render: crystal => (
        <span className="font-medium">
          {crystal.sell_price !== null
            ? crystal.sell_price.toLocaleString()
            : 'Cannot sell'}
        </span>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Crystals"
        description="Complete list of all crystals and their magical effects. Enhance your gameplay with these powerful enchantments."
      />

      {/* Crystals Table */}
      <div className={styles.card}>
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
