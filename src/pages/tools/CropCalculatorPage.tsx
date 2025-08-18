// src/pages/tools/CropCalculatorPage.tsx - Updated with debounced calculations
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
      const value = e.target.value;
      setTotalPlotsDisplay(parseInt(value) || 0);
      const clampedValue = clampPlots(parseInt(value) || 0);
      debouncedSetTotalPlots(clampedValue);
    },
    [clampPlots, debouncedSetTotalPlots]
  );

  const handleCauldronLevelChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCauldronLevelDisplay(parseInt(value) || 0);
      const clampedValue = clampCauldronLevel(parseInt(value) || 0);
      debouncedSetCauldronLevel(clampedValue);
    },
    [clampCauldronLevel, debouncedSetCauldronLevel]
  );

  const handleFertilisedChange = useCallback(() => {
    setFertilised(prev => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setTotalPlots(75);
    setTotalPlotsDisplay(75);
    setCauldronLevel(settings.houseMultipliers.cauldron);
    setCauldronLevelDisplay(settings.houseMultipliers.cauldron);
    setFertilised(true);
  }, [settings.houseMultipliers.cauldron]);

  // Expensive calculations - only computed when debounced state changes
  const analysis = useMemo(() => {
    if (!gameVegetables.length) return [];

    return gameVegetables
      .map(vegetable => {
        const vegetablesProduced = totalPlots * vegetablesPerPlot;
        const potionsCreated = Math.floor(
          vegetablesProduced / vegetable.amountNeeded
        );
        const potionsValue = potionsCreated * vegetable.potionPrice;
        const bonusMultiplier = cauldronLevel / 100;
        const totalProfitPerCycle = potionsValue * bonusMultiplier;
        const profitPerMinute = totalProfitPerCycle / vegetable.growTime;

        return {
          name: vegetable.name,
          growTime: vegetable.growTime,
          vegetablesProduced,
          potionsCreated,
          totalProfitPerCycle,
          profitPerMinute,
          potionName: vegetable.potionName,
        };
      })
      .sort((a, b) => b.profitPerMinute - a.profitPerMinute);
  }, [gameVegetables, totalPlots, vegetablesPerPlot, cauldronLevel]);

  // Get best crop for highlight
  const bestCrop = analysis.length > 0 ? analysis[0] : null;

  // Memoized column definitions for results table
  const resultsColumns: Column<(typeof analysis)[0]>[] = useMemo(
    () => [
      {
        header: 'Vegetable',
        cellClassName: theme.text.primary,
        sortBy: 'name',
        render: item => (
          <div className="flex items-center space-x-2">
            {getVegetableIcon(item.name) && (
              <PixelArtImage
                src={getVegetableIcon(item.name)!}
                alt={item.name}
                className="w-4 h-4 object-contain"
              />
            )}
            <Link to="/reference/vegetables" className="hover:underline">
              {item.name}
            </Link>
          </div>
        ),
      },
      {
        header: 'Vegetables Produced',
        sortBy: 'vegetablesProduced',
        defaultSortDirection: 'desc',
        render: item => (
          <span className={theme.text.secondary}>
            {item.vegetablesProduced.toLocaleString()}
          </span>
        ),
      },
      {
        header: 'Potions Created',
        sortBy: 'potionsCreated',
        defaultSortDirection: 'desc',
        render: item => (
          <span className={theme.text.secondary}>
            {item.potionsCreated.toLocaleString()}
          </span>
        ),
      },
      {
        header: 'Total Profit',
        sortBy: 'totalProfitPerCycle',
        defaultSortDirection: 'desc',
        render: item => (
          <span className={`font-medium ${theme.text.secondary}`}>
            {item.totalProfitPerCycle.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        ),
      },
      {
        header: 'Profit/Min',
        sortBy: 'profitPerMinute',
        defaultSortDirection: 'desc',
        render: item => (
          <span className={`font-bold ${theme.text.primary}`}>
            {item.profitPerMinute.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        ),
      },
    ],
    [theme.text.primary, theme.text.secondary, getVegetableIcon]
  );

  // Memoized column definitions for vegetable information table
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

        <Table
          data={analysis}
          columns={resultsColumns}
          // No initialSort - this is ordered results data
        />
      </div>

      {/* Profit Over Time Chart */}
      <CropProfitChart analysis={analysis} />

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
  );
};

// Add display name for better debugging
CropCalculatorPage.displayName = 'CropCalculatorPage';

export default CropCalculatorPage;
