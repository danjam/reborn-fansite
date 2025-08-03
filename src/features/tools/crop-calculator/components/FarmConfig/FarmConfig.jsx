// src/features/tools/crop-calculator/components/FarmConfig/FarmConfig.jsx

import React from 'react';

const FarmConfig = ({ 
  farmConfig, 
  vegetablesPerPlot, 
  onUpdateFarmConfig, 
  onUpdateCauldronLevel, 
  onToggleFertilised, 
  styles 
}) => {
  return (
    <div className={styles.card}>
      <h2 className={`text-xl font-semibold mb-4 ${styles.text.primary}`}>
        👨‍🌾 Farm Configuration
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label 
            className={`block text-sm font-medium mb-2 ${styles.text.secondary} cursor-help`}
            title="Total number of spaces to grow crops in your farm"
          >
            Total Plots
          </label>
          <input
            type="number"
            min="1"
            value={farmConfig.totalPlots}
            onChange={(e) => onUpdateFarmConfig('totalPlots', e.target.value)}
            className={styles.input}
          />
        </div>
        <div>
          <label 
            className={`block text-sm font-medium mb-2 ${styles.text.secondary} cursor-help`}
            title="Multiplier applied from your house, increases the number of potions created"
          >
            Cauldron Level
          </label>
          <input
            type="number"
            min="1"
            value={farmConfig.cauldronLevel}
            onChange={(e) => onUpdateCauldronLevel(e.target.value)}
            className={styles.input}
          />
        </div>
        <div>
          <label 
            className={`block text-sm font-medium mb-2 ${styles.text.secondary} cursor-help`}
            title="Whether your plots are fertilised"
          >
            Fertilised
          </label>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              checked={farmConfig.fertilised}
              onChange={(e) => onToggleFertilised(e.target.checked)}
              className="w-5 h-5 text-green-600 bg-white border-2 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
            />
            <span className={`text-sm font-medium ${styles.text.secondary}`}>
              {vegetablesPerPlot} vegetable{vegetablesPerPlot > 1 ? 's' : ''} per plot
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmConfig;