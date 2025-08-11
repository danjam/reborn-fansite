// src/pages/reference/PotionsPage.tsx
import { useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import { PixelArtImage } from '@/components/PixelArtImage';
import { VEGETABLES } from '@/data';
import { createStyles } from '@/utils/styles';

import { gameData } from '../../gameData';
import type { Potion } from '../../classes/Potion';

const PotionsPage = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

  // Get containers and drops from the game data service
  const containers = gameData.getAllContainers();
  const drops = gameData.getAllDrops();

  // Helper function to get material display name from ID
  const getMaterialDisplayName = (materialId: string): string => {
    // Check containers first using gameData service
    const container = gameData.getObjectById(materialId);
    if (container && containers.some(c => c.id === materialId)) {
      return container.name;
    }

    // Check vegetables
    const vegetable = VEGETABLES.find(v => v.id === materialId);
    if (vegetable) {
      return vegetable.name;
    }

    // Check drops (monster loot) using gameData service
    const drop = gameData.getObjectById(materialId);
    if (drop && drops.some(d => d.id === materialId)) {
      return drop.name;
    }

    // Final fallback - format the ID
    return materialId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Helper function to categorize materials
  const categorizeMaterials = (
    materials: { id: string; quantity: number }[]
  ) => {
    const containerMaterials: { id: string; quantity: number }[] = [];
    const vegetables: { id: string; quantity: number }[] = [];
    const monsterLoot: { id: string; quantity: number }[] = [];

    // Get all container, vegetable, and drop IDs for lookup
    const containerIds = containers.map(c => c.id);
    const vegetableIds = VEGETABLES.map(v => v.id);
    const dropIds = drops.map(d => d.id);

    materials.forEach(material => {
      if (containerIds.includes(material.id)) {
        containerMaterials.push(material);
      } else if (vegetableIds.includes(material.id)) {
        vegetables.push(material);
      } else if (dropIds.includes(material.id)) {
        monsterLoot.push(material);
      } else {
        // Unknown material type - default to monster loot category
        monsterLoot.push(material);
      }
    });

    return { containers: containerMaterials, vegetables, monsterLoot };
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
          <span className={styles.text.secondary}>Potions</span>
        </nav>
      </div>

      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-4 ${styles.text.accent}`}>
          Potions
        </h1>
      </div>

      {/* Potions Table */}
      <div className={styles.card}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b-2 ${styles.border}`}>
                <th
                  className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[120px]`}
                >
                  Potion
                </th>
                <th
                  className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[150px]`}
                >
                  Effect
                </th>
                <th
                  className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[80px]`}
                >
                  Value
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
              {gameData.getAllPotions().map((potion: Potion) => {
                const categorizedMaterials = categorizeMaterials(potion.materials);

                return (
                  <tr
                    key={potion.id}
                    className={`border-b ${styles.border} hover:${styles.table.hover}`}
                  >
                    {/* Potion Name and Icon */}
                    <td className={`py-4 px-4 ${styles.text.primary}`}>
                      <div className="flex items-center space-x-3">
                        <PixelArtImage
                          src={potion.icon}
                          alt={potion.name}
                          className="w-16 h-16 object-contain"
                        />
                        <span className="font-medium">{potion.name}</span>
                      </div>
                    </td>

                    {/* Effect */}
                    <td className={`py-4 px-4 ${styles.text.secondary}`}>
                      <span className="text-sm">{potion.effect}</span>
                    </td>

                    {/* Value */}
                    <td className={`py-4 px-4 ${styles.text.secondary}`}>
                      <span className="font-medium">
                        {potion.value !== null ? potion.value : 'N/A'}
                      </span>
                    </td>

                    {/* Sell Price */}
                    <td className={`py-4 px-4 ${styles.text.secondary}`}>
                      <span className="font-medium">
                        {potion.sell_price !== null
                          ? `$${potion.sell_price}`
                          : 'N/A'}
                      </span>
                    </td>

                    {/* Materials Required */}
                    <td className={`py-4 px-4 ${styles.text.secondary}`}>
                      <div className="space-y-2">
                        {/* Containers */}
                        {categorizedMaterials.containers.length > 0 && (
                          <div
                            className={`${styles.table.overlayPurple} p-2 rounded border border-purple-300/30`}
                          >
                            {categorizedMaterials.containers.map(material => {
                              const containerData = gameData.getObjectById(material.id);
                              return (
                                <div
                                  key={material.id}
                                  className="text-sm flex items-center justify-between"
                                >
                                  <div className="flex items-center space-x-2">
                                    {containerData && (
                                      <PixelArtImage
                                        src={containerData.icon}
                                        alt={containerData.name}
                                        className="w-4 h-4 object-contain"
                                      />
                                    )}
                                    <span>
                                      {getMaterialDisplayName(material.id)}
                                    </span>
                                  </div>
                                  <span className="font-medium">
                                    x{material.quantity}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Vegetables */}
                        {categorizedMaterials.vegetables.length > 0 && (
                          <div
                            className={`${styles.table.overlayGreen} p-2 rounded border border-green-300/30`}
                          >
                            {categorizedMaterials.vegetables.map(material => (
                              <div
                                key={material.id}
                                className="text-sm flex items-center justify-between"
                              >
                                <span>
                                  {getMaterialDisplayName(material.id)}
                                </span>
                                <span className="font-medium">
                                  x{material.quantity}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Monster Loot */}
                        {categorizedMaterials.monsterLoot.length > 0 && (
                          <div
                            className={`${styles.table.overlayRed} p-2 rounded border border-red-300/30`}
                          >
                            {categorizedMaterials.monsterLoot.map(material => (
                              <div
                                key={material.id}
                                className="text-sm flex items-center justify-between"
                              >
                                <span>
                                  {getMaterialDisplayName(material.id)}
                                </span>
                                <span className="font-medium">
                                  x{material.quantity}
                                </span>
                              </div>
                            ))}
                          </div>
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
  );
};

export default PotionsPage;