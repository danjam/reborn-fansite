// src/pages/reference/PotionsPage.tsx
import { useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import { PixelArtImage } from '@/components/PixelArtImage';
import { createStyles } from '@/utils/styles';
import { getMaterialDisplayName, categorizeMaterials } from '@/utils/gameObjectHelpers';

import { gameData } from '../../gameData';
import type { Potion } from '../../classes/Potion';

const PotionsPage = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

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
          🧪 Potions
        </h1>
        <p className={`text-lg ${styles.text.secondary}`}>
          Complete guide to all potions, their effects, crafting materials, and sell prices.
        </p>
      </div>

      {/* Potions Table */}
      <div className={styles.card}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b-2 ${styles.border}`}>
                <th
                  className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[200px]`}
                >
                  Potion
                </th>
                <th
                  className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[180px]`}
                >
                  Effect
                </th>
                <th
                  className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[80px]`}
                >
                  Sell Price
                </th>
                <th
                  className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[250px]`}
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
                        <Link 
                          to={`/data/potions/${potion.id}`}
                          className={`font-medium ${styles.text.primary} hover:underline`}
                        >
                          {potion.name}
                        </Link>
                      </div>
                    </td>

                    {/* Effect */}
                    <td className={`py-4 px-4 ${styles.text.secondary}`}>
                      <span className="text-sm">{potion.effect}</span>
                    </td>

                    {/* Sell Price */}
                    <td className={`py-4 px-4 ${styles.text.secondary}`}>
                      <span className="font-medium">
                        {potion.sell_price !== null
                          ? `${potion.sell_price}`
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
                                    <Link
                                      to={`/data/containers/${material.id}`}
                                      className={`${styles.text.primary} hover:underline`}
                                    >
                                      {getMaterialDisplayName(material.id)}
                                    </Link>
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
                            {categorizedMaterials.vegetables.map(material => {
                              const vegetableData = gameData.getObjectById(material.id);
                              return (
                                <div
                                  key={material.id}
                                  className="text-sm flex items-center justify-between"
                                >
                                  <div className="flex items-center space-x-2">
                                    {vegetableData && (
                                      <PixelArtImage
                                        src={vegetableData.icon}
                                        alt={vegetableData.name}
                                        className="w-4 h-4 object-contain"
                                      />
                                    )}
                                    <Link
                                      to={`/data/vegetables/${material.id}`}
                                      className={`${styles.text.primary} hover:underline`}
                                    >
                                      {getMaterialDisplayName(material.id)}
                                    </Link>
                                  </div>
                                  <span className="font-medium">
                                    x{material.quantity}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Monster Loot */}
                        {categorizedMaterials.monsterLoot.length > 0 && (
                          <div
                            className={`${styles.table.overlayRed} p-2 rounded border border-red-300/30`}
                          >
                            {categorizedMaterials.monsterLoot.map(material => {
                              const dropData = gameData.getObjectById(material.id);
                              return (
                                <div
                                  key={material.id}
                                  className="text-sm flex items-center justify-between"
                                >
                                  <div className="flex items-center space-x-2">
                                    {dropData && (
                                      <PixelArtImage
                                        src={dropData.icon}
                                        alt={dropData.name}
                                        className="w-4 h-4 object-contain"
                                      />
                                    )}
                                    <Link
                                      to={`/data/drops/${material.id}`}
                                      className={`${styles.text.primary} hover:underline`}
                                    >
                                      {getMaterialDisplayName(material.id)}
                                    </Link>
                                  </div>
                                  <span className="font-medium">
                                    x{material.quantity}
                                  </span>
                                </div>
                              );
                            })}
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