// src/pages/tools/PotionIngredientsCalculatorPage.tsx
import clsx from 'clsx';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { NumberInput } from '@/components/NumberInput';
import PageHeader from '@/components/PageHeader';
import { PixelArtImage } from '@/components/PixelArtImage';
import Table, { type Column } from '@/components/Table';
import { gameData } from '@/gameData';
import { useDebounce, useGameSettings } from '@/hooks';
import { useTheme } from '@/hooks/useTheme';

// Types
type Material = {
  name: string;
  icon: string;
  needed: number;
};

type BatchInfo = {
  size: number;
  count: number;
};

type CalculationResult = {
  vegetableName: string;
  vegetableIcon: string;
  potionName: string;
  potionIcon: string;
  batchesTotal: number;
  potionsWillMake: number;
  totalProfit: number;
  batchInfo: BatchInfo;
  safeBatches: number;
  materials: Material[];
  inventoryWarning: boolean;
  totalItems: number;
};

// Helper function to determine optimal batch size and count
const calculateBatchInfo = (totalBatches: number): BatchInfo => {
  if (totalBatches > 20) {
    return { size: 100, count: Math.ceil(totalBatches / 100) };
  } else if (totalBatches > 5) {
    return { size: 20, count: Math.ceil(totalBatches / 20) };
  } else if (totalBatches > 1) {
    return { size: 5, count: Math.ceil(totalBatches / 5) };
  } else {
    return { size: 1, count: totalBatches };
  }
};

// Helper function to calculate materials needed
const calculateMaterials = (
  potion: any,
  selectedVegetableId: string,
  batchCount: number
): Material[] => {
  const containers = gameData.getAllContainers();
  const drops = gameData.getAllDrops();
  const materials: Material[] = [];

  potion.materials?.forEach((material: any) => {
    if (material.id === selectedVegetableId) return; // Skip the vegetable itself

    const container = containers.find(c => c.id === material.id);
    const drop = drops.find(d => d.id === material.id);
    const totalNeeded = material.quantity * batchCount;

    if (container) {
      materials.push({
        name: container.name,
        icon: container.icon,
        needed: totalNeeded,
      });
    } else if (drop) {
      materials.push({
        name: drop.name,
        icon: drop.icon,
        needed: totalNeeded,
      });
    }
  });

  return materials;
};

