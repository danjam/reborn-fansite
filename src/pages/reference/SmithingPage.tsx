// src/pages/reference/SmithingPage.tsx
import { useCallback, useMemo } from 'react';

import MaterialsList from '@/components/MaterialsList';
import PageHeader from '@/components/PageHeader';
import Table, { type Column } from '@/components/Table';
import TextWithIcon from '@/components/TextWithIcon';
import { useStyles } from '@/hooks';

import type { Equipment, Smithing } from '@/gameData';
import { gameData } from '@/gameData';

const SmithingPage = () => {
  const { styles } = useStyles();

  // Memoize all data fetching and filtering operations
  // No more expensive filters on every render
  const ores = useMemo(() => gameData.getAllSmithingOres(), []);

  const bars = useMemo(
    () =>
      gameData
        .getAllSmithingBars()
        .filter(bar => (bar.materials?.length ?? 0) > 0),
    []
  );

  const plates = useMemo(
    () =>
      gameData
        .getAllSmithingPlates()
        .filter(plate => (plate.materials?.length ?? 0) > 0),
    []
  );

  const equipment = useMemo(
    () =>
      gameData
        .getAllEquipment()
        .filter(item => (item.materials?.length ?? 0) > 0),
    []
  );

  // Memoize helper function to prevent recreation on every render
  const getBarsFromOre = useCallback((oreId: string): Smithing[] => {
    return gameData.getBarsFromOre(oreId);
  }, []);

  // Memoized column definitions - prevents Table re-renders
  const oresColumns: Column<Smithing>[] = useMemo(
    () => [
      {
        header: 'Ore',
        minWidth: '180px',
        cellClassName: styles.text.primary,
        sortBy: 'name', // Sort alphabetically by ore name
        render: ore => (
          <TextWithIcon item={ore} textClassName="font-medium" iconSize="lg" />
        ),
      },
      {
        header: 'Sell Price',
        minWidth: '100px',
        sortBy: ore => ore.sell_price || 0, // Sort numerically by sell price
        defaultSortDirection: 'desc', // Show highest prices first
        render: ore => (
          <span className={`font-medium ${styles.text.secondary}`}>
            {ore.sell_price !== null ? ore.sell_price.toLocaleString() : 'N/A'}
          </span>
        ),
      },
      {
        header: 'Used to Make',
        minWidth: '150px',
        sortBy: ore => {
          const possibleBars = getBarsFromOre(ore.id);
          return possibleBars.length > 0 ? possibleBars[0]!.name : 'ZZZ'; // Sort by first bar name, put N/A at end
        },
        render: ore => {
          const possibleBars = getBarsFromOre(ore.id);
          return possibleBars.length > 0 ? (
            possibleBars.map((bar, index) => (
              <span key={bar.id} className={styles.text.secondary}>
                {bar.name}
                {index < possibleBars.length - 1 ? ', ' : ''}
              </span>
            ))
          ) : (
            <span className={styles.text.secondary}>N/A</span>
          );
        },
      },
    ],
    [styles.text.primary, styles.text.secondary, getBarsFromOre]
  );

  const barsColumns: Column<Smithing>[] = useMemo(
    () => [
      {
        header: 'Bar',
        minWidth: '180px',
        cellClassName: styles.text.primary,
        sortBy: 'name', // Sort alphabetically by bar name
        render: bar => (
          <TextWithIcon item={bar} textClassName="font-medium" iconSize="lg" />
        ),
      },
      {
        header: 'Sell Price',
        minWidth: '100px',
        sortBy: bar => bar.sell_price || 0, // Sort numerically by sell price
        defaultSortDirection: 'desc', // Show highest prices first
        render: bar => (
          <span className={`font-medium ${styles.text.secondary}`}>
            {bar.sell_price !== null ? bar.sell_price.toLocaleString() : 'N/A'}
          </span>
        ),
      },
      {
        header: 'Materials Required',
        minWidth: '150px',
        // No sortBy - complex MaterialsList component
        render: bar =>
          bar.materials && bar.materials.length > 0 ? (
            <MaterialsList materials={bar.materials} />
          ) : (
            'No materials required'
          ),
      },
    ],
    [styles.text.primary, styles.text.secondary]
  );

  const platesColumns: Column<Smithing>[] = useMemo(
    () => [
      {
        header: 'Plate',
        minWidth: '180px',
        cellClassName: styles.text.primary,
        sortBy: 'name', // Sort alphabetically by plate name
        render: plate => (
          <TextWithIcon
            item={plate}
            textClassName="font-medium"
            iconSize="lg"
          />
        ),
      },
      {
        header: 'Sell Price',
        minWidth: '100px',
        sortBy: plate => plate.sell_price || 0, // Sort numerically by sell price
        defaultSortDirection: 'desc', // Show highest prices first
        render: plate => (
          <span className={`font-medium ${styles.text.secondary}`}>
            {plate.sell_price !== null
              ? plate.sell_price.toLocaleString()
              : 'N/A'}
          </span>
        ),
      },
      {
        header: 'Materials Required',
        minWidth: '150px',
        // No sortBy - complex MaterialsList component
        render: plate =>
          plate.materials && plate.materials.length > 0 ? (
            <MaterialsList materials={plate.materials} />
          ) : (
            'No materials required'
          ),
      },
    ],
    [styles.text.primary, styles.text.secondary]
  );

  const equipmentColumns: Column<Equipment>[] = useMemo(
    () => [
      {
        header: 'Equipment',
        minWidth: '180px',
        cellClassName: styles.text.primary,
        sortBy: 'name', // Sort alphabetically by equipment name
        render: item => (
          <TextWithIcon item={item} textClassName="font-medium" iconSize="lg" />
        ),
      },
      {
        header: 'Materials Required',
        minWidth: '150px',
        // No sortBy - complex MaterialsList component
        render: item =>
          item.materials && item.materials.length > 0 ? (
            <MaterialsList materials={item.materials} />
          ) : (
            <span className="text-sm text-gray-500">No materials required</span>
          ),
      },
    ],
    [styles.text.primary]
  );

  return (
    <div>
      <PageHeader
        title="Smithing"
        description="Complete guide to mining, smelting, and metalworking. Transform raw ores into valuable bars for crafting equipment and tools."
      />

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
          Specially crafted metal plates used for advanced equipment creation.
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
          Weapons, armour, and tools crafted from bars and other materials.
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
