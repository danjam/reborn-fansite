// src/components/PageHeader.tsx
import clsx from 'clsx';
import { FC, memo, ReactNode, useEffect } from 'react';

import Breadcrumb from '@/components/Breadcrumb';
import { useTheme } from '@/hooks/useTheme';

interface PageHeaderProps {
  title: string;
  description?: ReactNode;
  showBreadcrumb?: boolean;
}

// Memoized header content component - won't re-render when breadcrumb changes
const HeaderContent = memo(
  ({ title, description }: { title: string; description: ReactNode }) => {
    const theme = useTheme();

    return (
      <div className="mb-8">
        <h1 className={clsx('text-3xl font-bold mb-4', theme.text.accent)}>
          {title}
        </h1>
        {description && (
          <div className={clsx('text-lg', theme.text.secondary)}>
            {description}
          </div>
        )}
      </div>
    );
  }
);

// Add display name for better debugging
HeaderContent.displayName = 'HeaderContent';

const PageHeader: FC<PageHeaderProps> = ({
  title,
  description,
  showBreadcrumb = true,
}) => {
  // Automatically set page title based on the header title
  useEffect(() => {
    const originalTitle = document.title;

    // Special case for home page - keep it simple
    if (title === 'Welcome to the Reborn Fansite') {
      document.title = 'Reborn Fansite - Tools & Reference for Reborn Players';
    } else {
      document.title = `${title} - Reborn Fansite`;
    }

    // Cleanup: restore original title when component unmounts
    return () => {
      document.title = originalTitle;
    };
  }, [title]);

  return (
    <>
      {showBreadcrumb && <Breadcrumb />}
      <HeaderContent title={title} description={description} />
    </>
  );
};

export default PageHeader;
