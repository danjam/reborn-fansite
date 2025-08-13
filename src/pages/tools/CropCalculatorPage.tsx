// src/pages/tools/CropCalculatorPage.tsx
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import HighlightCard from '@/components/HighlightCard';
import { PixelArtImage } from '@/components/PixelArtImage';
import { gameData } from '@/gameData';
import { useStyles } from '@/hooks';

const CropCalculatorPage = () => {
  const { styles } = useStyles();

  // Simple state - like other pages
  const [totalPlots, setTotalPlots] = useState(75);
  const [fertilised, setFertilised] = useState(true);
  const [cauldronLevel, setCauldronLevel] = useState(1);

  // Get vegetable-potion data from the game data service
  const gameVegetables = useMemo(() => gameData.getVegetablePotionData(), []);

  // Simple calculations - inline like other pages do
  const vegetablesPerPlot = fertilised ? 3 : 2;

  const analysis = useMemo(() => {
    return gameVegetables
      .map(vegetable => {
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
      })
      .sort((a, b) => b.profitPerMinute - a.profitPerMinute);
  }, [gameVegetables, totalPlots, cauldronLevel, vegetablesPerPlot]);

  const bestCrop = analysis[0];

  // Helper functions to get icons using the game data service
  const getVegetableIcon = (vegetableName: string) => {
    const vegetable = gameData
      .getAllVegetables()
      .find(v => v.name === vegetableName);
    return vegetable?.icon;
  };

  const getPotionIcon = (potionName: string) => {
    const potion = gameData.getAllPotions().find(p => p.name === potionName);
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
          Crop Profit Calculator
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
            <label
              className={`block text-sm font-medium mb-2 ${styles.text.secondary}`}
            >
              Total Plots
            </label>
            <input
              type="number"
              value={totalPlots}
              onChange={e => setTotalPlots(Number(e.target.value))}
              className={styles.input}
              min="1"
              max="1000"
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 ${styles.text.secondary}`}
            >
              Cauldron Level
            </label>
            <input
              type="number"
              value={cauldronLevel}
              onChange={e => setCauldronLevel(Number(e.target.value))}
              className={styles.input}
              min="1"
              max="10"
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 ${styles.text.secondary}`}
            >
              Fertilised
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={fertilised}
                onChange={e => setFertilised(e.target.checked)}
                className="mr-2"
              />
              <span className={styles.text.secondary}>
                {fertilised ? '3' : '2'} vegetable{fertilised ? 's' : ''} per
                plot
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className={styles.card}>
        <h2 className={`text-xl font-semibold ${styles.text.primary} mb-4`}>
          Crop Analysis
        </h2>

        {/* Best Crop Highlight */}
        {bestCrop && getVegetableIcon(bestCrop.name) && (
          <HighlightCard
            icon={getVegetableIcon(bestCrop.name)!}
            iconAlt={bestCrop.name}
            title={`Best Crop: ${bestCrop.name}`}
            content={`Most profitable at **${bestCrop.profitPerMinute.toFixed(2)}** coins per minute`}
          />
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${styles.border}`}>
                <th
                  scope="col"
                  className={`text-left py-3 px-4 font-semibold ${styles.text.primary}`}
                >
                  Crop
                </th>
                <th
                  scope="col"
                  className={`text-left py-3 px-4 font-semibold ${styles.text.primary}`}
                >
                  Grow Time (min)
                </th>
                <th
                  scope="col"
                  className={`text-left py-3 px-4 font-semibold ${styles.text.primary}`}
                >
                  Plots Needed
                </th>
                <th
                  scope="col"
                  className={`text-left py-3 px-4 font-semibold ${styles.text.primary}`}
                >
                  Max Potions
                </th>
                <th
                  scope="col"
                  className={`text-left py-3 px-4 font-semibold ${styles.text.primary}`}
                >
                  Total Profit
                </th>
                <th
                  scope="col"
                  className={`text-left py-3 px-4 font-semibold ${styles.text.primary}`}
                >
                  Profit/Min
                </th>
                <th
                  scope="col"
                  className={`text-left py-3 px-4 font-semibold ${styles.text.primary}`}
                >
                  Makes
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
                  <td
                    className={`py-3 px-4 font-semibold ${
                      index === 0 ? styles.text.accent : styles.text.secondary
                    }`}
                  >
                    {crop.profitPerMinute.toFixed(2)}
                  </td>
                  <td className={`py-3 px-4 ${styles.text.secondary}`}>
                    <div className="flex items-center space-x-2">
                      {getPotionIcon(crop.potionName) && (
                        <PixelArtImage
                          src={getPotionIcon(crop.potionName)!}
                          alt={crop.potionName}
                          className="w-5 h-5 object-contain"
                        />
                      )}
                      <span>{crop.potionName}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Information Table Section */}
      <div className={styles.card}>
        <h2 className={`text-xl font-semibold ${styles.text.primary} mb-4`}>
          Vegetable Information
        </h2>
        <p className={`text-sm ${styles.text.muted} mb-4`}>
          Base stats for each vegetable and their corresponding potions
        </p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${styles.border}`}>
                <th
                  scope="col"
                  className={`text-left py-3 px-4 font-semibold ${styles.text.primary}`}
                >
                  Vegetable
                </th>
                <th
                  scope="col"
                  className={`text-left py-3 px-4 font-semibold ${styles.text.primary}`}
                >
                  Grow Time (min)
                </th>
                <th
                  scope="col"
                  className={`text-left py-3 px-4 font-semibold ${styles.text.primary}`}
                >
                  Amount Needed
                </th>
                <th
                  scope="col"
                  className={`text-left py-3 px-4 font-semibold ${styles.text.primary}`}
                >
                  Makes Potion
                </th>
                <th
                  scope="col"
                  className={`text-left py-3 px-4 font-semibold ${styles.text.primary}`}
                >
                  Potion Price
                </th>
              </tr>
            </thead>
            <tbody>
              {gameVegetables.map(vegetable => (
                <tr
                  key={vegetable.name}
                  className={`border-b ${styles.table.rowBorderBottom}`}
                >
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
                    {vegetable.growTime}
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
