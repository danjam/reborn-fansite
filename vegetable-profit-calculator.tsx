import React, { useState, useMemo, useCallback, memo } from 'react';

const INITIAL_FARM_CONFIG = {
  totalPlots: 75,
  fertilised: true,
  cauldronLevel: 1
};

const INITIAL_VEGETABLES = [
  { name: "Broccoli", growTime: 240, amountNeeded: 6, potionName: "Speed (M)", potionPrice: 6500 },
  { name: "Cabbage", growTime: 360, amountNeeded: 4, potionName: "Precision (M)", potionPrice: 1 },
  { name: "Carrot", growTime: 80, amountNeeded: 3, potionName: "Health", potionPrice: 1750 },
  { name: "Cauliflower", growTime: 160, amountNeeded: 3, potionName: "Speed", potionPrice: 2750 },
  { name: "Eggplant", growTime: 120, amountNeeded: 6, potionName: "Health (M)", potionPrice: 3625 },
  { name: "Onion", growTime: 96, amountNeeded: 5, potionName: "Defence", potionPrice: 3000 },
  { name: "Potato", growTime: 16, amountNeeded: 30, potionName: "Efficiency", potionPrice: 2750 },
  { name: "Pumpkin", growTime: 240, amountNeeded: 2, potionName: "Precision", potionPrice: 1 },
  { name: "Strawberry", growTime: 40, amountNeeded: 12, potionName: "Agility", potionPrice: 2938 },
  { name: "Turnip", growTime: 48, amountNeeded: 10, potionName: "Strength", potionPrice: 2438 }
];

const TABLE_HEADERS = {
  vegetables: ['Name', 'Grow Time (min)', 'Amount Needed', 'Potion', 'Potion Sell Price', 'Actions'],
  results: ['Rank', 'Vegetable', 'Profit/Minute', 'Max Potions', 'Total Profit', 'Plots Needed']
};

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

