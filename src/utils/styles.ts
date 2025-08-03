// src/utils/styles.js

/**
 * Generate consistent styling objects based on dark mode state
 * @param {boolean} darkMode - Whether dark mode is active
 * @param {Object} overrides - Optional style overrides
 * @returns {Object} Complete styling object
 */
export const createStyles = (darkMode, overrides = {}) => {
  const baseStyles = {
    card: `rounded-lg shadow-md p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`,
    text: {
      primary: darkMode ? 'text-gray-200' : 'text-gray-800',
      secondary: darkMode ? 'text-gray-300' : 'text-gray-700',
      accent: darkMode ? 'text-green-400' : 'text-green-600',
      muted: darkMode ? 'text-gray-400' : 'text-gray-500'
    },
    bg: {
      primary: darkMode ? 'bg-gray-900' : 'bg-gray-50',
      secondary: darkMode ? 'bg-gray-800' : 'bg-white',
      accent: darkMode ? 'bg-green-900/20' : 'bg-green-100'
    },
    input: `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
      darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
    }`,
    border: darkMode ? 'border-gray-600' : 'border-gray-200',
    checkbox: `flex items-center space-x-3 px-3 py-2 border rounded-md ${
      darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
    }`,
    button: {
      primary: 'px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors',
      secondary: `px-4 py-2 rounded-md focus:outline-none focus:ring-2 transition-colors ${
        darkMode ? 'bg-gray-600 text-gray-200 hover:bg-gray-500 focus:ring-gray-400' : 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500'
      }`,
      darkToggle: `px-4 py-2 rounded-md focus:outline-none focus:ring-2 transition-colors ${
        darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600 focus:ring-yellow-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500'
      }`,
      nav: `px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500`
    }
  };

  // Deep merge overrides
  return mergeDeep(baseStyles, overrides);
};

/**
 * Deep merge utility for combining style objects
 */
function mergeDeep(target, source) {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, { [key]: source[key] });
        else
          output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}