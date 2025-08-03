// src/features/tools/index.js

// Export all tools
export { default as CropCalculator } from './crop-calculator';

// Tool configuration
export const TOOLS_LIST = [
  { 
    id: 'crop-calculator', 
    name: 'Crop Profit Calculator', 
    icon: '🌱', 
    description: 'Calculate optimal crop profits and farming strategies',
    component: 'CropCalculator'
  }
  // Add more tools here as they're developed
];