// src/features/tools/crop-calculator/components/ResultsTable/ResultsTable.tsx
import { useCallback } from 'react';

import { PixelArtImage } from '@/components/PixelArtImage';
import { gameData } from '@/gameData';
import { Styles } from '@/utils/styles';

interface VegetableAnalysis {
  name: string;
  profitPerMinute: number;
  maxPotions: number;
  totalProfitPerCycle: number;
  plotsNeeded: number;
}

interface ResultsTableProps {
  analysis: VegetableAnalysis[];
  bestCrop: VegetableAnalysis | null;
  darkMode: boolean;
  styles: Styles;
}

const RESULTS_TABLE_HEADERS = [
  'Rank',
  'Vegetable',
  'Profit/Minute',
  'Max Potions',
  'Total Profit',
  'Plots Needed',
];

const ResultsTable = ({
  analysis,
  bestCrop,
  darkMode,
  styles,
}: ResultsTableProps) => {
  const renderTableHeader = useCallback(
    (headers: string[]) => (
      <tr className={`border-b-2 ${styles.border}`}>
        {headers.map(header => (
          <th
            key={header}
            className={`text-left py-3 px-3 font-medium ${styles.text.secondary}`}
          >
            {header}
          </th>
        ))}
      </tr>
    ),
    [styles.border, styles.text.secondary]
  );

  // Helper function to format numbers with commas
  const formatNumber = useCallback((num: number, decimals = 0) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }, []);

  // Helper function to get vegetable icon from name using service
  const getVegetableIcon = useCallback((vegetableName: string): string => {
    const vegetables = gameData.getAllVegetables();
    const vegetable = vegetables.find(v => v.name === vegetableName);
    return vegetable?.icon || '';
  }, []);

  return (
    <div className={styles.card}>
      <h2 className={`text-xl font-semibold mb-4 ${styles.text.primary}`}>
        Ranking
      </h2>

      {bestCrop && (
        <div
          className={`mb-6 p-4 rounded-lg border-l-4 ${
            darkMode
              ? 'bg-green-900/20 border-green-400'
              : 'bg-green-100 border-green-500'
          }`}
        >
          <strong>{bestCrop.name}</strong> is the optimal choice with{' '}
          <strong>
            {formatNumber(bestCrop.profitPerMinute, 2)} profit/minute
          </strong>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>{renderTableHeader(RESULTS_TABLE_HEADERS)}</thead>
          <tbody>
            {analysis.map((veg, index) => {
              const vegetableIcon = getVegetableIcon(veg.name);
              
              return (
                <tr
                  key={index}
                  className={`border-b ${
                    darkMode ? 'border-gray-700' : 'border-gray-100'
                  } ${
                    index === 0
                      ? darkMode
                        ? 'bg-green-900/10'
                        : 'bg-green-50'
                      : darkMode
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {/* Rank */}
                  <td className={`py-3 px-3 font-semibold ${styles.text.primary}`}>
                    #{index + 1}
                  </td>

                  {/* Vegetable with Icon */}
                  <td className={`py-3 px-3 ${styles.text.primary}`}>
                    <div className="flex items-center space-x-2">
                      {vegetableIcon && (
                        <PixelArtImage
                          src={vegetableIcon}
                          alt={veg.name}
                          className="w-4 h-4 object-contain"
                        />
                      )}
                      <span className="font-medium">{veg.name}</span>
                    </div>
                  </td>

                  {/* Profit/Minute */}
                  <td className={`py-3 px-3 ${styles.text.accent} font-semibold`}>
                    {formatNumber(veg.profitPerMinute, 2)}
                  </td>

                  {/* Max Potions */}
                  <td className={`py-3 px-3 ${styles.text.secondary}`}>
                    {formatNumber(veg.maxPotions)}
                  </td>

                  {/* Total Profit */}
                  <td className={`py-3 px-3 ${styles.text.secondary}`}>
                    {formatNumber(veg.totalProfitPerCycle)}
                  </td>

                  {/* Plots Needed */}
                  <td className={`py-3 px-3 ${styles.text.secondary}`}>
                    {formatNumber(veg.plotsNeeded, 1)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;