// src/components/ToggleSwitch.tsx
import clsx from 'clsx';
import { memo } from 'react';

import { useTheme } from '@/hooks/useTheme';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

const ToggleSwitch = memo(({ checked, onChange, label }: ToggleSwitchProps) => {
  const theme = useTheme();

  return (
    <div className="flex items-center justify-between">
      <label className={clsx('text-sm font-medium', theme.text.secondary)}>
        {label}
      </label>
      <button
        onClick={onChange}
        className={clsx(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
          theme.binary(checked, 'bg-green-600', theme.surface.overlay)
        )}
      >
        <span
          className={clsx(
            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
            checked ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </button>
    </div>
  );
});

// Add display name for better debugging
ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;