const VegetableProfitCalculator = () => {
  const [farmConfig, setFarmConfig] = useState(INITIAL_FARM_CONFIG);
  const [vegetables, setVegetables] = useState(INITIAL_VEGETABLES);
  const [darkMode, setDarkMode] = useState(false);
  
  const vegetablesPerPlot = farmConfig.fertilised ? 2 : 1;
  const canRemoveVegetables = vegetables.length > 1;

  // Optimized styling utilities with consistent naming
  const styles = useMemo(() => ({
    card: `rounded-lg shadow-md p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`,
    text: {
      primary: darkMode ? 'text-gray-200' : 'text-gray-800',
      secondary: darkMode ? 'text-gray-300' : 'text-gray-700',
      accent: darkMode ? 'text-green-400' : 'text-green-600'
    },
    input: `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
      darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
    }`,
    border: darkMode ? 'border-gray-600' : 'border-gray-200',
    checkbox: `flex items-center space-x-3 px-3 py-2 border rounded-md ${
      darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
    }`,
    button: {
      primary: 'px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500',
      secondary: `px-4 py-2 rounded-md focus:outline-none focus:ring-2 ${
        darkMode ? 'bg-gray-600 text-gray-200 hover:bg-gray-500 focus:ring-gray-400' : 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500'
      }`,
      darkToggle: `px-4 py-2 rounded-md focus:outline-none focus:ring-2 ${
        darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600 focus:ring-yellow-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500'
      }`,
      remove: canRemoveVegetables 
        ? 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500'
        : 'bg-gray-400 text-gray-600 cursor-not-allowed'
    }
  }), [darkMode, canRemoveVegetables]);

  const calculateVegetableMetrics = useCallback((vegetable) => {
    const plotsNeeded = vegetable.amountNeeded / vegetablesPerPlot;
    const maxPotions = Math.floor(farmConfig.totalPlots / plotsNeeded);
    const actualPotions = maxPotions * farmConfig.cauldronLevel;
    const totalProfitPerCycle = actualPotions * vegetable.potionPrice;
    const profitPerMinute = totalProfitPerCycle / vegetable.growTime;
    
    return {
      name: vegetable.name,
      growTime: vegetable.growTime,
      plotsNeeded,
      maxPotions: actualPotions,
      totalProfitPerCycle,
      profitPerMinute
    };
  }, [farmConfig.totalPlots, farmConfig.cauldronLevel, vegetablesPerPlot]);

  const analysis = useMemo(() => 
    vegetables.map(calculateVegetableMetrics).sort((a, b) => b.profitPerMinute - a.profitPerMinute),
    [vegetables, calculateVegetableMetrics]
  );

  // Event handlers with proper dependency management
  const updateFarmConfig = useCallback((field, value) => {
    setFarmConfig(prev => ({ ...prev, [field]: Number(value) }));
  }, []);

  const updateCauldronLevel = useCallback((value) => {
    setFarmConfig(prev => ({ ...prev, cauldronLevel: Number(value) }));
  }, []);

  const toggleFertilised = useCallback((checked) => {
    setFarmConfig(prev => ({ ...prev, fertilised: checked }));
  }, []);

  const updateVegetable = useCallback((index, field, value) => {
    setVegetables(prev => prev.map((veg, i) => 
      i === index ? { ...veg, [field]: (field === 'name' || field === 'potionName') ? value : Number(value) } : veg
    ));
  }, []);

  const addVegetable = useCallback(() => {
    setVegetables(prev => [...prev, {
      name: "New Vegetable",
      potionName: "New Potion",
      growTime: 60,
      amountNeeded: 5,
      potionPrice: 1000
    }]);
  }, []);

  const removeVegetable = useCallback((index) => {
    if (vegetables.length > 1) {
      setVegetables(prev => prev.filter((_, i) => i !== index));
    }
  }, [vegetables.length]);

  const resetToInitial = useCallback(() => {
    setFarmConfig(INITIAL_FARM_CONFIG);
    setVegetables(INITIAL_VEGETABLES);
  }, []);

  const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), []);

  const bestCrop = analysis[0];

  // Render helpers for cleaner JSX
  const renderTableHeader = useCallback((headers) => (
    <tr className={`border-b-2 ${styles.border}`}>
      {headers.map(header => (
        <th key={header} className={`text-left py-3 px-3 font-medium ${styles.text.secondary}`}>
          {header}
        </th>
      ))}
    </tr>
  ), [styles.border, styles.text.secondary]);

  const renderVegetableHeader = useCallback(() => {
    const headerData = [
      { label: 'Name', help: "The vegetable's name" },
      { label: 'Grow Time (min)', help: 'How long it takes to grow the vegetable in minutes' },
      { label: 'Amount Needed', help: 'How many vegetables are needed per potion' },
      { label: 'Potion', help: 'The potion that can be crafted from this vegetable' },
      { label: 'Potion Sell Price', help: 'The amount of coins for selling a single potion' },
      { label: 'Actions', help: null }
    ];

    return (
      <tr className={`border-b ${styles.border}`}>
        {headerData.map(({ label, help }) => (
          <th 
            key={label} 
            className={`text-left py-2 px-2 font-medium ${styles.text.secondary} ${help ? 'cursor-help' : ''}`}
            title={help || undefined}
          >
            {label}
          </th>
        ))}
      </tr>
    );
  }, [styles.border, styles.text.secondary]);

  return (
    <div className={`max-w-6xl mx-auto p-6 min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className={`text-3xl font-bold ${styles.text.accent}`}>
          🌱 Crop Profit Calculator
        </h1>
        <button onClick={toggleDarkMode} className={styles.button.darkToggle}>
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      {/* Farm Configuration */}
      <div className={styles.card}>
        <h2 className={`text-xl font-semibold mb-4 ${styles.text.primary}`}>
          👨‍🌾 Farm Configuration
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label 
              className={`block text-sm font-medium mb-2 ${styles.text.secondary} cursor-help`}
              title="Total number of spaces to grow crops in your farm"
            >
              Total Plots
            </label>
            <input
              type="number"
              min="1"
              value={farmConfig.totalPlots}
              onChange={(e) => updateFarmConfig('totalPlots', e.target.value)}
              className={styles.input}
            />
          </div>
          <div>
            <label 
              className={`block text-sm font-medium mb-2 ${styles.text.secondary} cursor-help`}
              title="Multiplier applied from your house, increases the number of potions created"
            >
              Cauldron Level
            </label>
            <input
              type="number"
              min="1"
              value={farmConfig.cauldronLevel}
              onChange={(e) => updateCauldronLevel(e.target.value)}
              className={styles.input}
            />
          </div>
          <div>
            <label 
              className={`block text-sm font-medium mb-2 ${styles.text.secondary} cursor-help`}
              title="Whether your plots are fertilised"
            >
              Fertilised
            </label>
            <div className={styles.checkbox}>
              <input
                type="checkbox"
                checked={farmConfig.fertilised}
                onChange={(e) => toggleFertilised(e.target.checked)}
                className="w-5 h-5 text-green-600 bg-white border-2 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
              />
              <span className={`text-sm font-medium ${styles.text.secondary}`}>
                {vegetablesPerPlot} vegetable{vegetablesPerPlot > 1 ? 's' : ''} per plot
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Vegetable Configuration */}
      <div className={styles.card}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-semibold ${styles.text.primary}`}>
            🥕 Vegetable Details
          </h2>
          <div className="flex space-x-2">
            <button onClick={resetToInitial} className={styles.button.secondary}>
              Reset
            </button>
            <button onClick={addVegetable} className={styles.button.primary}>
              + Add Vegetable
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>{renderVegetableHeader()}</thead>
            <tbody>
              {vegetables.map((veg, index) => (
                <tr key={index} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <td className="py-2 px-2">
                    <TableInput
                      type="text"
                      value={veg.name}
                      onChange={(e) => updateVegetable(index, 'name', e.target.value)}
                      darkMode={darkMode}
                      required
                    />
                  </td>
                  <td className="py-2 px-2">
                    <TableInput
                      type="number"
                      value={veg.growTime}
                      onChange={(e) => updateVegetable(index, 'growTime', e.target.value)}
                      darkMode={darkMode}
                      min="1"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <TableInput
                      type="number"
                      value={veg.amountNeeded}
                      onChange={(e) => updateVegetable(index, 'amountNeeded', e.target.value)}
                      darkMode={darkMode}
                      min="1"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <TableInput
                      type="text"
                      value={veg.potionName}
                      onChange={(e) => updateVegetable(index, 'potionName', e.target.value)}
                      darkMode={darkMode}
                      required
                    />
                  </td>
                  <td className="py-2 px-2">
                    <TableInput
                      type="number"
                      value={veg.potionPrice}
                      onChange={(e) => updateVegetable(index, 'potionPrice', e.target.value)}
                      darkMode={darkMode}
                      min="1"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <button
                      onClick={() => removeVegetable(index)}
                      disabled={!canRemoveVegetables}
                      className={`px-2 py-1 rounded text-sm focus:outline-none focus:ring-1 ${styles.button.remove}`}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results */}
      <div className={styles.card}>
        <h2 className={`text-xl font-semibold mb-4 ${styles.text.primary}`}>
          🏆 RANKING: Best crops for maximum profit
        </h2>
        
        {bestCrop && (
          <div className={`mb-6 p-4 rounded-lg border-l-4 ${
            darkMode ? 'bg-green-900/20 border-green-400' : 'bg-green-100 border-green-500'
          }`}>
            <h3 className={`text-lg font-semibold mb-2 ${styles.text.accent}`}>
              💡 Key Insights:
            </h3>
            <ul className={`space-y-1 ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
              <li>• <strong>{bestCrop.name}</strong> is the optimal choice with <strong>{bestCrop.profitPerMinute.toFixed(2)} profit/minute</strong></li>
              <li>• Optimizes both growth time and space efficiency</li>
              <li>• Strategy: Plant only <strong>{bestCrop.name.toLowerCase()}s</strong> for maximum profit!</li>
            </ul>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>{renderTableHeader(TABLE_HEADERS.results)}</thead>
            <tbody>
              {analysis.map((veg, index) => (
                <tr key={index} className={`border-b ${
                  darkMode ? 'border-gray-700' : 'border-gray-100'
                } ${
                  index === 0 ? (darkMode ? 'bg-green-900/30' : 'bg-green-50') : ''
                }`}>
                  <td className={`py-3 px-3 font-semibold ${styles.text.primary}`}>{index + 1}</td>
                  <td className={`py-3 px-3 font-medium ${styles.text.primary}`}>{veg.name}</td>
                  <td className={`py-3 px-3 font-semibold ${styles.text.accent}`}>{veg.profitPerMinute.toFixed(2)}</td>
                  <td className={`py-3 px-3 ${styles.text.secondary}`}>{veg.maxPotions}</td>
                  <td className={`py-3 px-3 ${styles.text.secondary}`}>{veg.totalProfitPerCycle.toLocaleString()}</td>
                  <td className={`py-3 px-3 ${styles.text.secondary}`}>{veg.plotsNeeded.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VegetableProfitCalculator;