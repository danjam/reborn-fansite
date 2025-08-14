// src/pages/reference/PotionsPage.tsx
import { Link } from 'react-router-dom';

import MaterialsList from '@/components/MaterialsList';
import PageHeader from '@/components/PageHeader';
import { PixelArtImage } from '@/components/PixelArtImage';
import Table, { type Column } from '@/components/Table';
import { useStyles } from '@/hooks';
import { categorizeMaterials } from '@/utils/gameObjectHelpers';

import type { Potion } from '../../gameData';
import { gameData } from '../../gameData';

const PotionsPage = () => {
  const { styles } = useStyles();
  const potions = gameData.getAllPotions();

  const columns: Column<Potion>[] = [
    {
      header: 'Potion',
      minWidth: '200px',
      cellClassName: styles.text.primary,
      sortBy: 'name', // Sort alphabetically by potion name
      render: potion => (
        <div className="flex items-center space-x-3">
          <PixelArtImage
            src={potion.icon}
            alt={potion.name}
            className="w-16 h-16 object-contain"
          />
          <Link
            to={`/data/potions/${potion.id}`}
            className={`font-medium ${styles.text.primary} hover:underline`}
          >
            {potion.name}
          </Link>
        </div>
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
      render: potion => {
        const categorizedMaterials = categorizeMaterials(potion.materials);

        return (
          <div className="space-y-2">
            {categorizedMaterials.containers.length > 0 && (
              <MaterialsList
                materials={categorizedMaterials.containers}
                variant="purple"
              />
            )}
            {categorizedMaterials.vegetables.length > 0 && (
              <MaterialsList
                materials={categorizedMaterials.vegetables}
                variant="green"
              />
            )}
            {categorizedMaterials.monsterLoot.length > 0 && (
              <MaterialsList
                materials={categorizedMaterials.monsterLoot}
                variant="red"
              />
            )}
          </div>
        );
      },
    },
  ];

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
