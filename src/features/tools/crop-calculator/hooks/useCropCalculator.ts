// src/features/tools/crop-calculator/hooks/useCropCalculator.ts
import { useCallback, useMemo, useState } from 'react';

import { VEGETABLE_POTIONS } from '../../../../data/vegetable_potions';
import { DEFAULT_NEW_VEGETABLE, INITIAL_FARM_CONFIG } from '../data/vegetables';
import type {
  FarmConfig,
  FarmConfigField,
  Vegetable,
  VegetableAnalysis,
  VegetableField,
} from '../types';
import { calculateRankedVegetables } from '../utils/calculations';

export const useCropCalculator = () => {
  const [farmConfig, setFarmConfig] = useState<FarmConfig>(INITIAL_FARM_CONFIG);
  const [vegetables, setVegetables] = useState<Vegetable[]>(VEGETABLE_POTIONS);

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
    setVegetables(prev => [...prev, { ...DEFAULT_NEW_VEGETABLE }]);
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
    setVegetables(VEGETABLE_POTIONS);
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
