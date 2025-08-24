// src/components/TimeInput.tsx
import clsx from 'clsx';
import React, { forwardRef, useCallback } from 'react';

import { useTheme } from '@/hooks/useTheme';

export interface TimeValue {
  hours: number;
  minutes: number;
}

interface TimeInputProps {
  id?: string;
  value: TimeValue;
  onChange: (value: TimeValue) => void;
  onBlur?: () => void;
  maxHours?: number;
  stepMinutes?: number;
  minMinutes?: number;
  maxMinutes?: number;
  className?: string;
  disabled?: boolean;
  'aria-label'?: string;
}

export const TimeInput = forwardRef<HTMLDivElement, TimeInputProps>(
  (
    {
      id,
      value,
      onChange,
      onBlur,
      maxHours = 9999,
      stepMinutes = 1,
      minMinutes = 0,
      maxMinutes,
      className,
      disabled = false,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    // Convert time to total minutes for step calculations
    const toTotalMinutes = useCallback((time: TimeValue): number => {
      return time.hours * 60 + time.minutes;
    }, []);

    // Convert total minutes back to TimeValue
    const fromTotalMinutes = useCallback(
      (totalMinutes: number): TimeValue => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return { hours: Math.min(hours, maxHours), minutes };
      },
      [maxHours]
    );

    // Handle increment by step
    const handleIncrement = useCallback(() => {
      if (disabled) return;

      const totalMinutes = toTotalMinutes(value);
      const newTotalMinutes = totalMinutes + stepMinutes;

      // Apply max constraint if specified
      const constrainedMinutes =
        maxMinutes !== undefined
          ? Math.min(newTotalMinutes, maxMinutes)
          : newTotalMinutes;

      const newTime = fromTotalMinutes(constrainedMinutes);
      onChange(newTime);
    }, [
      value,
      stepMinutes,
      maxMinutes,
      disabled,
      onChange,
      toTotalMinutes,
      fromTotalMinutes,
    ]);

    // Handle decrement by step
    const handleDecrement = useCallback(() => {
      if (disabled) return;

      const totalMinutes = toTotalMinutes(value);
      const newTotalMinutes = Math.max(totalMinutes - stepMinutes, minMinutes);
      const newTime = fromTotalMinutes(newTotalMinutes);

      onChange(newTime);
    }, [
      value,
      stepMinutes,
      minMinutes,
      disabled,
      onChange,
      toTotalMinutes,
      fromTotalMinutes,
    ]);

    // Handle hours input change
    const handleHoursChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // Allow empty string for clearing
        if (inputValue === '') {
          onChange({ ...value, hours: 0 });
          return;
        }

        const numValue = parseInt(inputValue, 10);
        if (!isNaN(numValue) && numValue >= 0 && numValue <= maxHours) {
          onChange({ ...value, hours: numValue });
        }
      },
      [value, onChange, maxHours]
    );

    // Handle minutes input change
    const handleMinutesChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // Allow empty string for clearing
        if (inputValue === '') {
          onChange({ ...value, minutes: 0 });
          return;
        }

        const numValue = parseInt(inputValue, 10);
        if (!isNaN(numValue) && numValue >= 0 && numValue <= 59) {
          onChange({ ...value, minutes: numValue });
        }
      },
      [value, onChange]
    );

    // Check if we can increment/decrement
    const totalMinutes = toTotalMinutes(value);
    const canIncrement =
      maxMinutes !== undefined
        ? totalMinutes < maxMinutes
        : totalMinutes < maxHours * 60 + 59;
    const canDecrement = totalMinutes > minMinutes;

    return (
      <div
        ref={ref}
        className={clsx('relative', className)}
        aria-label={ariaLabel}
        {...props}
      >
        {/* Main Input Container - styled to look like one input */}
        <div
          className={clsx(
            'flex items-center border rounded-md focus-within:ring-2 pr-8', // Added pr-8 for button space
            theme.border.default,
            theme.background.well,
            theme.focus.ring,
            {
              'opacity-50 cursor-not-allowed': disabled,
            }
          )}
        >
          {/* Hours Input */}
          <input
            id={id ? `${id}-hours` : undefined}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={value.hours.toString()}
            onChange={handleHoursChange}
            onBlur={onBlur}
            disabled={disabled}
            placeholder="0"
            className={clsx(
              'flex-1 min-w-0 px-3 py-2 text-center border-0 bg-transparent focus:outline-none focus:ring-0',
              '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
              theme.text.primary,
              {
                'cursor-not-allowed': disabled,
              }
            )}
            min="0"
            max={maxHours.toString()}
          />

          {/* Separator */}
          <div className={clsx('text-lg font-bold px-1', theme.text.primary)}>
            :
          </div>

          {/* Increment/Decrement Buttons */}
          <div className="absolute inset-y-0 right-0 flex flex-col">
            {/* Increment Button */}
            <button
              type="button"
              onClick={handleIncrement}
              disabled={disabled || !canIncrement}
              className={clsx(
                'flex-1 flex items-center justify-center w-6 rounded-tr border-l',
                'hover:bg-opacity-80 focus:outline-none focus:ring-1 focus:ring-inset',
                theme.border.default,
                theme.background.overlay,
                theme.focus.ring,
                theme.text.secondary,
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-colors duration-150'
              )}
              aria-label={`Increment by ${stepMinutes} minute${stepMinutes !== 1 ? 's' : ''}`}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>

            {/* Decrement Button */}
            <button
              type="button"
              onClick={handleDecrement}
              disabled={disabled || !canDecrement}
              className={clsx(
                'flex-1 flex items-center justify-center w-6 rounded-br border-l border-t',
                'hover:bg-opacity-80 focus:outline-none focus:ring-1 focus:ring-inset',
                theme.border.default,
                theme.background.overlay,
                theme.focus.ring,
                theme.text.secondary,
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-colors duration-150'
              )}
              aria-label={`Decrement by ${stepMinutes} minute${stepMinutes !== 1 ? 's' : ''}`}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* Minutes Input */}
          <input
            id={id ? `${id}-minutes` : undefined}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={value.minutes.toString().padStart(2, '0')}
            onChange={handleMinutesChange}
            onBlur={onBlur}
            disabled={disabled}
            placeholder="00"
            className={clsx(
              'flex-1 min-w-0 px-3 py-2 text-center border-0 bg-transparent focus:outline-none focus:ring-0',
              '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
              theme.text.primary,
              {
                'cursor-not-allowed': disabled,
              }
            )}
            min="0"
            max="59"
          />
        </div>
      </div>
    );
  }
);

TimeInput.displayName = 'TimeInput';
