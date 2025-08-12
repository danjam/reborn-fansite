// src/pages/reference/SmithingPage.tsx
import { useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import { PixelArtImage } from '@/components/PixelArtImage';
import { createStyles } from '@/utils/styles';

import { gameData } from '../../gameData';
import type { Bar, Ore } from '../../gameData';

const SmithingPage = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

  // Get ores and bars from the game data service
  const ores = gameData.getAllOres();
  const bars = gameData.getAllBars();

  // Helper function to get material display name from ID
  const getMaterialDisplayName = (materialId: string): string => {
    const ore = gameData.getObjectById(materialId);
    if (ore && ores.some(o => o.id === materialId)) {
      return ore.name;
    }

    // Final fallback - format the ID
    return materialId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Helper function to get bars that can be made from an ore
  const getBarsFromOre = (oreId: string) => {
    return gameData.getBarsFromOre(oreId);
  };

  // Helper function to format source types
  const formatSources = (sources?: Array<{ type: string; id?: string }>) => {
    if (!sources || sources.length === 0) return 'Unknown';
    
    return sources.map(source => {
      const formatted = source.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      return formatted;
    }).join(', ');
  };

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <nav className="flex items-center space-x-2 text-sm">
          <Link
            to="/reference"
            className={`${styles.text.accent} hover:underline`}
          >
            Reference
          </Link>
          <span className={styles.text.muted}>/</span>
          <span className={styles.text.secondary}>Smithing</span>
        </nav>
      </div>

      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-4 ${styles.text.accent}`}>
          🔨 Smithing
        </h1>
        <p className={`text-lg ${styles.text.secondary}`}>
          Complete guide to mining, smelting, and metalworking. Transform raw ores into valuable bars for crafting equipment and tools.
        </p>
      </div>

      {/* Ores Section */}
      <div className="mb-12">
        <h2 className={`text-2xl font-bold mb-6 ${styles.text.primary}`}>
          ⛏️ Ores
        </h2>
        <p className={`text-base mb-4 ${styles.text.secondary}`}>
          Raw materials gathered from mining operations and other sources.
        </p>
        
        <div className={styles.card}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b-2 ${styles.border}`}>
                  <th
                    className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[140px]`}
                  >
                    Ore
                  </th>
                  <th
                    className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[80px]`}
                  >
                    Sell Price
                  </th>
                  <th
                    className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[120px]`}
                  >
                    Sources
                  </th>
                  <th
                    className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[150px]`}
                  >
                    Used to Make
                  </th>
                </tr>
              </thead>
              <tbody>
                {ores.map((ore: Ore) => {
                  const usedToMake = getBarsFromOre(ore.id);
                  
                  return (
                    <tr
                      key={ore.id}
                      className={`border-b ${styles.border} hover:${styles.bg.hover} transition-colors`}
                    >
                      <td className="py-3 px-4">
                        <Link
                          to={`/data/ores/${ore.id}`}
                          className="flex items-center space-x-3 group"
                        >
                          <PixelArtImage
                            src={ore.icon}
                            alt={ore.name}
                            className="w-8 h-8 group-hover:scale-110 transition-transform"
                          />
                          <span
                            className={`font-medium ${styles.text.primary} group-hover:${styles.text.accent} transition-colors`}
                          >
                            {ore.name}
                          </span>
                        </Link>
                      </td>
                      <td className={`py-3 px-4 ${styles.text.secondary}`}>
                        {ore.sell_price !== null ? `${ore.sell_price} gold` : 'N/A'}
                      </td>
                      <td className={`py-3 px-4 ${styles.text.secondary}`}>
                        {formatSources(ore.sources)}
                      </td>
                      <td className={`py-3 px-4 ${styles.text.secondary}`}>
                        <div className="space-y-1">
                          {usedToMake.length > 0 ? (
                            usedToMake.map((bar, index) => (
                              <div key={index} className="text-sm">
                                <Link
                                  to={`/data/bars/${bar.id}`}
                                  className={`${styles.text.accent} hover:underline`}
                                >
                                  {bar.name}
                                </Link>
                              </div>
                            ))
                          ) : (
                            <span className="text-sm text-gray-500">No known uses</span>
                          )}
                        </div>
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
          🔥 Bars
        </h2>
        <p className={`text-base mb-4 ${styles.text.secondary}`}>
          Processed metal bars created from ores at the smithy. Essential for crafting equipment and tools.
        </p>
        
        <div className={styles.card}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b-2 ${styles.border}`}>
                  <th
                    className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[140px]`}
                  >
                    Bar
                  </th>
                  <th
                    className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[80px]`}
                  >
                    Sell Price
                  </th>
                  <th
                    className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[200px]`}
                  >
                    Materials Required
                  </th>
                </tr>
              </thead>
              <tbody>
                {bars.map((bar: Bar) => (
                  <tr
                    key={bar.id}
                    className={`border-b ${styles.border} hover:${styles.bg.hover} transition-colors`}
                  >
                    <td className="py-3 px-4">
                      <Link
                        to={`/data/bars/${bar.id}`}
                        className="flex items-center space-x-3 group"
                      >
                        <PixelArtImage
                          src={bar.icon}
                          alt={bar.name}
                          className="w-8 h-8 group-hover:scale-110 transition-transform"
                        />
                        <span
                          className={`font-medium ${styles.text.primary} group-hover:${styles.text.accent} transition-colors`}
                        >
                          {bar.name}
                        </span>
                      </Link>
                    </td>
                    <td className={`py-3 px-4 ${styles.text.secondary}`}>
                      {bar.sell_price !== null ? `${bar.sell_price} gold` : 'N/A'}
                    </td>
                    <td className={`py-3 px-4 ${styles.text.secondary}`}>
                      <div className="space-y-1">
                        {bar.materials.map((material, index) => (
                          <div key={index} className="text-sm">
                            {material.quantity}x {getMaterialDisplayName(material.id)}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Future sections placeholder */}
      <div className={`${styles.card} text-center py-8`}>
        <p className={`text-lg ${styles.text.secondary}`}>
          More smithing content coming soon...
        </p>
        <p className={`text-sm ${styles.text.muted} mt-2`}>
          Equipment, tools, and advanced crafting recipes
        </p>
      </div>
    </div>
  );
};

export default SmithingPage;