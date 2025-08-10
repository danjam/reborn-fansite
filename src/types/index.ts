// Common types for your crop calculator
export interface FarmConfig {
  totalPlots: number;
  fertilised: boolean;
  cauldronLevel: number;
}

export interface Vegetable {
  name: string;
  potionName: string;
  sellPrice: number;
  potionPrice: number;
  growthDays: number;
  seedCost: number;
}

export interface VegetableAnalysis extends Vegetable {
  profitPerDay: number;
  totalProfit: number;
  netProfitPerDay: number;
  roi: number;
}

export interface ComponentProps {
  darkMode?: boolean;
  className?: string;
}

export interface CropCalculatorReturn {
  farmConfig: FarmConfig;
  vegetables: Vegetable[];
  vegetablesPerPlot: number;
  canRemoveVegetables: boolean;
  analysis: VegetableAnalysis[];
  bestCrop: VegetableAnalysis | null;
  updateFarmConfig: (field: keyof FarmConfig, value: number) => void;
  updateCauldronLevel: (value: number) => void;
  toggleFertilised: (checked: boolean) => void;
  updateVegetable: (
    index: number,
    field: keyof Vegetable,
    value: string | number
  ) => void;
  addVegetable: () => void;
  removeVegetable: (index: number) => void;
  resetToInitial: () => void;
}

export * from './settings';
