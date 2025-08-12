// src/pages/tools/CropCalculatorPage.tsx
import { useMemo, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import { createStyles } from '@/utils/styles';
import { PixelArtImage } from '@/components/PixelArtImage';
import { VEGETABLES, POTIONS } from '@/data';

// Inline utility function - moved from separate file
const createVegetablePotionData = () => {
  const vegetablePotionData: Array<{
    name: string;
    growTime: number;
    amountNeeded: number;
    potionName: string;
    potionPrice: number;
  }> = [];

  // For each vegetable, find which potion uses it
  VEGETABLES.forEach(vegetable => {
    const potion = POTIONS.find(
      potion =>
        potion.materials.some(material => material.id === vegetable.id) &&
        potion.sell_price !== null &&
        potion.sell_price > 0
    );

    if (potion) {
      const materialEntry = potion.materials.find(
        material => material.id === vegetable.id
      );

      if (materialEntry && potion.sell_price !== null) {
        vegetablePotionData.push({
          name: vegetable.name,
          growTime: vegetable.grow_time,
          amountNeeded: materialEntry.quantity,
          potionName: potion.name,
          potionPrice: potion.sell_price,
        });
      }
    }
  });

  return vegetablePotionData;
};

const CropCalculatorPage = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

  // Simple state - like other pages
  const [totalPlots, setTotalPlots] = useState(75);
  const [fertilised, setFertilised] = useState(true);
  const [cauldronLevel, setCauldronLevel] = useState(1);

  // Get actual game data using the existing utility
  const gameVegetables = useMemo(() => createVegetablePotionData(), []);

  // Simple calculations - inline like other pages do
  const vegetablesPerPlot = fertilised ? 2 : 1;
  
  const analysis = useMemo(() => {
    return gameVegetables.map(vegetable => {
      const plotsNeeded = vegetable.amountNeeded / vegetablesPerPlot;
      const maxPotions = Math.floor(totalPlots / plotsNeeded);
      const actualPotions = maxPotions * cauldronLevel;
      const totalProfitPerCycle = actualPotions * vegetable.potionPrice;
      const profitPerMinute = totalProfitPerCycle / vegetable.growTime;
      
      return {
        ...vegetable,
        plotsNeeded,
        maxPotions: actualPotions,
        totalProfitPerCycle,
        profitPerMinute,
      };
    }).sort((a, b) => b.profitPerMinute - a.profitPerMinute);
  }, [gameVegetables, totalPlots, fertilised, cauldronLevel, vegetablesPerPlot]);

  const bestCrop = analysis[0];

  // Helper functions to get icons
  const getVegetableIcon = (vegetableName: string) => {
    const vegetable = VEGETABLES.find(v => v.name === vegetableName);
    return vegetable?.icon;
  };

  const getPotionIcon = (potionName: string) => {
    const potion = POTIONS.find(p => p.name === potionName);
    return potion?.icon;
  };

  const handleReset = () => {
    setTotalPlots(75);
    setFertilised(true);
    setCauldronLevel(1);
  };

  return (
    <div>
      {/* Breadcrumb Navigation - like other pages */}
      <div className="mb-6">
        <nav className="flex items-center space-x-2 text-sm">
          <Link to="/tools" className={`${styles.text.accent} hover:underline`}>
            Tools
          </Link>
          <span className={styles.text.muted}>/</span>
          <span className={styles.text.secondary}>Crop Calculator</span>
        </nav>
      </div>

      {/* Header - consistent with other pages */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-4 ${styles.text.accent}`}>
          🌱 Crop Profit Calculator
        </h1>
        <p className={`text-lg ${styles.text.secondary}`}>
          Calculate optimal crop profits based on your farm configuration
        </p>
      </div>

      {/* Farm Configuration - inline form */}
      <div className={styles.card}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-semibold ${styles.text.primary}`}>
            Farm Configuration
          </h2>
          <button onClick={handleReset} className={styles.button.secondary}>
            Reset
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${styles.text.secondary}`}>
              Total Plots
            </label>
            <input
              type="number"
              min="1"
              value={totalPlots}
              onChange={e => setTotalPlots(Number(e.target.value))}
              className={styles.input}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${styles.text.secondary}`}>
              Cauldron Level
            </label>
            <input
              type="number"
              min="1"
              value={cauldronLevel}
              onChange={e => setCauldronLevel(Number(e.target.value))}
              className={styles.input}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${styles.text.secondary}`}>
              Fertilised
            </label>
            <div className={styles.checkbox}>
              <input
                type="checkbox"
                checked={fertilised}
                onChange={e => setFertilised(e.target.checked)}
                className="w-5 h-5 text-green-600 bg-white border-2 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
              />
              <span className={`text-sm font-medium ${styles.text.secondary}`}>
                {vegetablesPerPlot} vegetable{vegetablesPerPlot > 1 ? 's' : ''} per plot
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className={styles.card}>
        <h2 className={`text-xl font-semibold ${styles.text.primary} mb-4`}>
          Crop Analysis
        </h2>
        
        {/* Best Crop Highlight - integrated into results */}
        {bestCrop && (
          <div className={`${styles.card} border-l-4 border-green-500 mb-4`}>
            <h3 className={`text-lg font-semibold ${styles.text.primary} mb-2`}>
              Best Crop: {bestCrop.name}
            </h3>
            <p className={`${styles.text.secondary}`}>
              Most profitable at <strong>{bestCrop.profitPerMinute.toFixed(2)}</strong> coins per minute
            </p>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${styles.border}`}>
                <th className={`text-left py-3 px-4 font-semibold ${styles.text.primary}`}>
                  Crop
                </th>
                <th className={`text-left py-3 px-4 font-semibold ${styles.text.primary}`}>
                  Grow Time (min)
                </th>
                <th className={`text-left py-3 px-4 font-semibold ${styles.text.primary}`}>
                  Plots Needed
                </th>
                <th className={`text-left py-3 px-4 font-semibold ${styles.text.primary}`}>
                  Max Potions
                </th>
                <th className={`text-left py-3 px-4 font-semibold ${styles.text.primary}`}>
                  Total Profit
                </th>
                <th className={`text-left py-3 px-4 font-semibold ${styles.text.primary}`}>
                  Profit/Min
                </th>
              </tr>
            </thead>
            <tbody>
              {analysis.map((crop, index) => (
                <tr 
                  key={crop.name}
                  className={`border-b ${styles.table.rowBorderBottom} ${
                    index === 0 ? styles.table.overlayGreen : ''
                  }`}
                >
                  <td className={`py-3 px-4 ${styles.text.primary}`}>
                    <div className="flex items-center space-x-2">
                      {getVegetableIcon(crop.name) && (
                        <PixelArtImage
                          src={getVegetableIcon(crop.name)!}
                          alt={crop.name}
                          className="w-5 h-5 object-contain"
                        />
                      )}
                      <span>{crop.name}</span>
                    </div>
                  </td>
                  <td className={`py-3 px-4 ${styles.text.secondary}`}>
                    {crop.growTime}
                  </td>
                  <td className={`py-3 px-4 ${styles.text.secondary}`}>
                    {crop.plotsNeeded.toFixed(1)}
                  </td>
                  <td className={`py-3 px-4 ${styles.text.secondary}`}>
                    {crop.maxPotions}
                  </td>
                  <td className={`py-3 px-4 ${styles.text.secondary}`}>
                    {crop.totalProfitPerCycle.toFixed(0)}
                  </td>
                  <td className={`py-3 px-4 font-semibold ${
                    index === 0 ? styles.text.accent : styles.text.secondary
                  }`}>
                    {crop.profitPerMinute.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reference - simple table like other reference pages */}
      <div className={styles.card}>
        <h2 className={`text-xl font-semibold ${styles.text.primary} mb-4`}>
          Reference
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${styles.border}`}>
                <th className={`text-left py-3 px-4 font-semibold ${styles.text.primary}`}>
                  Vegetable
                </th>
                <th className={`text-left py-3 px-4 font-semibold ${styles.text.primary}`}>
                  Amount Needed
                </th>
                <th className={`text-left py-3 px-4 font-semibold ${styles.text.primary}`}>
                  Potion
                </th>
                <th className={`text-left py-3 px-4 font-semibold ${styles.text.primary}`}>
                  Potion Price
                </th>
              </tr>
            </thead>
            <tbody>
              {gameVegetables.map(vegetable => (
                <tr key={vegetable.name} className={`border-b ${styles.table.rowBorderBottom}`}>
                  <td className={`py-3 px-4 ${styles.text.primary}`}>
                    <div className="flex items-center space-x-2">
                      {getVegetableIcon(vegetable.name) && (
                        <PixelArtImage
                          src={getVegetableIcon(vegetable.name)!}
                          alt={vegetable.name}
                          className="w-5 h-5 object-contain"
                        />
                      )}
                      <span>{vegetable.name}</span>
                    </div>
                  </td>
                  <td className={`py-3 px-4 ${styles.text.secondary}`}>
                    {vegetable.amountNeeded}
                  </td>
                  <td className={`py-3 px-4 ${styles.text.secondary}`}>
                    <div className="flex items-center space-x-2">
                      {getPotionIcon(vegetable.potionName) && (
                        <PixelArtImage
                          src={getPotionIcon(vegetable.potionName)!}
                          alt={vegetable.potionName}
                          className="w-5 h-5 object-contain"
                        />
                      )}
                      <span>{vegetable.potionName}</span>
                    </div>
                  </td>
                  <td className={`py-3 px-4 ${styles.text.secondary}`}>
                    {vegetable.potionPrice}
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

export default CropCalculatorPage;