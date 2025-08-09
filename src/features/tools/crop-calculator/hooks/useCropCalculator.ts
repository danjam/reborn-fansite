// src/features/tools/crop-calculator/hooks/useCropCalculator.ts
import { useCallback, useMemo, useState } from 'react';

import type {
  FarmConfig,
  FarmConfigField,
  Vegetable,
  VegetableAnalysis,
  VegetableField,
} from '../types';
import { calculateRankedVegetables } from '../utils/calculations';
import {
  createVegetablePotionData,
  getDefaultNewVegetable,
} from '../utils/vegetable-potion-mapping';

// Farm configuration constants
const INITIAL_FARM_CONFIG: FarmConfig = {
  totalPlots: 75,
  fertilised: true,
  cauldronLevel: 1,
};

export const useCropCalculator = () => {
  // Get initial data from the derived vegetable-potion relationships
  const initialVegetableData = useMemo(() => createVegetablePotionData(), []);

  const [farmConfig, setFarmConfig] = useState<FarmConfig>(INITIAL_FARM_CONFIG);
  const [vegetables, setVegetables] =
    useState<Vegetable[]>(initialVegetableData);

  // Derived values
  const vegetablesPerPlot = farmConfig.fertilised ? 2 : 1;
  const canRemoveVegetables = vegetables.length > 1;

  // Calculate analysis with memoization
  const analysis = useMemo(
    () => calculateRankedVegetables(vegetables, farmConfig),
    [vegetables, farmConfig]
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

  // Vegetable management handlers
  const updateVegetable = useCallback(
    (index: number, field: VegetableField, value: string) => {
      setVegetables(prev =>
        prev.map((veg, i) =>
          i === index
            ? {
                ...veg,
                [field]:
                  field === 'name' || field === 'potionName'
                    ? value
                    : Number(value),
              }
            : veg
        )
      );
    },
    []
  );

  const addVegetable = useCallback(() => {
    setVegetables(prev => [...prev, { ...getDefaultNewVegetable() }]);
  }, []);

  const removeVegetable = useCallback(
    (index: number) => {
      if (vegetables.length > 1) {
        setVegetables(prev => prev.filter((_, i) => i !== index));
      }
    },
    [vegetables.length]
  );

  const resetToInitial = useCallback(() => {
    setFarmConfig(INITIAL_FARM_CONFIG);
    setVegetables(createVegetablePotionData());
  }, []);

  return {
    // State
    farmConfig,
    vegetables,

    // Derived values
    vegetablesPerPlot,
    canRemoveVegetables,
    analysis,
    bestCrop,

    // Handlers
    updateFarmConfig,
    updateCauldronLevel,
    toggleFertilised,
    updateVegetable,
    addVegetable,
    removeVegetable,
    resetToInitial,
  };
};
