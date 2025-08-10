import { useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import { MONSTERS_DATA, Monster } from '@/data/monsters';
import { createStyles } from '@/utils/styles';

const displayFloors = (numbers: number[]): string => {
  if (numbers.length === 0) return '';

  const sorted = [...numbers].sort((a, b) => a - b);
  const result: string[] = [];
  let rangeStart = 0;

  for (let i = 0; i < sorted.length; i++) {
    if (i === sorted.length - 1 || sorted[i + 1]! !== sorted[i]! + 1) {
      const rangeLength = i - rangeStart + 1;

      if (rangeLength >= 3) {
        result.push(`${sorted[rangeStart]!}-${sorted[i]!}`);
      } else {
        for (let j = rangeStart; j <= i; j++) {
          result.push(sorted[j]!.toString());
        }
      }

      rangeStart = i + 1;
    }
  }

  return result.join(', ');
};

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
                  Loot Drop
                </th>
                <th
                  className={`text-left py-3 px-2 font-medium ${styles.text.secondary} min-w-[80px]`}
                >
                  Floor(s)
                </th>
              </tr>
            </thead>
            <tbody>
              {MONSTERS_DATA.map((monster: Monster) => (
                <tr
                  key={monster.id}
                  className={`border-b ${
                    styles.table.rowBorderBottom
                  } ${monster.boss ? styles.table.rowDanger : ''}`}
                >
                  {/* Monster Name & Icon */}
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={monster.icon}
                        alt={monster.name}
                        className="w-16 h-16 object-contain"
                      />
                      <span
                        className={`font-semibold ${styles.text.primary} ${monster.boss ? 'text-red-500' : ''}`}
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

                  {/* Loot Drop */}
                  <td className="py-4 px-3">
                    {monster.lootDrop === null ? (
                      'n/a'
                    ) : (
                      <a
                        href="#"
                        className={`font-medium ${styles.text.accent} hover:underline`}
                      >
                        {monster.lootDrop}
                      </a>
                    )}
                  </td>

                  {/* Floor(s) */}
                  <td className="py-4 px-2">
                    <span className={`font-bold ${styles.text.primary}`}>
                      {displayFloors(monster.floors)}
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

export default MonstersPage;
