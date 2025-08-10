// src/features/tools/crop-calculator/hooks/useSimpleCropCalculator.ts
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useGameSettings } from '@/hooks/useGameSettings';

import type { FarmConfig, FarmConfigField, VegetableAnalysis } from '../types';
import { calculateRankedVegetables } from '../utils/calculations';
import { createVegetablePotionData } from '../utils/vegetable-potion-mapping';

export const useSimpleCropCalculator = () => {
  // Get global settings for initial cauldron multiplier
  const { settings } = useGameSettings();

  // Get static data from the game's vegetable-potion relationships
  const staticVegetableData = useMemo(() => createVegetablePotionData(), []);

  // Initialize farm config
  const [farmConfig, setFarmConfig] = useState<FarmConfig>({
    totalPlots: 75,
    fertilised: true,
    cauldronLevel: 1, // Will be updated by effect below
  });

  // Update cauldron level when settings change
  useEffect(() => {
    setFarmConfig(prev => ({
      ...prev,
      cauldronLevel: settings.houseMultipliers.cauldron,
    }));
  }, [settings.houseMultipliers.cauldron]);

  // Derived values
  const vegetablesPerPlot = farmConfig.fertilised ? 2 : 1;

  // Calculate analysis with memoization
  const analysis = useMemo(
    () => calculateRankedVegetables(staticVegetableData, farmConfig),
    [staticVegetableData, farmConfig]
  );

  const bestCrop: VegetableAnalysis | null = analysis[0] || null;

  // Farm configuration handlers
  const updateFarmConfig = useCallback(
    (field: FarmConfigField, value: string) => {
      setFarmConfig(prev => ({ ...prev, [field]: Number(value) }));
    },
    []
  );

  const updateCauldronLevel = useCallback((value: string) => {
    setFarmConfig(prev => ({ ...prev, cauldronLevel: Number(value) }));
  }, []);

  const toggleFertilised = useCallback((checked: boolean) => {
    setFarmConfig(prev => ({ ...prev, fertilised: checked }));
  }, []);

  const resetToInitial = useCallback(() => {
    setFarmConfig({
      totalPlots: 75,
      fertilised: true,
      cauldronLevel: settings.houseMultipliers.cauldron,
    });
  }, [settings.houseMultipliers.cauldron]);

  return {
    // State
    farmConfig,

    // Static data
    staticVegetableData,

    // Derived values
    vegetablesPerPlot,
    analysis,
    bestCrop,

    // Handlers
    updateFarmConfig,
    updateCauldronLevel,
    toggleFertilised,
    resetToInitial,
  };
};
