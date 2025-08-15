// src/pages/tools/CropCalculatorPage.tsx - Updated with range clamping
import { useCallback, useMemo, useState } from 'react';
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

  // Simple state - no error tracking needed
  const [totalPlots, setTotalPlots] = useState(75);
  const [fertilised, setFertilised] = useState(true);
  const [cauldronLevel, setCauldronLevel] = useState(
    settings.houseMultipliers.cauldron // Keep existing default logic
  );

  // Get vegetable-potion data from the game data service
  const gameVegetables = gameData.getVegetablePotionData();

  // Memoize vegetables and potions lookups for icon functions
  const vegetablesLookup = useMemo(() => {
    const lookup = new Map<string, string>();
    gameData.getAllVegetables().forEach(v => lookup.set(v.name, v.icon));
    return lookup;
  }, []);

  const potionsLookup = useMemo(() => {
    const lookup = new Map<string, string>();
    gameData.getAllPotions().forEach(p => lookup.set(p.name, p.icon));
    return lookup;
  }, []);

  // Optimized icon lookup functions
  const getVegetableIcon = useCallback(
    (vegetableName: string) => {
      return vegetablesLookup.get(vegetableName);
    },
    [vegetablesLookup]
  );

  const getPotionIcon = useCallback(
    (potionName: string) => {
      return potionsLookup.get(potionName);
    },
    [potionsLookup]
  );

  // Simple clamping functions
  const clampPlots = useCallback((value: number): number => {
    return Math.max(1, Math.min(75, Math.round(value) || 1));
  }, []);

  const clampCauldronLevel = useCallback((value: number): number => {
    return Math.max(1, Math.min(9999, Math.round(value) || 1));
  }, []);

  // Memoize simple calculations
  const vegetablesPerPlot = useMemo(() => (fertilised ? 2 : 1), [fertilised]);

  // Optimized analysis calculation
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

  // Memoize best crop to prevent recalculation
  const bestCrop = useMemo(() => analysis[0], [analysis]);

  // Event handlers with automatic clamping
  const handleTotalPlotsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      setTotalPlots(clampPlots(value));
    },
    [clampPlots]
  );

  const handleCauldronLevelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      setCauldronLevel(clampCauldronLevel(value));
    },
    [clampCauldronLevel]
  );

  const handleFertilisedChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFertilised(e.target.checked);
    },
    []
  );

  const handleReset = useCallback(() => {
    setTotalPlots(75);
    setFertilised(true);
    setCauldronLevel(1);
  }, []);

  // Memoized column definitions to prevent Table re-renders
  const resultsColumns: Column<(typeof analysis)[0]>[] = useMemo(
    () => [
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
    ],
    [styles, getVegetableIcon, getPotionIcon]
  );

  // Memoized vegetable information table columns
  const vegetableColumns: Column<VegetableData>[] = useMemo(
    () => [
      {
        header: 'Vegetable',
        cellClassName: styles.text.primary,
        sortBy: 'name',
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
        sortBy: 'growTime',
        defaultSortDirection: 'asc',
        render: vegetable => (
          <span className={styles.text.secondary}>{vegetable.growTime}</span>
        ),
      },
      {
        header: 'Amount Needed',
        sortBy: 'amountNeeded',
        defaultSortDirection: 'asc',
        render: vegetable => (
          <span className={styles.text.secondary}>
            {vegetable.amountNeeded}
          </span>
        ),
      },
      {
        header: 'Makes',
        cellClassName: styles.text.primary,
        sortBy: 'potionName',
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
        sortBy: 'potionPrice',
        defaultSortDirection: 'desc',
        render: vegetable => (
          <span className="font-medium">
            {vegetable.potionPrice.toLocaleString()}
          </span>
        ),
      },
    ],
    [styles, getVegetableIcon, getPotionIcon]
  );

  return (
    <div>
      <PageHeader
        title="Crop Profit Calculator"
        description="Calculate the most profitable crops based on your farm setup."
      />

      {/* Settings Section */}
      <div className={styles.card}>
        <h2 className={`text-xl font-semibold ${styles.text.primary} mb-4`}>
          Farm Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-6 items-end">
          {/* Total Plots - clamped to 1-75, integers only */}
          <div>
            <label
              htmlFor="totalPlots"
              className={`block text-sm font-medium ${styles.text.primary} mb-2`}
            >
              Plots
            </label>
            <input
              type="number"
              id="totalPlots"
              value={totalPlots}
              onChange={handleTotalPlotsChange}
              className={styles.input}
              min="1"
              max="75"
              step="1"
              placeholder="75"
            />
          </div>

          {/* Cauldron Level - clamped to 1-9999, integers only */}
          <div>
            <label
              htmlFor="cauldronLevel"
              className={`block text-sm font-medium ${styles.text.primary} mb-2`}
            >
              Cauldron Level
            </label>
            <input
              type="number"
              id="cauldronLevel"
              value={cauldronLevel}
              onChange={handleCauldronLevelChange}
              className={styles.input}
              min="1"
              max="9999"
              step="1"
              placeholder="1"
            />
          </div>

          {/* Fertilised Checkbox */}
          <div>
            <label
              className={`block text-sm font-medium ${styles.text.primary} mb-2`}
            >
              Fertilised
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={fertilised}
                onChange={handleFertilisedChange}
                className="mr-3"
              />
              <span className={styles.text.primary}>
                {fertilised ? '2' : '1'} per plot
              </span>
            </label>
          </div>

          {/* Reset Button */}
          <div className="justify-self-start">
            <button
              onClick={handleReset}
              className={styles.button.secondary}
              type="button"
            >
              Reset
            </button>
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
            content={`Most profitable at **${bestCrop.profitPerMinute.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}** coins per minute`}
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
