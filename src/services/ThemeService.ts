// src/services/ThemeService.ts
import { themes } from '@/themes';
import type {
  ButtonOptions,
  ButtonVariant,
  IconSize,
  InputOptions,
  SpacingVariant,
  TableRowOptions,
  Theme,
} from '@/types/theme';
import clsx from 'clsx';

// Global cache for ThemeService instances (following GameDataService pattern)
const themeServiceCache = new Map<string, ThemeService>();

export class ThemeService {
  private theme: Theme;

  // Internal caches for expensive string operations (performance optimization)
  private _cachedCard?: string;
  private _cachedCheckbox?: string;
  private _cachedInput?: string;
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

  // Static theme management methods (moved from themes/index.ts)
  static getAvailableThemeNames(): string[] {
    return Object.keys(themes);
  }

  static isValidTheme(themeName: string): themeName is keyof typeof themes {
    return themeName in themes;
  }

  static getThemeByName(themeName: string): Theme {
    if (!ThemeService.isValidTheme(themeName)) {
      const fallbackTheme = Object.keys(themes)[0] as keyof typeof themes;
      console.warn(
        `Invalid theme name: ${themeName}, falling back to '${fallbackTheme}'`
      );
      return themes[fallbackTheme];
    }
    return themes[themeName];
  }

  // Semantic state methods
  binary(isTrue: boolean, trueKey: string, falseKey: string): string {
    return isTrue ? trueKey : falseKey;
  }

  activation(isActive: boolean): string {
    return isActive
      ? this.theme.colors.state.active
      : this.theme.colors.state.inactive;
  }

  selection(isSelected: boolean): string {
    return isSelected
      ? this.theme.colors.state.selected
      : this.theme.colors.state.unselected;
  }

  enablement(isEnabled: boolean): string {
    return isEnabled
      ? this.theme.colors.state.enabled
      : this.theme.colors.state.disabled;
  }

  // Enhanced composite methods with clsx
  card(className?: string): string {
    if (!this._cachedCard) {
      this._cachedCard = clsx(
        'rounded-lg shadow-md p-6',
        this.theme.colors.background.elevated
      );
    }
    return clsx(this._cachedCard, className);
  }

  input(options: InputOptions = {}): string {
    const { error = false, disabled = false, className } = options;

    if (!this._cachedInput) {
      this._cachedInput = clsx(
        'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
        this.theme.colors.focus.ring,
        this.theme.colors.background.well,
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
      const baseClasses = 'rounded-md focus:outline-none focus:ring-2';
      const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
      };

      const variantClasses = this.theme.colors.interactive[variant];

      const buttonClass = clsx(baseClasses, sizeClasses[size], variantClasses, {
        'opacity-50 cursor-not-allowed': disabled,
      });

      this._buttonCache.set(cacheKey, buttonClass);
    }

    return clsx(this._buttonCache.get(cacheKey), className);
  }

  navButton(isActive: boolean, className?: string): string {
    if (isActive) {
      return clsx(
        'px-4 py-2 rounded-md focus:outline-none focus:ring-2',
        this.theme.colors.focus.ring,
        this.theme.colors.state.active,
        'shadow-sm',
        className
      );
    }

    return clsx(
      'px-4 py-2 rounded-md focus:outline-none focus:ring-2',
      this.theme.colors.focus.ring,
      this.theme.colors.state.inactive,
      `hover:${this.theme.colors.background.overlay}`,
      `hover:${this.theme.colors.text.primary}`,
      className
    );
  }

  checkbox(className?: string): string {
    if (!this._cachedCheckbox) {
      this._cachedCheckbox = clsx(
        'flex items-center space-x-3 px-3 py-2 border rounded-md',
        this.theme.colors.border.default,
        this.theme.colors.background.overlay
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

  get background() {
    return this.theme.colors.background;
  }

  get interactive() {
    return this.theme.colors.interactive;
  }

  get border() {
    return this.theme.colors.border;
  }

  get focus() {
    return this.theme.colors.focus;
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

      this._spacingCache.set(
        cacheKey,
        clsx(spacingClasses[variant], className)
      );
    }

    return this._spacingCache.get(cacheKey)!;
  }

  // Method to clear caches when theme changes (for performance)
  private clearCaches(): void {
    delete this._cachedCard;
    delete this._cachedCheckbox;
    delete this._cachedInput;
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
