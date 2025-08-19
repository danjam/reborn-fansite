// src/pages/tools/CropCalculatorPage.tsx - Fixed calculation logic
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { CropProfitChart } from '@/components/charts/CropProfitChart';
import HighlightCard from '@/components/HighlightCard';
import PageHeader from '@/components/PageHeader';
import { PixelArtImage } from '@/components/PixelArtImage';
import Table, { type Column } from '@/components/Table';
import { gameData } from '@/gameData';
import { useDebounce, useGameSettings } from '@/hooks';
import { useTheme } from '@/hooks/useTheme';

// Type for vegetable data from game data service
type VegetableData = {
  name: string;
  growTime: number;
  amountNeeded: number;
  potionName: string;
  potionPrice: number;
};

const CropCalculatorPage = () => {
  const theme = useTheme();
  const { settings } = useGameSettings();

  // Separate display state (immediate visual feedback) from calculation state (debounced)
  // Display states update immediately for responsive UI
  const [totalPlotsDisplay, setTotalPlotsDisplay] = useState(75);
  const [cauldronLevelDisplay, setCauldronLevelDisplay] = useState(
    settings.houseMultipliers.cauldron
  );

  // Calculation states are debounced to prevent expensive recalculations
  const [totalPlots, setTotalPlots] = useState(75);
  const [cauldronLevel, setCauldronLevel] = useState(
    settings.houseMultipliers.cauldron
  );
  const [fertilised, setFertilised] = useState(true);

  // Create debounced versions of the calculation state setters
  const debouncedSetTotalPlots = useDebounce(setTotalPlots, 300);
  const debouncedSetCauldronLevel = useDebounce(setCauldronLevel, 300);

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

  // Input handlers with immediate feedback and debounced updates
  const handleTotalPlotsChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      const clampedValue = clampPlots(value);

      // Update display state immediately for responsive UI
      setTotalPlotsDisplay(clampedValue);

      // Debounce the calculation state update to prevent expensive recalculations
      debouncedSetTotalPlots(clampedValue);
    },
    [clampPlots, debouncedSetTotalPlots]
  );

  const handleCauldronLevelChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      const clampedValue = clampCauldronLevel(value);

      // Update display state immediately for responsive UI
      setCauldronLevelDisplay(clampedValue);

      // Debounce the calculation state update to prevent expensive recalculations
      debouncedSetCauldronLevel(clampedValue);
    },
    [clampCauldronLevel, debouncedSetCauldronLevel]
  );

  const handleFertilisedChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // Checkbox changes don't need debouncing - they're not typed input
      setFertilised(e.target.checked);
    },
    []
  );

  const handleReset = useCallback(() => {
    // Reset all states synchronously for immediate feedback
    setTotalPlotsDisplay(75);
    setTotalPlots(75);
    setCauldronLevelDisplay(1);
    setCauldronLevel(1);
    setFertilised(true);
  }, []);

  // FIXED: Correct calculation logic - restored from old version
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

  // Get best crop for highlight
  const bestCrop = analysis.length > 0 ? analysis[0] : null;

  // FIXED: Restored correct column structure from old version
  const resultsColumns: Column<(typeof analysis)[0]>[] = useMemo(
    () => [
      {
        header: 'Crop',
        render: (crop, index) => (
          <div
            className={`flex items-center space-x-2 ${index === 0 ? theme.text.accent : theme.text.primary}`}
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
            className={index === 0 ? theme.text.accent : theme.text.secondary}
          >
            {crop.growTime}
          </span>
        ),
      },
      {
        header: 'Plots Needed',
        render: (crop, index) => (
          <span
            className={index === 0 ? theme.text.accent : theme.text.secondary}
          >
            {crop.plotsNeeded.toFixed(1)}
          </span>
        ),
      },
      {
        header: 'Max Potions',
        render: (crop, index) => (
          <span
            className={index === 0 ? theme.text.accent : theme.text.secondary}
          >
            {crop.maxPotions.toLocaleString()}
          </span>
        ),
      },
      {
        header: 'Total Profit',
        render: (crop, index) => (
          <span
            className={index === 0 ? theme.text.accent : theme.text.secondary}
          >
            {crop.totalProfitPerCycle.toLocaleString()}
          </span>
        ),
      },
      {
        header: 'Profit/Min',
        render: (crop, index) => (
          <span
            className={`font-semibold ${index === 0 ? theme.text.accent : theme.text.secondary}`}
          >
            {crop.profitPerMinute.toLocaleString()}
          </span>
        ),
      },
      {
        header: 'Makes',
        render: (crop, index) => (
          <div
            className={`flex items-center space-x-2 ${index === 0 ? theme.text.accent : theme.text.secondary}`}
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
    [theme, getVegetableIcon, getPotionIcon]
  );

  // Memoized vegetable information table columns
  const vegetableColumns: Column<VegetableData>[] = useMemo(
    () => [
      {
        header: 'Vegetable',
        cellClassName: theme.text.primary,
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
          <span className={theme.text.secondary}>{vegetable.growTime}</span>
        ),
      },
      {
        header: 'Amount Needed',
        sortBy: 'amountNeeded',
        defaultSortDirection: 'asc',
        render: vegetable => (
          <span className={theme.text.secondary}>{vegetable.amountNeeded}</span>
        ),
      },
      {
        header: 'Makes',
        cellClassName: theme.text.primary,
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
          <span className={`font-medium ${theme.text.secondary}`}>
            {vegetable.potionPrice.toLocaleString()}
          </span>
        ),
      },
    ],
    [theme.text.primary, theme.text.secondary, getVegetableIcon, getPotionIcon]
  );

  return (
    <div>
      <PageHeader
        title="Crop Profit Calculator"
        description="Calculate the most profitable crops based on your farm setup."
      />

      <div className="space-y-6">
        {/* Settings Section */}
        <div className={theme.card()}>
          <h2 className={`text-xl font-semibold ${theme.text.primary} mb-4`}>
            Farm Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-6 items-end">
            {/* Total Plots - now uses display state for immediate visual feedback */}
            <div>
              <label
                htmlFor="totalPlots"
                className={`block text-sm font-medium ${theme.text.primary} mb-2`}
              >
                Plots
              </label>
              <input
                type="number"
                id="totalPlots"
                value={totalPlotsDisplay}
                onChange={handleTotalPlotsChange}
                className={theme.input()}
                min="1"
                max="75"
                step="1"
                placeholder="75"
              />
            </div>

            {/* Cauldron Level - now uses display state for immediate visual feedback */}
            <div>
              <label
                htmlFor="cauldronLevel"
                className={`block text-sm font-medium ${theme.text.primary} mb-2`}
              >
                Cauldron Level
              </label>
              <input
                type="number"
                id="cauldronLevel"
                value={cauldronLevelDisplay}
                onChange={handleCauldronLevelChange}
                className={theme.input()}
                min="1"
                max="9999"
                step="1"
                placeholder="1"
              />
            </div>

            {/* Fertilised Checkbox */}
            <div>
              <label
                className={`block text-sm font-medium ${theme.text.primary} mb-2`}
              >
                Fertilised
              </label>
              <label className={theme.checkbox()}>
                <input
                  type="checkbox"
                  checked={fertilised}
                  onChange={handleFertilisedChange}
                  className="mr-3"
                />
                <span className={theme.text.primary}>
                  {fertilised ? '2' : '1'} per plot
                </span>
              </label>
            </div>

            {/* Reset Button */}
            <div className="justify-self-start">
              <button
                onClick={handleReset}
                className={theme.button('secondary')}
                type="button"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className={theme.card()}>
          <h2 className={`text-xl font-semibold ${theme.text.primary} mb-4`}>
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

          {/* Profit Over Time Chart */}
          <CropProfitChart analysis={analysis} />

          <Table
            data={analysis}
            columns={resultsColumns}
            // No initialSort - this is ordered results data
          />
        </div>

        {/* Information Table Section */}
        <div className={theme.card()}>
          <h2 className={`text-xl font-semibold ${theme.text.primary} mb-4`}>
            Vegetable Information
          </h2>
          <p className={`text-sm ${theme.text.muted} mb-4`}>
            Base stats for each vegetable and their corresponding potions
          </p>
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

// Add display name for better debugging
CropCalculatorPage.displayName = 'CropCalculatorPage';

export default CropCalculatorPage;
