// src/pages/tools/RestCalculatorPage.tsx
import clsx from 'clsx';
import { memo, useCallback, useMemo, useState } from 'react';

import { exp_boost } from '@/assets/img';
import HighlightCard from '@/components/HighlightCard';
import { NumberInput } from '@/components/NumberInput';
import PageHeader from '@/components/PageHeader';
import Table, { type Column } from '@/components/Table';
import { TimeInput, type TimeValue } from '@/components/TimeInput';
import { useDebounce } from '@/hooks/useDebounce';
import { useGameSettings } from '@/hooks/useGameSettings';
import { useTheme } from '@/hooks/useTheme';

const RestCalculatorPage = memo(() => {
  const theme = useTheme();
  const { settings, updateHouseMultiplier } = useGameSettings();

  // Input states with display states for immediate feedback
  const [timeInput, setTimeInput] = useState<TimeValue>({
    hours: 0,
    minutes: 5,
  });
  const [bedMultiplierInput, setBedMultiplierInput] = useState<string>(
    settings.houseMultipliers.bed.toString()
  );

  // Actual calculation values (debounced)
  const [time, setTime] = useState<TimeValue>({ hours: 0, minutes: 5 });
  const [bedMultiplier, setBedMultiplier] = useState<number>(
    settings.houseMultipliers.bed
  );

  // Debounce value updates for performance
  const debouncedSetTime = useDebounce((value: TimeValue) => {
    setTime({
      hours: Math.max(0, value.hours),
      minutes: Math.max(0, Math.min(59, value.minutes)),
    });
  }, 300);

  const debouncedSetBedMultiplier = useDebounce((value: number) => {
    const intValue = Math.max(1, Math.floor(value)); // Ensure integer >= 1
    setBedMultiplier(intValue);
    updateHouseMultiplier('bed', intValue);
  }, 300);

  // Input handlers with validation
  const handleTimeChange = useCallback(
    (value: TimeValue) => {
      setTimeInput(value);
      debouncedSetTime(value);
    },
    [debouncedSetTime]
  );

  const handleBedMultiplierChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setBedMultiplierInput(value);

      // Allow empty string for clearing
      if (value === '') {
        setBedMultiplier(1);
        updateHouseMultiplier('bed', 1);
        return;
      }

      const numValue = parseInt(value, 10);
      if (!isNaN(numValue) && numValue >= 1) {
        debouncedSetBedMultiplier(numValue);
      }
    },
    [debouncedSetBedMultiplier, updateHouseMultiplier]
  );

  // Handle bed multiplier blur to enforce validation
  const handleBedMultiplierBlur = useCallback(() => {
    const numValue = parseInt(bedMultiplierInput, 10);
    if (isNaN(numValue) || numValue < 1) {
      // Reset to minimum value if invalid
      setBedMultiplierInput('1');
      setBedMultiplier(1);
      updateHouseMultiplier('bed', 1);
    } else {
      // Ensure display shows the integer value
      setBedMultiplierInput(numValue.toString());
    }
  }, [bedMultiplierInput, updateHouseMultiplier]);

  // Reset function
  const handleReset = useCallback(() => {
    setTimeInput({ hours: 0, minutes: 5 });
    setBedMultiplierInput('1');
    setTime({ hours: 0, minutes: 5 });
    setBedMultiplier(1);
    updateHouseMultiplier('bed', 1);
  }, [updateHouseMultiplier]);

  // Calculate results
  const {
    totalRestTimeMinutes,
    isValidRest,
    restedXpTime,
    restedXpHours,
    restedXpMinutes,
  } = useMemo(() => {
    const totalRestTimeMinutes = time.hours * 60 + time.minutes;
    const isValidRest = totalRestTimeMinutes >= 5;

    if (!isValidRest) {
      return {
        totalRestTimeMinutes,
        isValidRest,
        restedXpTime: 0,
        restedXpHours: 0,
        restedXpMinutes: 0,
      };
    }

    const restTimeHours = totalRestTimeMinutes / 60;
    const calculatedXpTime = restTimeHours * bedMultiplier;
    const cappedXpTime = Math.min(calculatedXpTime, 48); // Cap at 48 hours

    const restedXpHours = Math.floor(cappedXpTime);
    const restedXpMinutes = Math.round((cappedXpTime % 1) * 60);

    return {
      totalRestTimeMinutes,
      isValidRest,
      restedXpTime: cappedXpTime,
      restedXpHours,
      restedXpMinutes,
    };
  }, [time.hours, time.minutes, bedMultiplier]);

  // Format display time
  const formatTime = useCallback((hrs: number, mins: number) => {
    if (hrs === 0) return `${mins}m`;
    if (mins === 0) return `${hrs}h`;
    return `${hrs}h ${mins}m`;
  }, []);

  // Breakdown data for table
  const breakdownData = useMemo(
    () => [
      {
        label: 'Rest Duration',
        value: `${time.hours}:${time.minutes.toString().padStart(2, '0')}`,
      },
      {
        label: 'Bed Multiplier',
        value: `${bedMultiplier}x`,
      },
      {
        label: 'Base XP Time',
        value: `${Math.floor(totalRestTimeMinutes / 60)}:${(totalRestTimeMinutes % 60).toString().padStart(2, '0')}`,
      },
      {
        label: 'Multiplied XP Time',
        value: isValidRest
          ? (() => {
              const multipliedHours = Math.floor(
                (totalRestTimeMinutes / 60) * bedMultiplier
              );
              const multipliedMinutes = Math.round(
                (((totalRestTimeMinutes / 60) * bedMultiplier) % 1) * 60
              );
              return `${multipliedHours}:${multipliedMinutes.toString().padStart(2, '0')}`;
            })()
          : '0:00',
      },
      {
        label: restedXpTime >= 48 ? 'Final XP Time (Capped)' : 'Final XP Time',
        value: isValidRest
          ? `${restedXpHours}:${restedXpMinutes.toString().padStart(2, '0')}`
          : '0:00',
      },
    ],
    [
      time.hours,
      time.minutes,
      bedMultiplier,
      totalRestTimeMinutes,
      isValidRest,
      restedXpHours,
      restedXpMinutes,
      restedXpTime,
    ]
  );

  const breakdownColumns: Column<(typeof breakdownData)[0]>[] = useMemo(
    () => [
      {
        header: 'Item',
        render: item => (
          <span className={theme.text.primary}>{item.label}</span>
        ),
      },
      {
        header: 'Value',
        render: item => (
          <span className={theme.text.secondary}>{item.value}</span>
        ),
      },
    ],
    [theme.text.primary, theme.text.secondary]
  );

  return (
    <div>
      <PageHeader
        title="Rest Calculator"
        description="Calculate how much rested XP time you'll get based on your rest duration and bed multiplier."
      />

      <div className="space-y-6">
        {/* Input Section */}
        <div className={theme.card()}>
          <h2
            className={clsx('text-xl font-semibold mb-4', theme.text.primary)}
          >
            Rest Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-[auto_auto_auto] gap-6 items-end justify-start">
            {/* Time Input */}
            <div>
              <label
                className={clsx(
                  'block text-sm font-medium mb-2',
                  theme.text.primary
                )}
              >
                Rest Duration
              </label>
              <TimeInput
                id="rest-duration"
                value={timeInput}
                onChange={handleTimeChange}
                maxHours={9999}
                stepMinutes={1}
                minMinutes={5}
                className="w-36"
                aria-label="Rest duration in hours and minutes"
              />
            </div>

            {/* Bed Multiplier Input */}
            <div>
              <label
                htmlFor="bedMultiplier"
                className={clsx(
                  'block text-sm font-medium mb-2',
                  theme.text.primary
                )}
              >
                Bed Multiplier
              </label>
              <NumberInput
                id="bedMultiplier"
                value={bedMultiplierInput}
                onChange={handleBedMultiplierChange}
                onBlur={handleBedMultiplierBlur}
                className={theme.input()}
                min={1}
                step={1}
                placeholder="1"
                aria-label="Bed multiplier (whole numbers only, minimum 1)"
              />
            </div>

            {/* Reset Button */}
            <div className="flex flex-col justify-end">
              <button
                onClick={handleReset}
                className={theme.button('secondary', { size: 'md' })}
                type="button"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Validation Warning */}
          {!isValidRest && totalRestTimeMinutes > 0 && (
            <div
              className={clsx(
                'mt-4 p-3 rounded-md border-l-4 border-red-500',
                theme.background.elevated
              )}
            >
              <p className={theme.text.primary}>
                ⚠️ Rest time must be at least 5 minutes to gain any XP bonus.
              </p>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className={theme.card()}>
          <h2
            className={clsx('text-xl font-semibold mb-4', theme.text.primary)}
          >
            Rest Calculation
          </h2>

          {/* Highlight Card for Rested XP Time */}
          {isValidRest && (
            <HighlightCard
              icon={exp_boost}
              iconAlt="XP Boost"
              title={`Rested XP Time: ${formatTime(
                restedXpHours,
                restedXpMinutes
              )}`}
              content={`Your next combat encounters will earn double experience points${
                restedXpTime >= 48 ? ' (capped at maximum)' : ''
              }`}
            />
          )}

          {/* Calculation Breakdown */}
          <div className="mt-6">
            <h3
              className={clsx('text-lg font-semibold mb-3', theme.text.primary)}
            >
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
RestCalculatorPage.displayName = 'RestCalculatorPage';

export default RestCalculatorPage;
