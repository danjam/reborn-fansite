// src/services/ThemeService.ts
import clsx from 'clsx';
import type { 
  Theme, 
  ButtonVariant, 
  ButtonOptions, 
  InputOptions, 
  TableRowOptions, 
  IconSize, 
  SpacingVariant 
} from '@/types/theme';

// Global cache for ThemeService instances (following GameDataService pattern)
const themeServiceCache = new Map<string, ThemeService>();

export class ThemeService {
  private theme: Theme;
  
  // Internal caches for expensive string operations (performance optimization)
  private _cachedCard?: string;
  private _cachedCheckbox?: string;
  private _cachedInput?: string;
  private _cachedComingSoon?: string;
  private _cachedDarkToggleButton?: string;
  private _iconTextCache = new Map<string, string>();
  private _spacingCache = new Map<string, string>();
  private _buttonCache = new Map<string, string>();

  constructor(theme: Theme) {
    this.theme = theme;
  }

  // Static factory method for cached instances (performance optimization)
  static getInstance(theme: Theme): ThemeService {
    const cacheKey = theme.name;
    if (!themeServiceCache.has(cacheKey)) {
      themeServiceCache.set(cacheKey, new ThemeService(theme));
    }
    return themeServiceCache.get(cacheKey)!;
  }

  // Semantic state methods
  binary(isTrue: boolean, trueKey: string, falseKey: string): string {
    return isTrue ? trueKey : falseKey;
  }

  activation(isActive: boolean): string {
    return isActive ? this.theme.colors.state.active : this.theme.colors.state.inactive;
  }

  selection(isSelected: boolean): string {
    return isSelected ? this.theme.colors.state.selected : this.theme.colors.state.unselected;
  }

  enablement(isEnabled: boolean): string {
    return isEnabled ? this.theme.colors.state.enabled : this.theme.colors.state.disabled;
  }

  // Enhanced composite methods with clsx
  card(className?: string): string {
    if (!this._cachedCard) {
      this._cachedCard = clsx(
        'rounded-lg shadow-md p-6 mb-6',
        this.theme.colors.surface.elevated
      );
    }
    return clsx(this._cachedCard, className);
  }

  input(options: InputOptions = {}): string {
    const { error = false, disabled = false, className } = options;
    
    if (!this._cachedInput) {
      this._cachedInput = clsx(
        'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500',
        this.theme.colors.surface.elevated,
        this.theme.colors.border.default,
        this.theme.colors.text.primary
      );
    }

    return clsx(
      this._cachedInput,
      {
        'border-red-500 focus:ring-red-500': error,
        'opacity-50 cursor-not-allowed': disabled,
      },
      className
    );
  }

  button(variant: ButtonVariant, options: ButtonOptions = {}): string {
    const { size = 'md', disabled = false, className } = options;
    const cacheKey = `${variant}-${size}-${disabled}`;
    
    if (!this._buttonCache.has(cacheKey)) {
      const baseClasses = 'rounded-md focus:outline-none focus:ring-2 transition-colors';
      const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
      };
      
      const variantClasses = this.theme.colors.interactive[variant];
      
      const buttonClass = clsx(
        baseClasses,
        sizeClasses[size],
        variantClasses,
        {
          'opacity-50 cursor-not-allowed': disabled,
        }
      );
      
      this._buttonCache.set(cacheKey, buttonClass);
    }

    return clsx(this._buttonCache.get(cacheKey), className);
  }

  navButton(isActive: boolean, className?: string): string {
    const baseClasses = 'px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500';
    
    if (isActive) {
      return clsx(baseClasses, this.theme.colors.state.active, 'shadow-sm', className);
    }
    
    return clsx(
      baseClasses,
      this.theme.colors.state.inactive,
      this.theme.name === 'dark' 
        ? 'hover:bg-gray-700 hover:text-white'
        : 'hover:bg-gray-100',
      className
    );
  }

  checkbox(className?: string): string {
    if (!this._cachedCheckbox) {
      this._cachedCheckbox = clsx(
        'flex items-center space-x-3 px-3 py-2 border rounded-md',
        this.theme.colors.border.default,
        this.theme.colors.surface.overlay
      );
    }
    return clsx(this._cachedCheckbox, className);
  }

  tableRow(options: TableRowOptions = {}): string {
    const { isDanger = false, isSelected = false, className } = options;
    
    return clsx(
      {
        [this.theme.colors.state.danger]: isDanger,
        [this.theme.colors.state.selected]: isSelected,
      },
      this.theme.colors.border.subtle,
      'border-b',
      className
    );
  }

  // Direct accessors (stable references)
  get text() {
    return this.theme.colors.text;
  }

  get surface() {
    return this.theme.colors.surface;
  }

  get interactive() {
    return this.theme.colors.interactive;
  }

  get border() {
    return this.theme.colors.border;
  }

  get feedback() {
    return this.theme.colors.feedback;
  }

  get state() {
    return this.theme.colors.state;
  }

  // Utility methods inspired by existing code patterns
  iconText(iconSize: IconSize, className?: string): string {
    const cacheKey = `${iconSize}-${className || ''}`;
    
    if (!this._iconTextCache.has(cacheKey)) {
      const spacingClasses = 'flex items-center space-x-3';
      this._iconTextCache.set(cacheKey, clsx(spacingClasses, className));
    }
    
    return this._iconTextCache.get(cacheKey)!;
  }

  spacing(variant: SpacingVariant, className?: string): string {
    const cacheKey = `${variant}-${className || ''}`;
    
    if (!this._spacingCache.has(cacheKey)) {
      const spacingClasses = {
        tight: 'space-y-1',
        normal: 'space-y-2',
        loose: 'space-y-4',
      };
      
      this._spacingCache.set(cacheKey, clsx(spacingClasses[variant], className));
    }
    
    return this._spacingCache.get(cacheKey)!;
  }

  comingSoon(className?: string): string {
    if (!this._cachedComingSoon) {
      this._cachedComingSoon = this.theme.name === 'dark' 
        ? 'bg-yellow-900 text-yellow-300'
        : 'bg-yellow-100 text-yellow-800';
    }
    return clsx(this._cachedComingSoon, className);
  }

  darkToggleButton(className?: string): string {
    if (!this._cachedDarkToggleButton) {
      this._cachedDarkToggleButton = clsx(
        'px-4 py-2 rounded-md focus:outline-none focus:ring-2 transition-colors',
        this.theme.name === 'dark'
          ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600 focus:ring-yellow-500'
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500'
      );
    }
    return clsx(this._cachedDarkToggleButton, className);
  }

  // Method to clear caches when theme changes (for performance)
  private clearCaches(): void {
    delete this._cachedCard;
    delete this._cachedCheckbox;
    delete this._cachedInput;
    delete this._cachedComingSoon;
    delete this._cachedDarkToggleButton;
    this._iconTextCache.clear();
    this._spacingCache.clear();
    this._buttonCache.clear();
  }

  // Update theme (for theme switching)
  updateTheme(newTheme: Theme): void {
    this.theme = newTheme;
    this.clearCaches();
  }
}