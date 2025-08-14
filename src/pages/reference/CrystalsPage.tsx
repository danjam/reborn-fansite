// src/pages/reference/CrystalsPage.tsx
import { Link } from 'react-router-dom';

import { PixelArtImage } from '@/components/PixelArtImage';
import { useStyles } from '@/hooks';

import type { Crystal } from '../../gameData';
import { gameData } from '../../gameData';
import Breadcrumb from '@/components/Breadcrumb';

const CrystalsPage = () => {
  const { styles } = useStyles();

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <Breadcrumb />

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
                  scope="col"
                  className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[200px]`}
                >
                  Crystal
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
