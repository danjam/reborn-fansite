// src/components/ToggleSwitch.tsx
import clsx from 'clsx';
import { memo, ReactNode } from 'react';

import { useTheme } from '@/hooks/useTheme';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  label: ReactNode;
}

const ToggleSwitch = memo(({ checked, onChange, label }: ToggleSwitchProps) => {
  const theme = useTheme();

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onChange}
        className={clsx(
          'relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2',
          theme.focus.ring,
          theme.binary(checked, theme.state.enabled, theme.background.overlay)
        )}
      >
        <span
          className={clsx(
            'inline-block h-4 w-4 transform rounded-full transition-transform bg-white border-2 shadow-sm',
            theme.binary(checked, 'border-white', theme.border.accent),
            checked ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </button>
      <label className={clsx('text-sm font-medium', theme.text.secondary)}>
        {label}
      </label>
    </div>
  );
});

// Add display name for better debugging
ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;
