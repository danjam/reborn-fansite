// src/pages/reference/SmithingPage.tsx
import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';

import { PixelArtImage } from '@/components/PixelArtImage';
import MaterialsList from '@/components/MaterialsList';
import { createStyles } from '@/utils/styles';
import { getMaterialDisplayName, formatSources } from '@/utils/gameObjectHelpers';

import { gameData } from '../../gameData';
import type { Bar, Ore, Equipment } from '../../gameData';

const SmithingPage = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

  // Get ores, bars, and equipment from the game data service
  const ores = gameData.getAllOres();
  const bars = gameData.getAllBars();
  const allEquipment = gameData.getAllEquipment();
  
  // Filter equipment to only show items that have materials
  const equipment = allEquipment.filter(item => 
    item.materials && item.materials.length > 0
  );

  // Helper function to get bars that can be made from an ore
  const getBarsFromOre = (oreId: string) => {
    return gameData.getBarsFromOre(oreId);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-4 ${styles.text.accent}`}>
          Smithing
        </h1>
        <p className={`text-lg ${styles.text.secondary}`}>
          Complete guide to mining, smelting, and metalworking. Transform raw ores into valuable bars for crafting equipment and tools.
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b-2 ${styles.border}`}>
                  <th className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[180px]`}>
                    Ore
                  </th>
                  <th className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[120px]`}>
                    Sources
                  </th>
                  <th className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[150px]`}>
                    Used For
                  </th>
                </tr>
              </thead>
              <tbody>
                {ores.map((ore: Ore) => {
                  const possibleBars = getBarsFromOre(ore.id);
                  
                  return (
                    <tr
                      key={ore.id}
                      className={`border-b ${styles.border}`}
                    >
                      <td className={`py-3 px-4 ${styles.text.primary}`}>
                        <div className="flex items-center space-x-3">
                          <PixelArtImage
                            src={ore.icon}
                            alt={ore.name}
                            className="w-12 h-12 object-contain"
                          />
                          <span className="font-medium">
                            {ore.name}
                          </span>
                        </div>
                      </td>
                      <td className={`py-3 px-4 ${styles.text.secondary}`}>
                        {formatSources(ore.sources)}
                      </td>
                      <td className={`py-3 px-4 ${styles.text.secondary}`}>
                        {possibleBars.length > 0 ? (
                          <div className="space-y-1">
                            {possibleBars.map(bar => (
                              <span
                                key={bar.id}
                                className="text-sm block"
                              >
                                {bar.name}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">No uses found</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bars Section */}
      <div className="mb-12">
        <h2 className={`text-2xl font-bold mb-6 ${styles.text.primary}`}>
          Bars
        </h2>
        <p className={`text-base mb-4 ${styles.text.secondary}`}>
          Refined metals created by smelting ores. Used for crafting equipment and tools.
        </p>

        <div className={styles.card}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b-2 ${styles.border}`}>
                  <th className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[180px]`}>
                    Bar
                  </th>
                  <th className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[100px]`}>
                    Sell Price
                  </th>
                  <th className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[150px]`}>
                    Materials Required
                  </th>
                </tr>
              </thead>
              <tbody>
                {bars.map((bar: Bar) => (
                  <tr
                    key={bar.id}
                    className={`border-b ${styles.border}`}
                  >
                    <td className={`py-3 px-4 ${styles.text.primary}`}>
                      <div className="flex items-center space-x-3">
                        <PixelArtImage
                          src={bar.icon}
                          alt={bar.name}
                          className="w-12 h-12 object-contain"
                        />
                        <span className="font-medium">
                          {bar.name}
                        </span>
                      </div>
                    </td>
                    <td className={`py-3 px-4 ${styles.text.secondary}`}>
                      {bar.sell_price !== null ? `${bar.sell_price} gold` : 'N/A'}
                    </td>
                    <td className={`py-3 px-4 ${styles.text.secondary}`}>
                      <MaterialsList 
                        materials={bar.materials} 
                        variant="orange" 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b-2 ${styles.border}`}>
                  <th className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[180px]`}>
                    Equipment
                  </th>
                  <th className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[150px]`}>
                    Materials Required
                  </th>
                </tr>
              </thead>
              <tbody>
                {equipment.map((item: Equipment) => (
                  <tr
                    key={item.id}
                    className={`border-b ${styles.border}`}
                  >
                    <td className={`py-3 px-4 ${styles.text.primary}`}>
                      <div className="flex items-center space-x-3">
                        <PixelArtImage
                          src={item.icon}
                          alt={item.name}
                          className="w-12 h-12 object-contain"
                        />
                        <span className="font-medium">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className={`py-3 px-4 ${styles.text.secondary}`}>
                      {item.materials && item.materials.length > 0 ? (
                        <MaterialsList 
                          materials={item.materials} 
                          variant="orange" 
                        />
                      ) : (
                        <span className="text-sm text-gray-500">No materials required</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmithingPage;