// src/components/Breadcrumb.tsx
import { SPECIAL_ROUTE_NAMES } from '@/constants/routeConstants';
import { useStyles } from '@/hooks';
import { kebabToTitleCase } from '@/utils/stringHelpers';
import { Link, useLocation } from 'react-router-dom';

// Convert kebab-case to title case
const formatRouteSegment = (segment: string): string => {
  // Check for special cases first
  if (SPECIAL_ROUTE_NAMES[segment]) {
    return SPECIAL_ROUTE_NAMES[segment];
  }

  // Use the utility function for kebab-case conversion
  return kebabToTitleCase(segment);
};

export interface BreadcrumbProps {
  className?: string;
}

const Breadcrumb = ({ className = 'mb-6' }: BreadcrumbProps) => {
  const { styles } = useStyles();
  const location = useLocation();

  // Split the pathname into segments
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // Generate breadcrumb items
  const breadcrumbItems = [];

  // Always start with Home
  breadcrumbItems.push({
    label: formatRouteSegment(''),
    path: '/',
    isCurrentPage: pathSegments.length === 0,
  });

  // Build the path incrementally for each segment
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isCurrentPage = index === pathSegments.length - 1;

    breadcrumbItems.push({
      label: formatRouteSegment(segment),
      path: isCurrentPage ? undefined : currentPath,
      isCurrentPage,
    });
  });

  return (
    <div className={className}>
      <nav className="flex items-center space-x-2 text-sm">
        {breadcrumbItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            {index > 0 && <span className={styles.text.muted}>/</span>}
            {item.path ? (
              <Link
                to={item.path}
                className={`${styles.text.accent} hover:underline`}
              >
                {item.label}
              </Link>
            ) : (
              <span className={`${styles.text.secondary} font-bold`}>
                {item.label}
              </span>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Breadcrumb;
