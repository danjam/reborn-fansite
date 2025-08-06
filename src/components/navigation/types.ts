// src/components/navigation/types.ts
export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

export interface NavigationProps {
  navigationItems: NavigationItem[];
  darkMode: boolean;
  styles: any; // You can type this more specifically based on your styles object
}

export interface BaseNavigationProps extends NavigationProps {
  onItemClick?: () => void;
}