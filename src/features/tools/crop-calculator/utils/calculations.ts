// src/features/tools/crop-calculator/utils/calculations.ts
import type { Vegetable, FarmConfig, VegetableAnalysis } from '../types';

/**
 * Calculate metrics for a single vegetable
 */
export const calculateVegetableMetrics = (
  vegetable: Vegetable,
  farmConfig: FarmConfig
): VegetableAnalysis => {
  const vegetablesPerPlot = farmConfig.fertilised ? 2 : 1;
  const plotsNeeded = vegetable.amountNeeded / vegetablesPerPlot;
  const maxPotions = Math.floor(farmConfig.totalPlots / plotsNeeded);
  const actualPotions = maxPotions * farmConfig.cauldronLevel;
  const totalProfitPerCycle = actualPotions * vegetable.potionPrice;
  const profitPerMinute = totalProfitPerCycle / vegetable.growTime;

  return {
    name: vegetable.name,
    growTime: vegetable.growTime,
    plotsNeeded,
    maxPotions: actualPotions,
    totalProfitPerCycle,
    profitPerMinute,
  };
};

/**
 * Calculate and rank all vegetables by profit efficiency
 */
export const calculateRankedVegetables = (
  vegetables: Vegetable[],
  farmConfig: FarmConfig
): VegetableAnalysis[] => {
  return vegetables
    .map((veg: Vegetable) => calculateVegetableMetrics(veg, farmConfig))
    .sort(
      (a: VegetableAnalysis, b: VegetableAnalysis) =>
        b.profitPerMinute - a.profitPerMinute
    );
};

/**
 * Get the optimal crop choice
 */
export const getOptimalCrop = (
  vegetables: Vegetable[],
  farmConfig: FarmConfig
): VegetableAnalysis | null => {
  const analysis = calculateRankedVegetables(vegetables, farmConfig);
  return analysis[0] || null;
};
