// src/hooks/useDebounce.ts
import { useCallback, useRef } from 'react';

/**
 * Custom hook for debouncing function calls
 *
 * @param callback - The function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced version of the callback
 *
 * @example
 * ```tsx
 * const debouncedSave = useDebounce((data: string) => {
 *   saveToAPI(data);
 * }, 500);
 *
 * // In component:
 * const handleChange = (value: string) => {
 *   setValue(value);
 *   debouncedSave(value); // Will only call saveToAPI 500ms after last call
 * };
 * ```
 */
export const useDebounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  );
};
