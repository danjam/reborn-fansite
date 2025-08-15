// src/components/PageHeader.tsx
import { useStyles } from '@/hooks';
import React from 'react';
import Breadcrumb from './Breadcrumb';

interface PageHeaderProps {
  title: string;
  description?: string;
  showBreadcrumb?: boolean;
}

// Memoized header content component - won't re-render when breadcrumb changes
const HeaderContent = React.memo(
  ({
    title,
    description,
  }: {
    title: string;
    description: string | undefined;
  }) => {
    const { styles } = useStyles();

    return (
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-4 ${styles.text.accent}`}>
          {title}
        </h1>
        {description && (
          <p className={`text-lg ${styles.text.secondary}`}>{description}</p>
        )}
      </div>
    );
  }
);

// Add display name for better debugging
HeaderContent.displayName = 'HeaderContent';

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  showBreadcrumb = true,
}) => {
  return (
    <>
      {showBreadcrumb && <Breadcrumb />}
      <HeaderContent title={title} description={description} />
    </>
  );
};

export default PageHeader;
