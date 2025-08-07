import { CardData } from '@/components/Card';

// Export all tools
export { default as CropCalculator } from './crop-calculator';

// Tool configuration
export const TOOLS_LIST: CardData[] = [
  { 
    id: 'crop-calculator', 
    title: 'Crop Profit Calculator', 
    icon: '🌱', 
    description: 'Calculate optimal crop profits and farming strategies',
    linkLabel: 'View Crop Calculator →',
  }
];