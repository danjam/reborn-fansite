// src/pages/tools/WishingWellCalculatorPage.tsx
import { memo, useCallback, useMemo, useState } from 'react';

import { boost } from '@/assets/img';
import HighlightCard from '@/components/HighlightCard';
import { NumberInput } from '@/components/NumberInput';
import PageHeader from '@/components/PageHeader';
import Table, { type Column } from '@/components/Table';
import { useDebounce } from '@/hooks/useDebounce';
import { useGameSettings } from '@/hooks/useGameSettings';
import { useTheme } from '@/hooks/useTheme';

const WishingWellCalculatorPage = memo(() => {
  const theme = useTheme();
  const { settings, updateHouseMultiplier, updateOtherSetting } =
    useGameSettings();

  // Input states with display states for immediate feedback
  const [coinsInput, setCoinsInput] = useState<string>('0');
  const [currentWishesInput, setCurrentWishesInput] = useState<string>(
    settings.other.wishes.toString()
  );
  const [wishingWellLevelInput, setWishingWellLevelInput] = useState<string>(
    settings.houseMultipliers.wishingWell.toString()
  );

  // Actual calculation values (debounced)
  const [coins, setCoins] = useState<number>(0);
  const [currentWishes, setCurrentWishes] = useState<number>(
    settings.other.wishes
  );
  const [wishingWellLevel, setWishingWellLevel] = useState<number>(
    settings.houseMultipliers.wishingWell
  );

  // Debounce value updates for performance
  const debouncedSetCoins = useDebounce((value: number) => {
    // Round down to nearest 1,000,000
    const rounded = Math.floor(value / 1_000_000) * 1_000_000;
    setCoins(Math.max(0, rounded));
  }, 300);
  const debouncedSetCurrentWishes = useDebounce((value: number) => {
    setCurrentWishes(value);
    updateOtherSetting('wishes', value);
  }, 300);
  const debouncedSetWishingWellLevel = useDebounce((value: number) => {
    setWishingWellLevel(value);
    updateHouseMultiplier('wishingWell', value);
  }, 300);

  // Input change handlers with immediate display feedback
  const handleCoinsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCoinsInput(value);
      const numValue = parseInt(value) || 0;
      debouncedSetCoins(Math.max(0, numValue));
    },
    [debouncedSetCoins]
  );

  const handleCoinsBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const numValue = parseInt(value) || 0;
      // Round down to nearest 1,000,000 and update display
      const rounded = Math.floor(numValue / 1_000_000) * 1_000_000;
      const finalValue = Math.max(0, rounded);
      setCoinsInput(finalValue.toString());
      setCoins(finalValue);
    },
    []
  );

  const handleCurrentWishesChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCurrentWishesInput(value);
      const numValue = parseInt(value) || 0;
      debouncedSetCurrentWishes(Math.max(0, numValue));
    },
    [debouncedSetCurrentWishes]
  );

  const handleWishingWellLevelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setWishingWellLevelInput(value);
      const numValue = parseInt(value) || 1;
      debouncedSetWishingWellLevel(Math.max(1, numValue));
    },
    [debouncedSetWishingWellLevel]
  );

  // Reset handler
  const handleReset = useCallback(() => {
    setCoinsInput('0');
    setCurrentWishesInput(settings.other.wishes.toString());
    setWishingWellLevelInput(settings.houseMultipliers.wishingWell.toString());
    setCoins(0);
    setCurrentWishes(settings.other.wishes);
    setWishingWellLevel(settings.houseMultipliers.wishingWell);
  }, [settings.houseMultipliers.wishingWell, settings.other.wishes]);

  // Calculate wishes from coins
  const calculatedWishes = useMemo(() => {
    const COINS_PER_WISH = 1_000_000;
    const baseWishes = Math.floor(coins / COINS_PER_WISH);
    return baseWishes * wishingWellLevel;
  }, [coins, wishingWellLevel]);

  // Total wishes (current + calculated)
  const totalWishes = currentWishes + calculatedWishes;

  // Breakdown data for table
  const breakdownData = useMemo(
    () => [
      {
        id: 'current',
        label: 'Current Wishes',
        value: currentWishes,
        isTotal: false,
      },
      {
        id: 'base',
        label: 'Base Wishes from Coins',
        value: Math.floor(coins / 1_000_000),
        isTotal: false,
      },
      {
        id: 'multiplier',
        label: 'Wishing Well Multiplier',
        value: wishingWellLevel,
        isTotal: false,
      },
      {
        id: 'new',
        label: 'New Wishes',
        value: calculatedWishes,
        isTotal: false,
      },
      {
        id: 'total',
        label: 'Total Wishes',
        value: totalWishes,
        isTotal: true,
      },
    ],
    [currentWishes, coins, wishingWellLevel, calculatedWishes, totalWishes]
  );

  // Memoized table columns
  const breakdownColumns: Column<(typeof breakdownData)[0]>[] = useMemo(
    () => [
      {
        header: 'Item',
        render: item => (
          <span
            className={`font-medium ${
              item.isTotal ? theme.text.primary : theme.text.primary
            }`}
          >
            {item.label}
          </span>
        ),
      },
      {
        header: 'Value',
        render: item => (
          <span
            className={`${
              item.isTotal
                ? `font-semibold ${theme.text.accent}`
                : theme.text.secondary
            }`}
          >
            {typeof item.value === 'number'
              ? item.value.toLocaleString()
              : item.value}
          </span>
        ),
      },
    ],
    [theme]
  );

  return (
    <div>
      <PageHeader
        title="Wishing Well Calculator"
        description="Calculate how many wishes you can get from your coins and current wishing well level."
      />

      <div className="space-y-6">
        {/* Settings Section */}
        <div className={theme.card()}>
          <h2 className={`text-xl font-semibold ${theme.text.primary} mb-4`}>
            Wishing Well Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-6 items-end">
            {/* Coins Input */}
            <div>
              <label
                htmlFor="coins"
                className={`block text-sm font-medium ${theme.text.primary} mb-2`}
              >
                Coins
              </label>
              <NumberInput
                id="coins"
                value={coinsInput}
                onChange={handleCoinsChange}
                onBlur={handleCoinsBlur}
                className={theme.input()}
                min={0}
                step={1000000}
                placeholder="0"
              />
            </div>

            {/* Current Wishes Input */}
            <div>
              <label
                htmlFor="currentWishes"
                className={`block text-sm font-medium ${theme.text.primary} mb-2`}
              >
                Current Wishes
              </label>
              <NumberInput
                id="currentWishes"
                value={currentWishesInput}
                onChange={handleCurrentWishesChange}
                className={theme.input()}
                min={0}
                step={1}
                placeholder="0"
              />
            </div>

            {/* Wishing Well Level (Editable, populated from settings) */}
            <div>
              <label
                htmlFor="wishingWellLevel"
                className={`block text-sm font-medium ${theme.text.primary} mb-2`}
              >
                Wishing Well Level
              </label>
              <NumberInput
                id="wishingWellLevel"
                value={wishingWellLevelInput}
                onChange={handleWishingWellLevelChange}
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
        <div className={theme.card()}>
          <h2 className={`text-xl font-semibold ${theme.text.primary} mb-4`}>
            Wish Calculation
          </h2>

          {/* Highlight Card for New Wishes */}
          {coins > 0 && (
            <HighlightCard
              icon={boost}
              iconAlt="Wishes"
              title={`Total Wishes: ${totalWishes.toLocaleString()}`}
              content={`You will gain an additional **${calculatedWishes.toLocaleString()}** wishes`}
            />
          )}

          {/* Calculation Breakdown */}
          <div className="mt-6">
            <h3 className={`text-lg font-semibold ${theme.text.primary} mb-3`}>
              Breakdown
            </h3>
            <Table data={breakdownData} columns={breakdownColumns} />
          </div>
        </div>
      </div>
    </div>
  );
});

// Add display name for better debugging
WishingWellCalculatorPage.displayName = 'WishingWellCalculatorPage';

export default WishingWellCalculatorPage;
