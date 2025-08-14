// src/pages/tools/CropCalculatorPage.tsx
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { CropProfitChart } from '@/components/charts/CropProfitChart';
import HighlightCard from '@/components/HighlightCard';
import PageHeader from '@/components/PageHeader';
import { PixelArtImage } from '@/components/PixelArtImage';
import Table, { type Column } from '@/components/Table';
import { gameData } from '@/gameData';
import { useGameSettings, useStyles } from '@/hooks';

// Type for vegetable data from game data service
type VegetableData = {
  name: string;
  growTime: number;
  amountNeeded: number;
  potionName: string;
  potionPrice: number;
};

const CropCalculatorPage = () => {
  const { styles } = useStyles();
  const { settings } = useGameSettings();

  // Simple state - like other pages
  const [totalPlots, setTotalPlots] = useState(75);
  const [fertilised, setFertilised] = useState(true);
  const [cauldronLevel, setCauldronLevel] = useState(
    settings.houseMultipliers.cauldron
  );

  // Get vegetable-potion data from the game data service
  const gameVegetables = useMemo(() => gameData.getVegetablePotionData(), []);

  // Simple calculations - inline like other pages do
  const vegetablesPerPlot = fertilised ? 2 : 1;

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

  // Column definitions for crop analysis results table (no sorting)
  const resultsColumns: Column<(typeof analysis)[0]>[] = [
    {
      header: 'Crop',
      render: (crop, index) => (
        <div
          className={`flex items-center space-x-2 ${index === 0 ? styles.text.accent : styles.text.primary}`}
        >
          {getVegetableIcon(crop.name) && (
            <PixelArtImage
              src={getVegetableIcon(crop.name)!}
              alt={crop.name}
              className="w-4 h-4 object-contain"
            />
          )}
          <Link to="/reference/vegetables" className="hover:underline">
            {crop.name}
          </Link>
        </div>
      ),
    },
    {
      header: 'Grow Time (min)',
      render: (crop, index) => (
        <span
          className={index === 0 ? styles.text.accent : styles.text.secondary}
        >
          {crop.growTime}
        </span>
      ),
    },
    {
      header: 'Plots Needed',
      render: (crop, index) => (
        <span
          className={index === 0 ? styles.text.accent : styles.text.secondary}
        >
          {crop.plotsNeeded.toFixed(1)}
        </span>
      ),
    },
    {
      header: 'Max Potions',
      render: (crop, index) => (
        <span
          className={index === 0 ? styles.text.accent : styles.text.secondary}
        >
          {crop.maxPotions.toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Total Profit',
      render: (crop, index) => (
        <span
          className={index === 0 ? styles.text.accent : styles.text.secondary}
        >
          {crop.totalProfitPerCycle.toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Profit/Min',
      render: (crop, index) => (
        <span
          className={`font-semibold ${index === 0 ? styles.text.accent : styles.text.secondary}`}
        >
          {crop.profitPerMinute.toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Makes',
      render: (crop, index) => (
        <div
          className={`flex items-center space-x-2 ${index === 0 ? styles.text.accent : styles.text.secondary}`}
        >
          {getPotionIcon(crop.potionName) && (
            <PixelArtImage
              src={getPotionIcon(crop.potionName)!}
              alt={crop.potionName}
              className="w-4 h-4 object-contain"
            />
          )}
          <Link to="/reference/potions" className="hover:underline">
            {crop.potionName}
          </Link>
        </div>
      ),
    },
  ];

  // Column definitions for vegetable information table
  const vegetableColumns: Column<VegetableData>[] = [
    {
      header: 'Vegetable',
      cellClassName: styles.text.primary,
      sortBy: 'name', // Sort alphabetically by vegetable name
      render: vegetable => (
        <div className="flex items-center space-x-2">
          {getVegetableIcon(vegetable.name) && (
            <PixelArtImage
              src={getVegetableIcon(vegetable.name)!}
              alt={vegetable.name}
              className="w-4 h-4 object-contain"
            />
          )}
          <Link to="/reference/vegetables" className="hover:underline">
            {vegetable.name}
          </Link>
        </div>
      ),
    },
    {
      header: 'Grow Time (min)',
      sortBy: 'growTime', // Sort numerically by grow time
      render: vegetable => vegetable.growTime.toString(),
    },
    {
      header: 'Amount Needed',
      sortBy: 'amountNeeded', // Sort numerically by amount needed
      render: vegetable => vegetable.amountNeeded.toString(),
    },
    {
      header: 'Makes Potion',
      sortBy: 'potionName', // Sort alphabetically by potion name
      render: vegetable => (
        <div className="flex items-center space-x-2">
          {getPotionIcon(vegetable.potionName) && (
            <PixelArtImage
              src={getPotionIcon(vegetable.potionName)!}
              alt={vegetable.potionName}
              className="w-4 h-4 object-contain"
            />
          )}
          <Link to="/reference/potions" className="hover:underline">
            {vegetable.potionName}
          </Link>
        </div>
      ),
    },
    {
      header: 'Potion Price',
      sortBy: 'potionPrice', // Sort numerically by potion price
      defaultSortDirection: 'desc', // Show highest prices first by default
      render: vegetable => vegetable.potionPrice.toLocaleString(),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Crop Profit Calculator"
        description="Calculate the most profitable crops to grow based on your farm setup and house upgrades."
      />

      {/* Settings Section */}
      <div className={styles.card}>
        <h2 className={`text-xl font-semibold ${styles.text.primary} mb-4`}>
          Farm Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Plots */}
          <div>
            <label
              htmlFor="totalPlots"
              className={`block text-sm font-medium ${styles.text.primary} mb-2`}
            >
              Total Farm Plots
            </label>
            <input
              type="number"
              id="totalPlots"
              value={totalPlots}
              onChange={e => setTotalPlots(Number(e.target.value))}
              className={styles.input}
              min="1"
            />
          </div>

          {/* Cauldron Level */}
          <div>
            <label
              htmlFor="cauldronLevel"
              className={`block text-sm font-medium ${styles.text.primary} mb-2`}
            >
              Cauldron Level (Potion Multiplier)
            </label>
            <input
              type="number"
              id="cauldronLevel"
              value={cauldronLevel}
              onChange={e => setCauldronLevel(Number(e.target.value))}
              className={styles.input}
              min="1"
              step="0.1"
            />
          </div>

          {/* Reset Button */}
          <div className="flex items-end">
            <button
              onClick={handleReset}
              className={styles.button.secondary}
              type="button"
            >
              Reset to Defaults
            </button>
          </div>
        </div>

        {/* Fertilised Checkbox */}
        <div className="mt-6">
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={fertilised}
              onChange={e => setFertilised(e.target.checked)}
              className="mr-3"
            />
            <span className={styles.text.primary}>
              Farm is fertilised ({fertilised ? '2' : '1'} vegetable
              {fertilised ? 's' : ''} per plot)
            </span>
          </label>
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

        <div className={styles.card}>
          <Table
            data={analysis}
            columns={resultsColumns}
            // No initialSort - this is ordered results data
          />
        </div>
      </div>

      {/* Profit Over Time Chart */}
      <CropProfitChart analysis={analysis} />

      {/* Information Table Section */}
      <div className={styles.card}>
        <h2 className={`text-xl font-semibold ${styles.text.primary} mb-4`}>
          Vegetable Information
        </h2>
        <p className={`text-sm ${styles.text.muted} mb-4`}>
          Base stats for each vegetable and their corresponding potions
        </p>

        <div className={styles.card}>
          <Table
            data={gameVegetables}
            columns={vegetableColumns}
            initialSort={{ column: 'vegetable', direction: 'asc' }}
          />
        </div>
      </div>
    </div>
  );
};

export default CropCalculatorPage;
