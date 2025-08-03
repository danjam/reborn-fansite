// src/features/tools/crop-calculator/VegetableProfitCalculator.jsx

import React, { useState, useMemo, useCallback } from 'react';
import { useCropCalculator } from './hooks/useCropCalculator';
import { createStyles } from '../../../utils/styles';
import FarmConfig from './components/FarmConfig/FarmConfig';
import VegetableTable from './components/VegetableTable/VegetableTable';
import ResultsTable from './components/ResultsTable/ResultsTable';

const VegetableProfitCalculator = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  const {
    farmConfig,
    vegetables,
    vegetablesPerPlot,
    canRemoveVegetables,
    analysis,
    bestCrop,
    updateFarmConfig,
    updateCauldronLevel,
    toggleFertilised,
    updateVegetable,
    addVegetable,
    removeVegetable,
    resetToInitial
  } = useCropCalculator();

  // Generate consistent styles
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);
  
  const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), []);

  return (
    <div className={`max-w-6xl mx-auto p-6 min-h-screen ${styles.bg.primary}`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className={`text-3xl font-bold ${styles.text.accent}`}>
          🌱 Crop Profit Calculator
        </h1>
        <button onClick={toggleDarkMode} className={styles.button.darkToggle}>
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      {/* Farm Configuration Section */}
      <FarmConfig
        farmConfig={farmConfig}
        vegetablesPerPlot={vegetablesPerPlot}
        onUpdateFarmConfig={updateFarmConfig}
        onUpdateCauldronLevel={updateCauldronLevel}
        onToggleFertilised={toggleFertilised}
        styles={styles}
      />

      {/* Vegetable Configuration Section */}
      <VegetableTable
        vegetables={vegetables}
        canRemoveVegetables={canRemoveVegetables}
        darkMode={darkMode}
        styles={styles}
        onUpdateVegetable={updateVegetable}
        onRemoveVegetable={removeVegetable}
        onAddVegetable={addVegetable}
        onReset={resetToInitial}
      />

      {/* Results Section */}
      <ResultsTable
        analysis={analysis}
        bestCrop={bestCrop}
        darkMode={darkMode}
        styles={styles}
      />
    </div>
  );
};

export default VegetableProfitCalculator;