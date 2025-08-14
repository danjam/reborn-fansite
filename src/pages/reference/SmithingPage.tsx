// src/pages/reference/SmithingPage.tsx
import Breadcrumb from '@/components/Breadcrumb';
import MaterialsList from '@/components/MaterialsList';
import { PixelArtImage } from '@/components/PixelArtImage';
import Table, { type Column } from '@/components/Table';
import { useStyles } from '@/hooks';
import { formatSources } from '@/utils/gameObjectHelpers';

import type { Equipment, Smithing } from '../../gameData';
import { gameData } from '../../gameData';

const SmithingPage = () => {
  const { styles } = useStyles();

  // Get smithing items and equipment from the game data service
  const ores = gameData.getAllSmithingOres();
  const bars = gameData.getAllSmithingBars();
  const plates = gameData.getAllSmithingPlates();
  const allEquipment = gameData.getAllEquipment();

  // Filter equipment to only show items that have materials
  const equipment = allEquipment.filter(
    item => item.materials && item.materials.length > 0
  );

  // Helper function to get bars that can be made from an ore
  const getBarsFromOre = (oreId: string) => {
    return gameData.getBarsFromOre(oreId);
  };

  // Column definitions for ores table
  const oresColumns: Column<Smithing>[] = [
    {
      header: 'Ore',
      minWidth: '180px',
      cellClassName: styles.text.primary,
      sortBy: 'name', // Sort alphabetically by ore name
      render: ore => (
        <div className="flex items-center space-x-3">
          <PixelArtImage
            src={ore.icon}
            alt={ore.name}
            className="w-12 h-12 object-contain"
          />
          <span className="font-medium">{ore.name}</span>
        </div>
      ),
    },
    {
      header: 'Sources',
      minWidth: '120px',
      // No sortBy - complex source formatting
      render: ore => formatSources(ore.sources),
    },
    {
      header: 'Used For',
      minWidth: '150px',
      sortBy: ore => {
        const possibleBars = getBarsFromOre(ore.id);
        return possibleBars.length > 0 ? possibleBars[0]!.name : 'ZZZ'; // Sort by first bar name, put N/A at end
      },
      render: ore => {
        const possibleBars = getBarsFromOre(ore.id);
        return possibleBars.length > 0
          ? possibleBars.map((bar, index) => (
              <span key={bar.id}>
                {bar.name}
                {index < possibleBars.length - 1 ? ', ' : ''}
              </span>
            ))
          : 'N/A';
      },
    },
  ];

  // Column definitions for bars table
  const barsColumns: Column<Smithing>[] = [
    {
      header: 'Bar',
      minWidth: '180px',
      cellClassName: styles.text.primary,
      sortBy: 'name', // Sort alphabetically by bar name
      render: bar => (
        <div className="flex items-center space-x-3">
          <PixelArtImage
            src={bar.icon}
            alt={bar.name}
            className="w-12 h-12 object-contain"
          />
          <span className="font-medium">{bar.name}</span>
        </div>
      ),
    },
    {
      header: 'Sell Price',
      minWidth: '100px',
      sortBy: bar => bar.sell_price || 0, // Sort numerically by sell price
      defaultSortDirection: 'desc', // Show highest prices first
      render: bar =>
        bar.sell_price !== null ? bar.sell_price.toLocaleString() : 'N/A',
    },
    {
      header: 'Materials Required',
      minWidth: '150px',
      // No sortBy - complex MaterialsList component
      render: bar =>
        bar.materials && bar.materials.length > 0 ? (
          <MaterialsList materials={bar.materials} variant="orange" />
        ) : (
          'No materials required'
        ),
    },
  ];

  // Column definitions for plates table
  const platesColumns: Column<Smithing>[] = [
    {
      header: 'Plate',
      minWidth: '180px',
      cellClassName: styles.text.primary,
      sortBy: 'name', // Sort alphabetically by plate name
      render: plate => (
        <div className="flex items-center space-x-3">
          <PixelArtImage
            src={plate.icon}
            alt={plate.name}
            className="w-12 h-12 object-contain"
          />
          <span className="font-medium">{plate.name}</span>
        </div>
      ),
    },
    {
      header: 'Sell Price',
      minWidth: '100px',
      sortBy: plate => plate.sell_price || 0, // Sort numerically by sell price
      defaultSortDirection: 'desc', // Show highest prices first
      render: plate =>
        plate.sell_price !== null ? plate.sell_price.toLocaleString() : 'N/A',
    },
    {
      header: 'Materials Required',
      minWidth: '150px',
      // No sortBy - complex MaterialsList component
      render: plate =>
        plate.materials && plate.materials.length > 0 ? (
          <MaterialsList materials={plate.materials} variant="orange" />
        ) : (
          'No materials required'
        ),
    },
  ];

  // Column definitions for equipment table
  const equipmentColumns: Column<Equipment>[] = [
    {
      header: 'Equipment',
      minWidth: '180px',
      cellClassName: styles.text.primary,
      sortBy: 'name', // Sort alphabetically by equipment name
      render: item => (
        <div className="flex items-center space-x-3">
          <PixelArtImage
            src={item.icon}
            alt={item.name}
            className="w-12 h-12 object-contain"
          />
          <span className="font-medium">{item.name}</span>
        </div>
      ),
    },
    {
      header: 'Materials Required',
      minWidth: '150px',
      // No sortBy - complex MaterialsList component
      render: item =>
        item.materials && item.materials.length > 0 ? (
          <MaterialsList materials={item.materials} variant="orange" />
        ) : (
          <span className="text-sm text-gray-500">No materials required</span>
        ),
    },
  ];

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-4 ${styles.text.accent}`}>
          Smithing
        </h1>
        <p className={`text-lg ${styles.text.secondary}`}>
          Complete guide to mining, smelting, and metalworking. Transform raw
          ores into valuable bars for crafting equipment and tools.
        </p>
      </div>

      {/* Ores Section */}
      <div className="mb-12">
        <h2 className={`text-2xl font-bold mb-6 ${styles.text.primary}`}>
          Ores
        </h2>
        <p className={`text-base mb-4 ${styles.text.secondary}`}>
          Raw materials gathered from mining operations and other sources.
        </p>

        <div className={styles.card}>
          <Table
            data={ores}
            columns={oresColumns}
            initialSort={{ column: 'ore', direction: 'asc' }}
          />
        </div>
      </div>

      {/* Bars Section */}
      <div className="mb-12">
        <h2 className={`text-2xl font-bold mb-6 ${styles.text.primary}`}>
          Bars
        </h2>
        <p className={`text-base mb-4 ${styles.text.secondary}`}>
          Refined metal bars created by smelting raw ores. Used for crafting
          equipment and tools.
        </p>

        <div className={styles.card}>
          <Table
            data={bars}
            columns={barsColumns}
            initialSort={{ column: 'bar', direction: 'asc' }}
          />
        </div>
      </div>

      {/* Plates Section */}
      <div className="mb-12">
        <h2 className={`text-2xl font-bold mb-6 ${styles.text.primary}`}>
          Plates
        </h2>
        <p className={`text-base mb-4 ${styles.text.secondary}`}>
          Refined metal plates created from bars. Used for improving equipment
          and tools.
        </p>

        <div className={styles.card}>
          <Table
            data={plates}
            columns={platesColumns}
            initialSort={{ column: 'plate', direction: 'asc' }}
          />
        </div>
      </div>

      {/* Equipment Section */}
      <div className="mb-12">
        <h2 className={`text-2xl font-bold mb-6 ${styles.text.primary}`}>
          Equipment
        </h2>
        <p className={`text-base mb-4 ${styles.text.secondary}`}>
          Weapons, armor, and tools crafted from refined metal bars.
        </p>

        <div className={styles.card}>
          <Table
            data={equipment}
            columns={equipmentColumns}
            initialSort={{ column: 'equipment', direction: 'asc' }}
          />
        </div>
      </div>
    </div>
  );
};

export default SmithingPage;
