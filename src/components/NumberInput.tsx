// src/components/NumberInput.tsx
import clsx from 'clsx';
import { forwardRef, useCallback, useRef } from 'react';

import { useTheme } from '@/hooks/useTheme';

interface NumberInputProps {
  id?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  'aria-label'?: string;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      id,
      value,
      onChange,
      onBlur,
      min = 0,
      max,
      step = 1,
      placeholder,
      className,
      disabled = false,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const inputRef = useRef<HTMLInputElement>(null);

    // Use forwarded ref or internal ref
    const finalRef = (ref as React.RefObject<HTMLInputElement>) || inputRef;

    const handleIncrement = useCallback(() => {
      if (disabled) return;

      const input = finalRef.current;
      if (!input) return;

      const currentValue = parseFloat(String(value)) || 0;
      const newValue = currentValue + step;

      // Check max constraint
      if (max !== undefined && newValue > max) return;

      // Create synthetic event
      const syntheticEvent = {
        target: { ...input, value: String(newValue) },
        currentTarget: input,
      } as React.ChangeEvent<HTMLInputElement>;

      onChange(syntheticEvent);
      input.focus();
    }, [value, step, max, disabled, onChange, finalRef]);

    const handleDecrement = useCallback(() => {
      if (disabled) return;

      const input = finalRef.current;
      if (!input) return;

      const currentValue = parseFloat(String(value)) || 0;
      const newValue = currentValue - step;

      // Check min constraint
      if (newValue < min) return;

      // Create synthetic event
      const syntheticEvent = {
        target: { ...input, value: String(newValue) },
        currentTarget: input,
      } as React.ChangeEvent<HTMLInputElement>;

      onChange(syntheticEvent);
      input.focus();
    }, [value, step, min, disabled, onChange, finalRef]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (disabled) return;

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          handleIncrement();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          handleDecrement();
        }
      },
      [handleIncrement, handleDecrement, disabled]
    );

    return (
      <div className="relative">
        {/* Main Input */}
        <input
          ref={finalRef}
          id={id}
          type="text" // Use text to avoid native spinners
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={ariaLabel}
          className={clsx(
            // Hide native spinners and add padding for our buttons
            '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            'pr-8', // Extra padding for our buttons
            theme.input({ disabled, ...(className && { className }) })
          )}
          {...props}
        />

        {/* Custom Increment/Decrement Buttons */}
        <div className="absolute inset-y-0 right-0 flex flex-col">
          {/* Increment Button */}
          <button
            type="button"
            onClick={handleIncrement}
            disabled={
              disabled ||
              (max !== undefined && parseFloat(String(value)) >= max)
            }
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
            aria-label="Increment"
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
            disabled={disabled || parseFloat(String(value)) <= min}
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
            aria-label="Decrement"
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
      </div>
    );
  }
);

NumberInput.displayName = 'NumberInput';
