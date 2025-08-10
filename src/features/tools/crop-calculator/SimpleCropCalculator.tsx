// src/features/tools/crop-calculator/SimpleCropCalculator.tsx
import { useMemo } from 'react';

import { createStyles } from '@/utils/styles';

import FarmConfig from './components/FarmConfig/FarmConfig';
import ResultsTable from './components/ResultsTable/ResultsTable';
import VegetablePotionTable from './components/VegetablePotionTable/VegetablePotionTable';
import { useSimpleCropCalculator } from './hooks/useSimpleCropCalculator';

interface SimpleCropCalculatorProps {
  darkMode?: boolean;
}

const SimpleCropCalculator = ({
  darkMode = false,
}: SimpleCropCalculatorProps) => {
  const {
    farmConfig,
    vegetablesPerPlot,
    analysis,
    bestCrop,
    updateFarmConfig,
    updateCauldronLevel,
    toggleFertilised,
    resetToInitial,
  } = useSimpleCropCalculator();

  // Generate consistent styles
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

  return (
    <div className={`max-w-6xl mx-auto p-6 min-h-screen ${styles.bg.primary}`}>
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${styles.text.accent}`}>
          Crop Profit Calculator
        </h1>
        <p className={`mt-2 ${styles.text.secondary}`}>
          Calculate optimal crop profits based on your farm configuration
        </p>
      </div>

      {/* Farm Configuration Section */}
      <div className="mb-6">
        <FarmConfig
          farmConfig={farmConfig}
          vegetablesPerPlot={vegetablesPerPlot}
          onUpdateFarmConfig={updateFarmConfig}
          onUpdateCauldronLevel={updateCauldronLevel}
          onToggleFertilised={toggleFertilised}
          onReset={resetToInitial}
          styles={styles}
        />
      </div>

      {/* Results Section */}
      <div className="mb-6">
        <ResultsTable
          analysis={analysis}
          bestCrop={bestCrop}
          darkMode={darkMode}
          styles={styles}
        />
      </div>

      {/* Vegetable & Potion Data Section */}
      <div className="mb-6">
        <VegetablePotionTable darkMode={darkMode} />
      </div>
    </div>
  );
};

export default SimpleCropCalculator;
