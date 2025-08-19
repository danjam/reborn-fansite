// src/pages/guides/YourHousePage.tsx
import PageHeader from '@/components/PageHeader';

const YourHousePage = () => {
  return (
    <div>
      <PageHeader
        title="Your House"
        description="Housing upgrades, decorations, and building progression guide to transform your home into a castle."
      />

      {/* Content will be added later */}
    </div>
  );
};

// Add display name for better debugging
YourHousePage.displayName = 'YourHousePage';

export default YourHousePage;
