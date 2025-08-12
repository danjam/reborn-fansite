// src/pages/reference/VegetablesPage.tsx
import { useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import { PixelArtImage } from '@/components/PixelArtImage';
import { createStyles } from '@/utils/styles';

import type { Vegetable } from '../../gameData';
import { gameData } from '../../gameData';

const VegetablesPage = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

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
          <span className={styles.text.secondary}>Vegetables</span>
        </nav>
      </div>

      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-4 ${styles.text.accent}`}>
          Vegetables
        </h1>
      </div>

      {/* Vegetables Table */}
      <div className={styles.card}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b-2 ${styles.border}`}>
                <th
                  className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[140px]`}
                >
                  Vegetable
                </th>
                <th
                  className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[100px]`}
                >
                  Grow Time
                </th>
                <th
                  className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[80px]`}
                >
                  Buy Price
                </th>
                <th
                  className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[80px]`}
                >
                  Sell Price
                </th>
                <th
                  className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[200px]`}
                >
                  Used in Potions
                </th>
              </tr>
            </thead>
            <tbody>
              {vegetables.map((vegetable: Vegetable) => {
                const usedInPotions = getPotionsUsingVegetable(vegetable.id);

                return (
                  <tr
                    key={vegetable.id}
                    className={`border-b ${styles.border} hover:${styles.table.hover}`}
                  >
                    {/* Vegetable Name and Icon */}
                    <td className={`py-4 px-4 ${styles.text.primary}`}>
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
                    </td>

                    {/* Grow Time */}
                    <td className={`py-4 px-4 ${styles.text.secondary}`}>
                      <span className="font-medium">
                        {vegetable.grow_time} min
                      </span>
                    </td>

                    {/* Buy Price */}
                    <td className={`py-4 px-4 ${styles.text.secondary}`}>
                      <span className="font-medium">
                        {vegetable.buy_price !== null
                          ? vegetable.buy_price.toLocaleString()
                          : 'N/A'}
                      </span>
                    </td>

                    {/* Sell Price */}
                    <td className={`py-4 px-4 ${styles.text.secondary}`}>
                      <span className="font-medium">
                        {vegetable.sell_price !== null &&
                        vegetable.sell_price > 0
                          ? vegetable.sell_price.toLocaleString()
                          : 'N/A'}
                      </span>
                    </td>

                    {/* Used in Potions */}
                    <td className={`py-4 px-4 ${styles.text.secondary}`}>
                      {usedInPotions.length === 0 ? (
                        <span className={styles.text.muted}>None</span>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {usedInPotions.map(potion => (
                            <div
                              key={potion.id}
                              className="flex items-center space-x-2"
                            >
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
  );
};

export default VegetablesPage;
