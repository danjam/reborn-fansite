// src/features/tools/crop-calculator/components/VegetableTable/VegetableTable.jsx

import React, { useCallback } from 'react';
import TableInput from '../TableInput/TableInput';

const VegetableTable = ({ 
  vegetables, 
  canRemoveVegetables, 
  darkMode, 
  styles, 
  onUpdateVegetable, 
  onRemoveVegetable, 
  onAddVegetable, 
  onReset 
}) => {
  
  const renderVegetableHeader = useCallback(() => {
    const headerData = [
      { label: 'Name', help: "The vegetable's name" },
      { label: 'Grow Time (min)', help: 'How long it takes to grow the vegetable in minutes' },
      { label: 'Amount Needed', help: 'How many vegetables are needed per potion' },
      { label: 'Potion', help: 'The potion that can be crafted from this vegetable' },
      { label: 'Potion Sell Price', help: 'The amount of coins for selling a single potion' },
      { label: 'Actions', help: null }
    ];

    return (
      <tr className={`border-b ${styles.border}`}>
        {headerData.map(({ label, help }) => (
          <th 
            key={label} 
            className={`text-left py-2 px-2 font-medium ${styles.text.secondary} ${help ? 'cursor-help' : ''}`}
            title={help || undefined}
          >
            {label}
          </th>
        ))}
      </tr>
    );
  }, [styles.border, styles.text.secondary]);

  const getRemoveButtonStyle = () => {
    return canRemoveVegetables 
      ? 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500'
      : 'bg-gray-400 text-gray-600 cursor-not-allowed';
  };

  return (
    <div className={styles.card}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-semibold ${styles.text.primary}`}>
          🥕 Vegetable Details
        </h2>
        <div className="flex space-x-2">
          <button onClick={onReset} className={styles.button.secondary}>
            Reset
          </button>
          <button onClick={onAddVegetable} className={styles.button.primary}>
            + Add Vegetable
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>{renderVegetableHeader()}</thead>
          <tbody>
            {vegetables.map((veg, index) => (
              <tr key={index} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                <td className="py-2 px-2">
                  <TableInput
                    type="text"
                    value={veg.name}
                    onChange={(e) => onUpdateVegetable(index, 'name', e.target.value)}
                    darkMode={darkMode}
                    required
                  />
                </td>
                <td className="py-2 px-2">
                  <TableInput
                    type="number"
                    value={veg.growTime}
                    onChange={(e) => onUpdateVegetable(index, 'growTime', e.target.value)}
                    darkMode={darkMode}
                    min="1"
                  />
                </td>
                <td className="py-2 px-2">
                  <TableInput
                    type="number"
                    value={veg.amountNeeded}
                    onChange={(e) => onUpdateVegetable(index, 'amountNeeded', e.target.value)}
                    darkMode={darkMode}
                    min="1"
                  />
                </td>
                <td className="py-2 px-2">
                  <TableInput
                    type="text"
                    value={veg.potionName}
                    onChange={(e) => onUpdateVegetable(index, 'potionName', e.target.value)}
                    darkMode={darkMode}
                    required
                  />
                </td>
                <td className="py-2 px-2">
                  <TableInput
                    type="number"
                    value={veg.potionPrice}
                    onChange={(e) => onUpdateVegetable(index, 'potionPrice', e.target.value)}
                    darkMode={darkMode}
                    min="1"
                  />
                </td>
                <td className="py-2 px-2">
                  <button
                    onClick={() => onRemoveVegetable(index)}
                    disabled={!canRemoveVegetables}
                    className={`px-2 py-1 rounded text-sm focus:outline-none focus:ring-1 ${getRemoveButtonStyle()}`}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VegetableTable;