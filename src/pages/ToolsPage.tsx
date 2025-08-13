// src/pages/ToolsPage.tsx
import { Card, CardData } from '@/components/Card';
import { useStyles } from '@/contexts/StylesContext';

// Tools list - moved inline from features/tools
const TOOLS_LIST: CardData[] = [
  {
    id: 'crop-calculator',
    title: 'Crop Profit Calculator',
    icon: '🌱', // Keep icon for the card, just removing from headers
    description: 'Calculate optimal crop profits and farming strategies',
    linkLabel: 'View Crop Calculator →',
  },
];

const ToolsPage = () => {
  const { styles } = useStyles();

  return (
    <div>
      <div className="mb-8">
        <h2 className={`text-3xl font-bold mb-4 ${styles.text.accent}`}>
          Game Tools
        </h2>
        <p className={`text-lg ${styles.text.secondary}`}>
          Calculators and utilities to help optimize your gameplay experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TOOLS_LIST.map(tool => (
          <Card key={tool.id} item={tool} styles={styles} />
        ))}
      </div>
    </div>
  );
};

export default ToolsPage;
