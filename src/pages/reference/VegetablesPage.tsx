// src/pages/reference/VegetablesPage.tsx
import { Link } from 'react-router-dom';

import Breadcrumb from '@/components/Breadcrumb';
import { PixelArtImage } from '@/components/PixelArtImage';
import Table, { type Column } from '@/components/Table';
import { useStyles } from '@/hooks';

import type { Vegetable } from '../../gameData';
import { gameData } from '../../gameData';

const VegetablesPage = () => {
  const { styles } = useStyles();

  // Get vegetables and potions from the game data service
  const vegetables = gameData.getAllVegetables();
  const potions = gameData.getAllPotions();

  // Helper function to find potions that use a specific vegetable
  const getPotionsUsingVegetable = (vegetableId: string) => {
    return potions.filter(
      potion =>
        potion.materials.some(material => material.id === vegetableId) &&
        potion.sell_price !== null &&
        potion.sell_price > 0
    );
  };

  const columns: Column<Vegetable>[] = [
    {
      header: 'Vegetable',
      minWidth: '140px',
      cellClassName: styles.text.primary,
      sortBy: 'name', // Sort alphabetically by vegetable name
      render: vegetable => (
        <div className="flex items-center space-x-3">
          <PixelArtImage
            src={vegetable.icon}
            alt={vegetable.name}
            className="w-16 h-16 object-contain"
          />
          <Link
            to={`/data/vegetables/${vegetable.id}`}
            className={`font-medium ${styles.text.primary} hover:underline`}
          >
            {vegetable.name}
          </Link>
        </div>
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
              <div key={potion.id} className="flex items-center space-x-2">
                <PixelArtImage
                  src={potion.icon}
                  alt={potion.name}
                  className="w-4 h-4 object-contain"
                />
                <Link
                  to={`/data/potions/${potion.id}`}
                  className={`text-sm ${styles.text.primary} hover:underline`}
                >
                  {potion.name}
                </Link>
              </div>
            ))}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-4 ${styles.text.accent}`}>
          Vegetables
        </h1>
        <p className={`text-lg ${styles.text.secondary}`}>
          Complete list of all vegetables with growing information and usage in
          potions.
        </p>
      </div>

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
