// src/features/tools/crop-calculator/components/ResultsTable/ResultsTable.tsx

import React, { useCallback } from 'react';
import { TABLE_HEADERS } from '../../data/vegetables';

const ResultsTable = ({ analysis, bestCrop, darkMode, styles }) => {
  
  const renderTableHeader = useCallback((headers) => (
    <tr className={`border-b-2 ${styles.border}`}>
      {headers.map(header => (
        <th key={header} className={`text-left py-3 px-3 font-medium ${styles.text.secondary}`}>
          {header}
        </th>
      ))}
    </tr>
  ), [styles.border, styles.text.secondary]);

  return (
    <div className={styles.card}>
      <h2 className={`text-xl font-semibold mb-4 ${styles.text.primary}`}>
        🏆 RANKING: Best crops for maximum profit
      </h2>
      
      {bestCrop && (
        <div className={`mb-6 p-4 rounded-lg border-l-4 ${
          darkMode ? 'bg-green-900/20 border-green-400' : 'bg-green-100 border-green-500'
        }`}>
          <h3 className={`text-lg font-semibold mb-2 ${styles.text.accent}`}>
            💡 Key Insights:
          </h3>
          <ul className={`space-y-1 ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
            <li>• <strong>{bestCrop.name}</strong> is the optimal choice with <strong>{bestCrop.profitPerMinute.toFixed(2)} profit/minute</strong></li>
            <li>• Optimizes both growth time and space efficiency</li>
            <li>• Strategy: Plant only <strong>{bestCrop.name.toLowerCase()}s</strong> for maximum profit!</li>
          </ul>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>{renderTableHeader(TABLE_HEADERS.results)}</thead>
          <tbody>
            {analysis.map((veg, index) => (
              <tr key={index} className={`border-b ${
                darkMode ? 'border-gray-700' : 'border-gray-100'
              } ${
                index === 0 ? (darkMode ? 'bg-green-900/30' : 'bg-green-50') : ''
              }`}>
                <td className={`py-3 px-3 font-semibold ${styles.text.primary}`}>{index + 1}</td>
                <td className={`py-3 px-3 font-medium ${styles.text.primary}`}>{veg.name}</td>
                <td className={`py-3 px-3 font-semibold ${styles.text.accent}`}>{veg.profitPerMinute.toFixed(2)}</td>
                <td className={`py-3 px-3 ${styles.text.secondary}`}>{veg.maxPotions}</td>
                <td className={`py-3 px-3 ${styles.text.secondary}`}>{veg.totalProfitPerCycle.toLocaleString()}</td>
                <td className={`py-3 px-3 ${styles.text.secondary}`}>{veg.plotsNeeded.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;