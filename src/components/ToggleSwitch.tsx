// src/components/ToggleSwitch.tsx
import React from 'react';

import { useStyles } from '@/hooks';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

const ToggleSwitch = React.memo(
  ({ checked, onChange, label }: ToggleSwitchProps) => {
    const { styles } = useStyles();

    return (
      <div className="flex items-center justify-between">
        <label className={`text-sm font-medium ${styles.text.secondary}`}>
          {label}
        </label>
        <button
          onClick={onChange}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
            checked ? 'bg-green-600' : 'bg-gray-400 dark:bg-gray-600'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              checked ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    );
  }
);

// Add display name for better debugging
ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;
