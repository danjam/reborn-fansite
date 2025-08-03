import { useMemo } from 'react';
import { useCropCalculator } from './hooks/useCropCalculator';
import { createStyles } from '../../../utils/styles.ts';
import FarmConfig from './components/FarmConfig/FarmConfig';
import VegetableTable from './components/VegetableTable/VegetableTable';
import ResultsTable from './components/ResultsTable/ResultsTable';

const VegetableProfitCalculator = ({ darkMode = false }) => {
  
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

  return (
    <div className={`max-w-6xl mx-auto p-6 min-h-screen ${styles.bg.primary}`}>
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${styles.text.accent}`}>
          🌱 Crop Profit Calculator
        </h1>
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