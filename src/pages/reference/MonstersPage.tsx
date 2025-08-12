import { useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import { PixelArtImage } from '@/components/PixelArtImage';
import { createStyles } from '@/utils/styles';

import type { Monster } from '../../gameData';
import { gameData } from '../../gameData';

const MonstersPage = () => {
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
          <span className={styles.text.secondary}>Monsters</span>
        </nav>
      </div>

      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-4 ${styles.text.accent}`}>
          Monsters
        </h1>
      </div>

      {/* Monsters Table */}
      <div className={styles.card}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b-2 ${styles.border}`}>
                <th
                  className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[140px]`}
                >
                  Monster
                </th>
                <th
                  className={`text-left py-3 px-3 font-medium ${styles.text.secondary} min-w-[120px]`}
                >
                  Loot Drops
                </th>
                <th
                  className={`text-left py-3 px-2 font-medium ${styles.text.secondary} min-w-[80px]`}
                >
                  Floor(s)
                </th>
              </tr>
            </thead>
            <tbody>
              {gameData.getAllMonsters().map((monster: Monster) => {
                // Get all drops for this monster using the service
                const monsterDrops = gameData.getDropsByMonsterId(monster.id);

                return (
                  <tr
                    key={monster.id}
                    className={`border-b ${styles.table.rowBorderBottom}`}
                  >
                    {/* Monster Name & Icon */}
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <PixelArtImage
                          src={monster.icon}
                          alt={monster.name}
                          className="w-16 h-16 object-contain"
                        />
                        <span
                          className={`font-semibold ${styles.text.primary}`}
                        >
                          {monster.name}
                          {monster.boss && (
                            <span className="ml-2 text-[10px] bg-red-500 text-white px-1 py-0.5 rounded-full">
                              BOSS
                            </span>
                          )}
                        </span>
                      </div>
                    </td>

                    {/* Loot Drops */}
                    <td className={`py-4 px-3 ${styles.text.secondary}`}>
                      {monsterDrops.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {monsterDrops.map(drop => (
                            <div
                              key={drop.id}
                              className="flex items-center space-x-2"
                            >
                              <PixelArtImage
                                src={drop.icon}
                                alt={drop.name}
                                className="w-4 h-4 object-contain"
                              />
                              <span className="text-sm">{drop.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>

                    {/* Floor(s) */}
                    <td className="py-4 px-2">
                      <span className={styles.text.primary}>
                        {monster.displayFloors()}
                      </span>
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

export default MonstersPage;
