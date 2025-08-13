// src/pages/reference/PotionsPage.tsx
import { Link } from 'react-router-dom';

import MaterialsList from '@/components/MaterialsList';
import { PixelArtImage } from '@/components/PixelArtImage';
import { useStyles } from '@/hooks';
import { categorizeMaterials } from '@/utils/gameObjectHelpers';

import type { Potion } from '../../gameData';
import { gameData } from '../../gameData';

const PotionsPage = () => {
  const { styles } = useStyles();

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
        <p className={`text-lg ${styles.text.secondary}`}>
          Complete list of all potions and their required ingredients for
          crafting.
        </p>
      </div>

      {/* Potions Table */}
      <div className={styles.card}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b-2 ${styles.border}`}>
                <th
                  scope="col"
                  className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[200px]`}
                >
                  Potion
                </th>
                <th
                  scope="col"
                  className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[180px]`}
                >
                  Effect
                </th>
                <th
                  scope="col"
                  className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[80px]`}
                >
                  Sell Price
                </th>
                <th
                  scope="col"
                  className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[250px]`}
                >
                  Materials Required
                </th>
              </tr>
            </thead>
            <tbody>
              {gameData.getAllPotions().map((potion: Potion) => {
                const categorizedMaterials = categorizeMaterials(
                  potion.materials
                );

                return (
                  <tr key={potion.id} className={`border-b ${styles.border}`}>
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
                          ? `${potion.sell_price?.toLocaleString()} gold`
                          : 'Cannot sell'}
                      </span>
                    </td>

                    {/* Materials Required */}
                    <td className={`py-4 px-4 ${styles.text.secondary}`}>
                      <div className="space-y-2">
                        {/* Containers */}
                        {categorizedMaterials.containers.length > 0 && (
                          <MaterialsList
                            materials={categorizedMaterials.containers}
                            variant="purple"
                          />
                        )}

                        {/* Vegetables */}
                        {categorizedMaterials.vegetables.length > 0 && (
                          <MaterialsList
                            materials={categorizedMaterials.vegetables}
                            variant="green"
                          />
                        )}

                        {/* Monster Loot */}
                        {categorizedMaterials.monsterLoot.length > 0 && (
                          <MaterialsList
                            materials={categorizedMaterials.monsterLoot}
                            variant="red"
                          />
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
