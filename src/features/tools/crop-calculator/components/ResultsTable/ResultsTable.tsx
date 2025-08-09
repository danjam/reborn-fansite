// src/features/tools/crop-calculator/components/ResultsTable/ResultsTable.tsx
import { useCallback } from 'react';

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

  return (
    <div className={styles.card}>
      <h2 className={`text-xl font-semibold mb-4 ${styles.text.primary}`}>
        🏆 Ranking
      </h2>

      {bestCrop && (
        <div
          className={`mb-6 p-4 rounded-lg border-l-4 ${
            darkMode
              ? 'bg-green-900/20 border-green-400'
              : 'bg-green-100 border-green-500'
          }`}
        >
          💡 <strong>{bestCrop.name}</strong> is the optimal choice with{' '}
          <strong>
            {formatNumber(bestCrop.profitPerMinute, 2)} profit/minute
          </strong>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>{renderTableHeader(RESULTS_TABLE_HEADERS)}</thead>
          <tbody>
            {analysis.map((veg, index) => (
              <tr
                key={index}
                className={`border-b ${
                  darkMode ? 'border-gray-700' : 'border-gray-100'
                } ${
                  index === 0
                    ? darkMode
                      ? 'bg-green-900/30'
                      : 'bg-green-50'
                    : ''
                }`}
              >
                <td
                  className={`py-3 px-3 font-semibold ${styles.text.primary}`}
                >
                  {index + 1}
                </td>
                <td className={`py-3 px-3 font-medium ${styles.text.primary}`}>
                  {veg.name}
                </td>
                <td className={`py-3 px-3 font-semibold ${styles.text.accent}`}>
                  {formatNumber(veg.profitPerMinute, 2)}
                </td>
                <td className={`py-3 px-3 ${styles.text.secondary}`}>
                  {formatNumber(veg.maxPotions)}
                </td>
                <td className={`py-3 px-3 ${styles.text.secondary}`}>
                  {formatNumber(veg.totalProfitPerCycle)}
                </td>
                <td className={`py-3 px-3 ${styles.text.secondary}`}>
                  {formatNumber(veg.plotsNeeded, 1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