const PotionIngredientsCalculatorPage = () => {
  const theme = useTheme();
  const { settings } = useGameSettings();

  // State management
  const [selectedVegetableId, setSelectedVegetableId] = useState<string>('');
  const [vegetableAmountDisplay, setVegetableAmountDisplay] =
    useState<number>(0);
  const [vegetableAmount, setVegetableAmount] = useState<number>(0);
  const [cauldronLevelDisplay, setCauldronLevelDisplay] = useState(
    settings.houseMultipliers.cauldron
  );
  const [cauldronLevel, setCauldronLevel] = useState(
    settings.houseMultipliers.cauldron
  );

  // Debounced updates for calculations
  const debouncedSetVegetableAmount = useDebounce(setVegetableAmount, 300);
  const debouncedSetCauldronLevel = useDebounce(setCauldronLevel, 300);

  // Get vegetables that can make sellable potions
  const availableVegetables = useMemo(() => {
    const vegetables = gameData.getAllVegetables();
    const potions = gameData.getAllPotions();

    return vegetables.filter(vegetable =>
      potions.some(
        potion =>
          potion.materials?.some(material => material.id === vegetable.id) &&
          potion.sell_price !== null &&
          potion.sell_price > 0
      )
    );
  }, []);

  // Get selected vegetable and its minimum amount
  const selectedVegetableData = useMemo(() => {
    if (!selectedVegetableId) return null;

    const vegetable = availableVegetables.find(
      v => v.id === selectedVegetableId
    );
    if (!vegetable) return null;

    const potions = gameData.getAllPotions();
    const potion = potions.find(
      p =>
        p.materials?.some(material => material.id === vegetable.id) &&
        p.sell_price !== null &&
        p.sell_price > 0
    );

    if (!potion) return null;

    const materialEntry = potion.materials?.find(m => m.id === vegetable.id);
    const minimumAmount = materialEntry?.quantity || 0;

    return { vegetable, potion, minimumAmount };
  }, [availableVegetables, selectedVegetableId]);

  // Event handlers
  const handleVegetableChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const newVegetableId = e.target.value;
      setSelectedVegetableId(newVegetableId);

      // Reset amount when changing vegetable
      if (newVegetableId && selectedVegetableData) {
        const minAmount = selectedVegetableData.minimumAmount;
        setVegetableAmountDisplay(minAmount);
        setVegetableAmount(minAmount);
      }
    },
    [selectedVegetableData]
  );

  const handleAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value) || 0;
      setVegetableAmountDisplay(value);

      // Only update calculations for valid values
      if (
        selectedVegetableData &&
        value >= selectedVegetableData.minimumAmount
      ) {
        debouncedSetVegetableAmount(value);
      }
    },
    [selectedVegetableData, debouncedSetVegetableAmount]
  );

  const handleAmountBlur = useCallback(() => {
    if (!selectedVegetableData) return;

    const { minimumAmount } = selectedVegetableData;
    const clampedValue = Math.max(minimumAmount, vegetableAmountDisplay);
    const batches = Math.floor(clampedValue / minimumAmount);
    const roundedAmount = batches * minimumAmount;

    setVegetableAmountDisplay(roundedAmount);
    setVegetableAmount(roundedAmount);
  }, [selectedVegetableData, vegetableAmountDisplay]);

  const handleCauldronLevelChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(1, Number(e.target.value) || 1);
      setCauldronLevelDisplay(value);
      debouncedSetCauldronLevel(value);
    },
    [debouncedSetCauldronLevel]
  );

  const handleReset = useCallback(() => {
    setSelectedVegetableId('');
    setVegetableAmountDisplay(0);
    setVegetableAmount(0);
    setCauldronLevelDisplay(settings.houseMultipliers.cauldron);
    setCauldronLevel(settings.houseMultipliers.cauldron);
  }, [settings.houseMultipliers.cauldron]);

  // Calculate results
  const calculationResult = useMemo((): CalculationResult | null => {
    if (!selectedVegetableData || !vegetableAmount) return null;

    const { vegetable, potion, minimumAmount } = selectedVegetableData;
    const batchesTotal = Math.floor(vegetableAmount / minimumAmount);
    const potionsWillMake = batchesTotal * cauldronLevel;
    const totalProfit = potionsWillMake * (potion.sell_price || 0);
    const batchInfo = calculateBatchInfo(batchesTotal);
    const materials = calculateMaterials(potion, vegetable.id, batchesTotal);

    // Calculate safe batches (max without inventory overflow)
    const materialsPerBatch =
      potion.materials?.reduce((sum: number, material: any) => {
        return material.id === vegetable.id ? sum : sum + material.quantity;
      }, 0) || 0;
    const itemsPerBatch = materialsPerBatch + cauldronLevel; // materials + potions produced
    const maxInventory = 40 * 9999;
    const safeBatchesIndividual = Math.floor(maxInventory / itemsPerBatch);

    // Convert to same batch size as current selection
    const safeBatches = Math.floor(safeBatchesIndividual / batchInfo.size);

    // Calculate inventory warning
    const totalItems =
      materials.reduce((sum, item) => sum + item.needed, 0) + potionsWillMake;
    const inventoryWarning = totalItems > maxInventory;

    return {
      vegetableName: vegetable.name,
      vegetableIcon: vegetable.icon,
      potionName: potion.name,
      potionIcon: potion.icon,
      batchesTotal,
      potionsWillMake,
      totalProfit,
      batchInfo,
      safeBatches,
      materials,
      inventoryWarning,
      totalItems,
    };
  }, [selectedVegetableData, vegetableAmount, cauldronLevel]);

  // Table columns for materials
  const materialsColumns: Column<Material>[] = useMemo(
    () => [
      {
        header: 'Material',
        render: item => (
          <div
            className={clsx('flex items-center space-x-2', theme.text.primary)}
          >
            <PixelArtImage
              src={item.icon}
              alt={item.name}
              className="w-4 h-4 object-contain"
            />
            <span>{item.name}</span>
          </div>
        ),
      },
      {
        header: 'Needed',
        render: item => (
          <span className={theme.text.secondary}>
            {item.needed.toLocaleString()}
          </span>
        ),
      },
    ],
    [theme.text.primary, theme.text.secondary]
  );

  return (
    <div>
      <PageHeader
        title="Potion Ingredients Calculator"
        description="Calculate how many containers and monster drops you need to craft potions from your vegetables."
      />

      <div className="space-y-6">
        {/* Settings Section */}
        <div className={theme.card()}>
          <h2
            className={clsx('text-xl font-semibold mb-4', theme.text.primary)}
          >
            Crafting Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] gap-6 items-end">
            {/* Vegetable Selection */}
            <div>
              <label
                htmlFor="vegetableSelect"
                className={clsx(
                  'block text-sm font-medium mb-2',
                  theme.text.primary
                )}
              >
                Vegetable
              </label>
              <select
                id="vegetableSelect"
                value={selectedVegetableId}
                onChange={handleVegetableChange}
                className={theme.input()}
              >
                <option value="">Select a vegetable...</option>
                {availableVegetables.map(vegetable => (
                  <option key={vegetable.id} value={vegetable.id}>
                    {vegetable.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Input */}
            <div>
              <label
                htmlFor="vegetableAmount"
                className={clsx(
                  'block text-sm font-medium mb-2',
                  theme.text.primary
                )}
              >
                Amount Available
              </label>
              <NumberInput
                id="vegetableAmount"
                value={vegetableAmountDisplay}
                onChange={handleAmountChange}
                onBlur={handleAmountBlur}
                className={theme.input()}
                min={selectedVegetableData?.minimumAmount || 0}
                step={selectedVegetableData?.minimumAmount || 1}
                placeholder={
                  selectedVegetableData?.minimumAmount.toString() || '0'
                }
                disabled={!selectedVegetableId}
              />
            </div>

            {/* Cauldron Level */}
            <div>
              <label
                htmlFor="cauldronLevel"
                className={clsx(
                  'block text-sm font-medium mb-2',
                  theme.text.primary
                )}
              >
                Cauldron Level
              </label>
              <NumberInput
                id="cauldronLevel"
                value={cauldronLevelDisplay}
                onChange={handleCauldronLevelChange}
                className={theme.input()}
                min={1}
                step={1}
                placeholder="1"
              />
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
        {calculationResult && (
          <div className={theme.card()}>
            <h2
              className={clsx('text-xl font-semibold mb-4', theme.text.primary)}
            >
              Crafting Results
            </h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              {/* Potion Type */}
              <div
                className={clsx('p-4 rounded-lg', theme.background.elevated)}
              >
                <div className="flex items-center space-x-3">
                  <PixelArtImage
                    src={calculationResult.potionIcon}
                    alt={calculationResult.potionName}
                    className="w-8 h-8 object-contain"
                  />
                  <div>
                    <Link to="/reference/potions" className="hover:underline">
                      <p
                        className={clsx(
                          'text-sm font-medium',
                          theme.text.primary
                        )}
                      >
                        {calculationResult.potionName}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Batches */}
              <div
                className={clsx('p-4 rounded-lg', theme.background.elevated)}
              >
                <p className={clsx('text-sm', theme.text.muted)}>Batches</p>
                <p
                  className={clsx('text-lg font-semibold', theme.text.primary)}
                >
                  {calculationResult.batchInfo.count}
                </p>
                <div className={clsx('text-xs mt-1', theme.text.muted)}>
                  {calculationResult.batchInfo.size}×
                </div>
              </div>

              {/* Safe Batches */}
              <div
                className={clsx('p-4 rounded-lg', theme.background.elevated)}
              >
                <p className={clsx('text-sm', theme.text.muted)}>
                  Safe Batches
                </p>
                <p
                  className={clsx('text-lg font-semibold', theme.text.primary)}
                >
                  {calculationResult.safeBatches}
                </p>
                <div className={clsx('text-xs mt-1', theme.text.muted)}>
                  no overflow
                </div>
              </div>

              {/* Potions Made */}
              <div
                className={clsx('p-4 rounded-lg', theme.background.elevated)}
              >
                <p className={clsx('text-sm', theme.text.muted)}>
                  Potions Made
                </p>
                <p
                  className={clsx('text-lg font-semibold', theme.text.primary)}
                >
                  {calculationResult.potionsWillMake.toLocaleString()}
                </p>
              </div>

              {/* Total Profit */}
              <div
                className={clsx('p-4 rounded-lg', theme.background.elevated)}
              >
                <p className={clsx('text-sm', theme.text.muted)}>
                  Total Profit
                </p>
                <p
                  className={clsx('text-lg font-semibold', theme.text.primary)}
                >
                  {calculationResult.totalProfit.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Inventory Warning */}
            {calculationResult.inventoryWarning && (
              <div className="p-4 rounded-lg border-l-4 border-red-500 bg-red-500/10 mb-6">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-red-400 mr-2 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="font-medium text-red-400">Inventory Warning</p>
                </div>
                <p className="text-sm text-red-300 mt-1">
                  Total items ({calculationResult.totalItems.toLocaleString()})
                  exceeds max inventory capacity (399,960). Excess items will be
                  lost!
                </p>
              </div>
            )}

            {/* Materials Table */}
            {calculationResult.materials.length > 0 && (
              <div>
                <h3
                  className={clsx(
                    'text-lg font-semibold mb-3',
                    theme.text.primary
                  )}
                >
                  Materials Needed
                </h3>
                <Table
                  data={calculationResult.materials}
                  columns={materialsColumns}
                />
              </div>
            )}
          </div>
        )}

        {/* No Results Message */}
        {!calculationResult && selectedVegetableId && (
          <div className={theme.card()}>
            <p className={clsx('text-center py-8', theme.text.muted)}>
              Select a vegetable and enter an amount to see crafting
              requirements.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Add display name for better debugging
PotionIngredientsCalculatorPage.displayName = 'PotionIngredientsCalculatorPage';

export default PotionIngredientsCalculatorPage;
