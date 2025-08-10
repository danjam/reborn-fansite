// src/features/tools/crop-calculator/components/VegetablePotionTable/VegetablePotionTable.tsx
import { useMemo } from 'react';

import { PixelArtImage } from '@/components/PixelArtImage';
import { POTIONS, VEGETABLES } from '@/data';
import { createVegetablePotionData } from '../../utils/vegetable-potion-mapping';

interface VegetablePotionTableProps {
  darkMode?: boolean;
}

const VegetablePotionTable = ({
  darkMode = false,
}: VegetablePotionTableProps) => {
  const vegetablePotionData = useMemo(() => createVegetablePotionData(), []);

  // Helper function to get vegetable emoji from name
  const getVegetableIcon = (vegetableName: string): string => {
    const vegetable = VEGETABLES.find(v => v.name === vegetableName);
    return vegetable?.icon || '🥬';
  };

  // Helper function to get potion image from name
  const getPotionIcon = (potionName: string) => {
    const potion = POTIONS.find(p => p.name === potionName);
    return potion?.icon;
  };

  const tableStyles = {
    container: darkMode
      ? 'bg-gray-800 border-gray-700'
      : 'bg-white border-gray-200',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
    headerText: darkMode ? 'text-gray-300' : 'text-gray-600',
    cellText: darkMode ? 'text-gray-200' : 'text-gray-900',
    accent: darkMode ? 'text-green-400' : 'text-green-600',
  };

  return (
    <div className={`border rounded-lg p-6 ${tableStyles.container}`}>
      <h2 className={`text-xl font-semibold mb-4 ${tableStyles.cellText}`}>
        Vegetable & Potion Data
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`border-b-2 ${tableStyles.border}`}>
              <th
                className={`text-left py-3 px-4 font-medium ${tableStyles.headerText}`}
              >
                Vegetable
              </th>
              <th
                className={`text-left py-3 px-4 font-medium ${tableStyles.headerText}`}
              >
                Grow Time
              </th>
              <th
                className={`text-left py-3 px-4 font-medium ${tableStyles.headerText}`}
              >
                Amount Needed
              </th>
              <th
                className={`text-left py-3 px-4 font-medium ${tableStyles.headerText}`}
              >
                Potion
              </th>
              <th
                className={`text-left py-3 px-4 font-medium ${tableStyles.headerText}`}
              >
                Sell Price
              </th>
            </tr>
          </thead>
          <tbody>
            {vegetablePotionData.map((item, index) => (
              <tr
                key={index}
                className={`border-b ${tableStyles.border} hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
              >
                <td className={`py-3 px-4 ${tableStyles.cellText}`}>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {getVegetableIcon(item.name)}
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </div>
                </td>
                <td className={`py-3 px-4 ${tableStyles.cellText}`}>
                  {item.growTime} min
                </td>
                <td className={`py-3 px-4 ${tableStyles.cellText}`}>
                  {item.amountNeeded}
                </td>
                <td className={`py-3 px-4 ${tableStyles.cellText}`}>
                  <div className="flex items-center space-x-2">
                    {getPotionIcon(item.potionName) && (
                      <PixelArtImage
                        src={getPotionIcon(item.potionName)!}
                        alt={item.potionName}
                        className="w-4 h-4"
                      />
                    )}
                    <span className="font-medium">{item.potionName}</span>
                  </div>
                </td>
                <td className={`py-3 px-4 ${tableStyles.accent} font-semibold`}>
                  {item.potionPrice.toLocaleString()} coins
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VegetablePotionTable;
