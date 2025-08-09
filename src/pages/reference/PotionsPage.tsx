// src/pages/reference/PotionsPage.tsx
import { useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import { PixelArtImage } from '@/components/PixelArtImage';
import { CONTAINERS, POTIONS, Potion, VEGETABLES } from '@/data';
import { createStyles } from '@/utils/styles';

const PotionsPage = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

  // Helper function to get material display name from ID
  const getMaterialDisplayName = (materialId: string): string => {
    // Check containers first
    const container = CONTAINERS.find(c => c.id === materialId);
    if (container) {
      return container.name;
    }

    // Check vegetables
    const vegetable = VEGETABLES.find(v => v.id === materialId);
    if (vegetable) {
      return vegetable.name;
    }

    // Fallback for monster loot items (until we have centralized monster drops data)
    const monsterLootNames: Record<string, string> = {
      snake_venom_purple: 'Snake Venom (Purple)',
      bat_wing_purple: 'Bat Wing (Purple)',
      orb_red: 'Orb (Red)',
      slime_egg_red: 'Slime Egg (Red)',
      slime_egg_blue: 'Slime Egg (Blue)',
      mushroom_brown: 'Mushroom (Brown)',
      mushroom_purple: 'Mushroom (Purple)',
      rat_tail_purple: 'Rat Tail (Purple)',
      rat_tail_red: 'Rat Tail (Red)',
      bone: 'Bone',
    };

    return (
      monsterLootNames[materialId] ||
      materialId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    );
  };

  // Helper function to categorize materials
  const categorizeMaterials = (
    materials: { id: string; quantity: number }[]
  ) => {
    const containers: { id: string; quantity: number }[] = [];
    const vegetables: { id: string; quantity: number }[] = [];
    const monsterLoot: { id: string; quantity: number }[] = [];

    // Get all container and vegetable IDs for lookup
    const containerIds = CONTAINERS.map(c => c.id);
    const vegetableIds = VEGETABLES.map(v => v.id);

    materials.forEach(material => {
      if (containerIds.includes(material.id)) {
        containers.push(material);
      } else if (vegetableIds.includes(material.id)) {
        vegetables.push(material);
      } else {
        monsterLoot.push(material);
      }
    });

    return { containers, vegetables, monsterLoot };
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
              {POTIONS.map((potion: Potion) => {
                const categorizedMaterials = categorizeMaterials(
                  potion.materials
                );

                return (
                  <tr
                    key={potion.id}
                    className={`border-b ${styles.table.rowBorderBottom}`}
                  >
                    {/* Potion Name & Icon */}
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <PixelArtImage
                          src={potion.icon}
                          alt={potion.name}
                          className="w-16 h-16 object-contain"
                        />
                        <span
                          className={`font-semibold ${styles.text.primary}`}
                        >
                          {potion.name}
                        </span>
                      </div>
                    </td>

                    {/* Effect Description */}
                    <td className={`py-4 px-4 ${styles.text.secondary}`}>
                      {potion.effect}
                    </td>

                    {/* Sell Price */}
                    <td className={`py-4 px-4 ${styles.text.secondary}`}>
                      <span className={`font-bold ${styles.text.primary}`}>
                        {potion.sell_price !== null ? potion.sell_price : 'N/A'}
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
                              const containerData = CONTAINERS.find(
                                c => c.id === material.id
                              );
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
