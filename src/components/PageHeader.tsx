// src/components/PageHeader.tsx
import { useStyles } from '@/hooks';
import Breadcrumb from './Breadcrumb';

interface PageHeaderProps {
  title: string;
  description?: string;
  showBreadcrumb?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  showBreadcrumb = true,
}) => {
  const { styles } = useStyles();

  return (
    <>
      {showBreadcrumb && <Breadcrumb />}

      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-4 ${styles.text.accent}`}>
          {title}
        </h1>
        {description && (
          <p className={`text-lg ${styles.text.secondary}`}>{description}</p>
        )}
      </div>
    </>
  );
};

export default PageHeader;
