// src/features/tools/crop-calculator/types.ts

export interface FarmConfig {
  totalPlots: number;
  fertilised: boolean;
  cauldronLevel: number;
}

export interface Vegetable {
  name: string;
  growTime: number;
  amountNeeded: number;
  potionName: string;
  potionPrice: number;
}

export interface VegetableAnalysis {
  name: string;
  growTime: number;
  plotsNeeded: number;
  maxPotions: number;
  totalProfitPerCycle: number;
  profitPerMinute: number;
}

// Helper type for updateVegetable function
export type VegetableField = keyof Vegetable;

// Helper type for updateFarmConfig function
export type FarmConfigField = keyof FarmConfig;
