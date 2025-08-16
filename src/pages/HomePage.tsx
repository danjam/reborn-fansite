// src/pages/HomePage.tsx
import { reference } from '@/assets/img';
import { PageCard, PageCardData } from '@/components/PageCard';
import { useStyles } from '@/hooks';

const HomePage = () => {
  const { styles } = useStyles();

  const features: PageCardData[] = [
    {
      id: 'tools',
      icon: reference,
      title: 'Tools',
      description: 'Calculators and utilities to optimize your gameplay',
      linkLabel: 'Explore Tools ⇒',
    },
    {
      id: 'reference',
      icon: reference,
      title: 'Reference',
      description: 'Quick lookup guides and comprehensive data tables',
      linkLabel: 'View Reference ⇒',
    },
  ];

  return (
    <div className="py-16">
      <div className="text-center mb-16">
        <h2 className={`text-4xl font-bold mb-6 ${styles.text.accent}`}>
          Welcome to Reborn Fansite
        </h2>
        <p
          className={`text-xl mb-8 max-w-2xl mx-auto ${styles.text.secondary}`}
        >
          Your ultimate resource for Reborn game guides, calculators, and tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map(feature => (
          <PageCard key={feature.id} item={feature} styles={styles} />
        ))}
      </div>
    </div>
  );
};

// Add display name for better debugging
HomePage.displayName = 'HomePage';

export default HomePage;
