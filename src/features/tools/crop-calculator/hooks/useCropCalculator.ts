// src/features/tools/crop-calculator/hooks/useCropCalculator.ts
import { useState, useMemo, useCallback } from 'react';
import { INITIAL_FARM_CONFIG, DEFAULT_NEW_VEGETABLE } from '../data/vegetables';
import { calculateRankedVegetables } from '../utils/calculations';
import { VEGETABLES } from '../../../../data/vegetables';
import type {
  FarmConfig,
  Vegetable,
  VegetableAnalysis,
  FarmConfigField,
  VegetableField,
} from '../types';

export const useCropCalculator = () => {
  const [farmConfig, setFarmConfig] = useState<FarmConfig>(INITIAL_FARM_CONFIG);
  const [vegetables, setVegetables] = useState<Vegetable[]>(VEGETABLES);

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
    setVegetables(VEGETABLES);
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
