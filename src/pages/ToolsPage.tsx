// src/pages/ToolsPage.tsx
import { carrot } from '@/assets/img';
import { PageCard, PageCardData } from '@/components/PageCard';
import PageHeader from '@/components/PageHeader';
import { useStyles } from '@/hooks';

// Tools list - moved inline from features/tools
const TOOLS_LIST: PageCardData[] = [
  {
    id: 'crop-calculator',
    title: 'Crop Profit Calculator',
    icon: carrot,
    description: 'Calculate optimal crop profits and farming strategies',
    linkLabel: 'View Crop Calculator →',
  },
];

const ToolsPage = () => {
  const { styles } = useStyles();

  return (
    <div>
      <PageHeader
        title="Game Tools"
        description="Calculators and utilities to help optimize your gameplay experience."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TOOLS_LIST.map(tool => (
          <PageCard key={tool.id} item={tool} styles={styles} />
        ))}
      </div>
    </div>
  );
};

export default ToolsPage;
