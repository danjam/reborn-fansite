// src/pages/GuidesPage.tsx
import { reference } from '@/assets/img';
import { PageCard, PageCardData } from '@/components/PageCard';
import PageHeader from '@/components/PageHeader';

const GUIDE_ARTICLES: PageCardData[] = [
  {
    id: 'faq',
    title: 'Frequently Asked Questions',
    description:
      'Common questions about Reborn gameplay, mechanics, and strategies',
    icon: reference,
    linkLabel: 'View',
  },
];

const GuidesPage = () => {
  return (
    <div>
      <PageHeader
        title="Guides"
        description="Comprehensive guides and helpful information to improve your Reborn gameplay experience."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GUIDE_ARTICLES.map(article => (
          <PageCard key={article.id} item={article} />
        ))}
      </div>
    </div>
  );
};

// Add display name for better debugging
GuidesPage.displayName = 'GuidesPage';

export default GuidesPage;
