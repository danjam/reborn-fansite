// src/hooks/useTheme.ts
import { ThemeContext } from '@/contexts/ThemeContext';
import { ThemeService } from '@/services/ThemeService';
import { useContext, useMemo } from 'react';

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  const { theme, currentTheme, setTheme, availableThemes } = context;

  // Return cached ThemeService instance for stable references (following GameDataService pattern)
  const themeService = useMemo(() => {
    return ThemeService.getInstance(theme);
  }, [theme]);

  // Return both the service methods and properties explicitly
  return {
    // Semantic state methods
    binary: themeService.binary.bind(themeService),
    activation: themeService.activation.bind(themeService),
    selection: themeService.selection.bind(themeService),
    enablement: themeService.enablement.bind(themeService),

    // Enhanced composite methods
    card: themeService.card.bind(themeService),
    input: themeService.input.bind(themeService),
    button: themeService.button.bind(themeService),
    navButton: themeService.navButton.bind(themeService),
    checkbox: themeService.checkbox.bind(themeService),
    tableRow: themeService.tableRow.bind(themeService),

    // Utility methods
    iconText: themeService.iconText.bind(themeService),
    spacing: themeService.spacing.bind(themeService),

    // Direct accessors (stable references)
    text: themeService.text,
    surface: themeService.surface,
    interactive: themeService.interactive,
    border: themeService.border,
    feedback: themeService.feedback,
    state: themeService.state,

    // Multi-theme selection methods
    currentTheme,
    setTheme,
    availableThemes,

    // Direct theme access if needed
    theme,
  };
};
