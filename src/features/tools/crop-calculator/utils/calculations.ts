/**
 * Calculate metrics for a single vegetable
 * @param {Object} vegetable - The vegetable data
 * @param {Object} farmConfig - Farm configuration (totalPlots, cauldronLevel, fertilised)
 * @returns {Object} Calculated metrics
 */
export const calculateVegetableMetrics = (vegetable, farmConfig) => {
  const vegetablesPerPlot = farmConfig.fertilised ? 2 : 1;
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
};

/**
 * Calculate and rank all vegetables by profit efficiency
 * @param {Array} vegetables - Array of vegetable data
 * @param {Object} farmConfig - Farm configuration
 * @returns {Array} Sorted array of vegetable metrics
 */
export const calculateRankedVegetables = (vegetables, farmConfig) => {
  return vegetables
    .map(veg => calculateVegetableMetrics(veg, farmConfig))
    .sort((a, b) => b.profitPerMinute - a.profitPerMinute);
};

/**
 * Get the optimal crop choice
 * @param {Array} vegetables - Array of vegetable data
 * @param {Object} farmConfig - Farm configuration
 * @returns {Object} Best vegetable choice with metrics
 */
export const getOptimalCrop = (vegetables, farmConfig) => {
  const analysis = calculateRankedVegetables(vegetables, farmConfig);
  return analysis[0] || null;
};