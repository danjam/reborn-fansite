// src/features/tools/crop-calculator/components/TableInput/TableInput.jsx

import React, { memo } from 'react';

// Memoized input component to prevent unnecessary re-renders
const TableInput = memo(({ type, value, onChange, darkMode, ...props }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    className={`w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-green-500 ${
      darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
    }`}
    {...props}
  />
));

TableInput.displayName = 'TableInput';

export default TableInput;