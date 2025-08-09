// src/pages/reference/PotionsPage.tsx
import { useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import { POTION_RECIPES, PotionRecipe } from '@/data/potion_recipes';
import { createStyles } from '@/utils/styles';
import { katie } from '@/assets/img';

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
                  className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[200px]`}
                >
                  Effect
                </th>
                <th
                  className={`py-3 px-3 font-medium ${styles.text.secondary} min-w-[100px] ${
                    styles.table.overlayRed
                  } border-r border-red-300/30`}
                >
                  <div className="flex items-center justify-center">
                    <span className="mr-2">🩸</span>
                    <span>Monster Loot</span>
                  </div>
                </th>
                <th
                  className={`py-3 px-2 font-medium ${styles.text.secondary} min-w-[60px] ${
                    styles.table.overlayRed
                  }`}
                >
                  #
                </th>
                <th
                  className={`py-3 px-3 font-medium ${styles.text.secondary} min-w-[100px] ${
                    styles.table.overlayGreen
                  } border-r border-green-300/30`}
                >
                  <div className="flex items-center justify-center">
                    <span className="mr-2">🥕</span>
                    <span>Vegetable</span>
                  </div>
                </th>
                <th
                  className={`py-3 px-2 font-medium ${styles.text.secondary} min-w-[60px] ${
                    styles.table.overlayGreen
                  }`}
                >
                  #
                </th>
                <th
                  className={`py-3 px-3 font-medium ${styles.text.secondary} min-w-[100px] ${
                    styles.table.overlayPurple
                  } border-r border-purple-300/30`}
                >
                  <div className="flex items-center justify-center">
                    <span className="mr-2">🫙</span>
                    <span>Container</span>
                  </div>
                </th>
                <th
                  className={`py-3 px-2 font-medium ${styles.text.secondary} min-w-[60px] ${
                    styles.table.overlayPurple
                  }`}
                >
                  #
                </th>
              </tr>
            </thead>
            <tbody>
              {POTION_RECIPES.map((potion: PotionRecipe) => (
                <tr
                  key={potion.id}
                  className={`border-b ${styles.table.rowBorderBottom}`}
                >
                  {/* Potion Name & Icon */}
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={potion.icon}
                        alt={potion.name}
                        // className="w-8 h-8 md:w-10 md:h-10 object-contain"
                      />
                      <span className={`font-semibold ${styles.text.primary}`}>
                        {potion.name}
                      </span>
                    </div>
                  </td>

                  {/* Effect Description */}
                  <td className={`py-4 px-4 ${styles.text.secondary}`}>
                    {potion.effect}
                  </td>

                  {/* Monster Loot Item */}
                  <td
                    className={`py-4 px-3 text-center ${
                      styles.table.overlayRed
                    } border-r border-red-300/30`}
                  >
                    <div className={styles.text.secondary}>
                      <p className="font-medium">{potion.monsterLoot.item}</p>
                      <p className="text-sm opacity-75">
                        from{' '}
                        <a
                          href="#"
                          className={`${styles.text.accent} hover:underline`}
                        >
                          {potion.monsterLoot.source}
                        </a>
                      </p>
                    </div>
                  </td>

                  {/* Monster Loot Quantity */}
                  <td
                    className={`py-4 px-2 text-center ${
                      styles.table.overlayRed
                    }`}
                  >
                    <span
                      className={`font-bold text-lg ${styles.text.primary}`}
                    >
                      {potion.monsterLoot.amount}x
                    </span>
                  </td>

                  {/* Vegetable Item */}
                  <td
                    className={`py-4 px-3 text-center ${
                      styles.table.overlayGreen
                    } border-r border-green-300/30`}
                  >
                    <div className={styles.text.secondary}>
                      <a
                        href="#"
                        className={`font-medium ${styles.text.accent} hover:underline`}
                      >
                        {potion.vegetable.item}
                      </a>
                      <p className="text-sm opacity-75">
                        {potion.vegetable.growTime}
                      </p>
                    </div>
                  </td>

                  {/* Vegetable Quantity */}
                  <td
                    className={`py-4 px-2 text-center ${
                      styles.table.overlayGreen
                    }`}
                  >
                    <span
                      className={`font-bold text-lg ${styles.text.primary}`}
                    >
                      {potion.vegetable.amount}x
                    </span>
                  </td>

                  {/* Container Item */}
                  <td
                    className={`py-4 px-3 text-center ${
                      styles.table.overlayPurple
                    } border-r border-purple-300/30`}
                  >
                    <div className={styles.text.secondary}>
                      <a
                        href="#"
                        className={`font-medium ${styles.text.accent} hover:underline`}
                      >
                        {potion.container.item}
                      </a>
                    </div>
                  </td>

                  {/* Container Quantity */}
                  <td
                    className={`py-4 px-2 text-center ${
                      styles.table.overlayPurple
                    }`}
                  >
                    <span
                      className={`font-bold text-lg ${styles.text.primary}`}
                    >
                      {potion.container.amount}x
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PotionsPage;
