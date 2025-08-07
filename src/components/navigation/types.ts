// src/components/navigation/types.ts
import { Styles } from '@/utils/styles';

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

export interface NavigationProps {
  navigationItems: NavigationItem[];
  darkMode: boolean;
  styles: Styles;
}

export interface BaseNavigationProps extends NavigationProps {
  onItemClick?: () => void;
}
