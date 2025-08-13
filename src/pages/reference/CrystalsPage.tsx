import { useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import { PixelArtImage } from '@/components/PixelArtImage';
import { createStyles } from '@/utils/styles';

import type { Crystal } from '../../gameData';
import { gameData } from '../../gameData';

const CrystalsPage = () => {
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
          <span className={styles.text.secondary}>Crystals</span>
        </nav>
      </div>

      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-4 ${styles.text.accent}`}>
          Crystals
        </h1>
        <p className={`text-lg ${styles.text.secondary}`}>
          Complete list of all crystals and their effects.
        </p>
      </div>

      {/* Crystals Table */}
      <div className={styles.card}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b-2 ${styles.border}`}>
                <th
                  className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[200px]`}
                >
                  Crystal
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
              </tr>
            </thead>
            <tbody>
              {gameData.getAllCrystals().map((crystal: Crystal) => (
                <tr key={crystal.id} className={`border-b ${styles.border}`}>
                  {/* Crystal Name and Icon */}
                  <td className={`py-4 px-4 ${styles.text.primary}`}>
                    <div className="flex items-center space-x-3">
                      <PixelArtImage
                        src={crystal.icon}
                        alt={crystal.name}
                        className="w-16 h-16 object-contain"
                      />
                      <Link
                        to={`/data/crystals/${crystal.id}`}
                        className={`font-medium ${styles.text.primary} hover:underline`}
                      >
                        {crystal.name}
                      </Link>
                    </div>
                  </td>

                  {/* Effect */}
                  <td className={`py-4 px-4 ${styles.text.secondary}`}>
                    <span className="text-sm">{crystal.effect}</span>
                  </td>

                  {/* Sell Price */}
                  <td className={`py-4 px-4 ${styles.text.secondary}`}>
                    <span className="font-medium">
                      {crystal.sell_price !== null
                        ? `${crystal.sell_price?.toLocaleString()} gold`
                        : 'Cannot sell'}
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

export default CrystalsPage;
