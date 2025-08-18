// src/pages/TestPage.tsx
import clsx from 'clsx';
import { useMemo, useState } from 'react';

import {
  agility,
  boost,
  carrot,
  copper_bar,
  health,
  strength,
} from '@/assets/img';
import PageHeader from '@/components/PageHeader';
import { PixelArtImage } from '@/components/PixelArtImage';
import Table, { type Column } from '@/components/Table';
import TextWithIcon from '@/components/TextWithIcon';
import { useTheme } from '@/hooks/useTheme';

// Test data for cards component
// const TEST_CARD_DATA = [
//   {
//     id: 'test-card-1',
//     title: 'Test Card 1',
//     description:
//       'This is a test card to demonstrate how cards look in different themes.',
//     icon: boost,
//     linkLabel: 'View Details',
//   },
//   {
//     id: 'test-card-2',
//     title: 'Test Card 2',
//     description:
//       'Another test card showing how multiple cards look in a grid layout.',
//     icon: health,
//     linkLabel: 'Explore',
//   },
// ];

// Test data for table component
const TEST_TABLE_DATA = [
  {
    id: 'item1',
    name: 'Health Potion',
    category: 'Potion',
    value: 150,
    icon: health,
  },
  {
    id: 'item2',
    name: 'Strength Potion',
    category: 'Potion',
    value: 200,
    icon: strength,
  },
  {
    id: 'item3',
    name: 'Agility Potion',
    category: 'Potion',
    value: 175,
    icon: agility,
  },
  {
    id: 'item4',
    name: 'Copper Bar',
    category: 'Metal',
    value: 50,
    icon: copper_bar,
  },
  {
    id: 'item5',
    name: 'Carrot',
    category: 'Vegetable',
    value: 10,
    icon: carrot,
  },
];

const TestPage = () => {
  const theme = useTheme();

  // State for interactive theme examples
  const [isActive, setIsActive] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  // Memoized table columns
  const tableColumns: Column<(typeof TEST_TABLE_DATA)[0]>[] = useMemo(
    () => [
      {
        header: 'Item',
        minWidth: '200px',
        sortBy: 'name',
        render: item => (
          <TextWithIcon
            item={item}
            iconSize="md"
            textClassName={clsx('font-medium', theme.text.primary)}
          />
        ),
      },
      {
        header: 'Category',
        minWidth: '120px',
        sortBy: 'category',
        render: item => (
          <span className={theme.text.secondary}>{item.category}</span>
        ),
      },
      {
        header: 'Value',
        minWidth: '100px',
        sortBy: 'value',
        defaultSortDirection: 'desc',
        render: item => (
          <span className={clsx('font-medium', theme.text.secondary)}>
            {item.value.toLocaleString()}
          </span>
        ),
      },
    ],
    [theme.text.primary, theme.text.secondary]
  );

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title="UI Test Page"
        description="This is a test page to demonstrate all standard components, image sizes, and the complete theme system. Used for UI testing and validation."
      />

      {/* Multi-Theme System Showcase */}
      <div className={theme.card()}>
        <h2 className={clsx('text-2xl font-bold mb-6', theme.text.primary)}>
          Multi-Theme System Showcase
        </h2>
        <p className={clsx('mb-8', theme.text.secondary)}>
          Comprehensive demonstration of the theme system using theme-agnostic
          components. Switch between themes to see all variations.
        </p>

        {/* Theme Context Values */}
        <div className="mb-8">
          <h3
            className={clsx('text-xl font-semibold mb-6', theme.text.primary)}
          >
            Current Theme Information
          </h3>
          <div className={theme.card('border p-4')}>
            <div className={theme.spacing('normal')}>
              <p className={theme.text.secondary}>
                <strong>Active Theme:</strong> {theme.currentTheme}
              </p>
              <p className={theme.text.secondary}>
                <strong>Available Themes:</strong>{' '}
                {theme.availableThemes.join(', ')}
              </p>
              <div className="flex gap-2 mt-4">
                {theme.availableThemes.map(themeName => (
                  <button
                    key={themeName}
                    onClick={() => theme.setTheme(themeName)}
                    className={clsx(
                      theme.button('primary', { size: 'sm' }),
                      theme.currentTheme === themeName &&
                        'ring-2 ring-yellow-400'
                    )}
                  >
                    {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Theme-Agnostic Component Methods */}
        <div className="mb-12">
          <h3
            className={clsx('text-xl font-semibold mb-6', theme.text.primary)}
          >
            Theme-Agnostic Component Methods
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Binary Method */}
            <div className={theme.card('border p-4')}>
              <h4 className={clsx('font-semibold mb-3', theme.text.primary)}>
                binary() Method
              </h4>
              <button
                onClick={() => setIsActive(!isActive)}
                className={clsx(
                  'px-4 py-2 rounded transition-colors mb-2',
                  theme.binary(
                    isActive,
                    theme.state.active,
                    theme.state.inactive
                  )
                )}
              >
                Click to toggle: {isActive ? 'Active' : 'Inactive'}
              </button>
              <p className={clsx('text-xs', theme.text.muted)}>
                Uses theme.binary() to switch between theme.state.active and
                theme.state.inactive
              </p>
            </div>

            {/* Selection Method */}
            <div className={theme.card('border p-4')}>
              <h4 className={clsx('font-semibold mb-3', theme.text.primary)}>
                selection() Method
              </h4>
              <button
                onClick={() => setIsSelected(!isSelected)}
                className={clsx(
                  'px-4 py-2 rounded transition-colors mb-2',
                  theme.selection(isSelected)
                )}
              >
                {isSelected ? 'Selected' : 'Not Selected'}
              </button>
              <p className={clsx('text-xs', theme.text.muted)}>
                Uses theme.selection() for selected/unselected states
              </p>
            </div>

            {/* Enablement Method */}
            <div className={theme.card('border p-4')}>
              <h4 className={clsx('font-semibold mb-3', theme.text.primary)}>
                enablement() Method
              </h4>
              <button
                onClick={() => setIsEnabled(!isEnabled)}
                className={clsx(
                  'px-4 py-2 rounded transition-colors mb-2',
                  theme.enablement(isEnabled)
                )}
              >
                {isEnabled ? 'Enabled' : 'Disabled'}
              </button>
              <p className={clsx('text-xs', theme.text.muted)}>
                Uses theme.enablement() for enabled/disabled states
              </p>
            </div>

            {/* Interactive Components */}
            <div className={theme.card('border p-4')}>
              <h4 className={clsx('font-semibold mb-3', theme.text.primary)}>
                Interactive Components
              </h4>
              <div className="space-y-2">
                <button className={theme.button('primary', { size: 'sm' })}>
                  Primary Button
                </button>
                <button className={theme.button('secondary', { size: 'sm' })}>
                  Secondary Button
                </button>
                <button className={theme.button('ghost', { size: 'sm' })}>
                  Ghost Button
                </button>
              </div>
              <p className={clsx('text-xs mt-2', theme.text.muted)}>
                All buttons use theme.button() with different variants
              </p>
            </div>
          </div>
        </div>

        {/* Theme Properties Showcase */}
        <div className="mb-12">
          <h3
            className={clsx('text-xl font-semibold mb-6', theme.text.primary)}
          >
            Theme Color Properties
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Text Colors */}
            <div className={theme.card('border p-4')}>
              <h4 className={clsx('font-semibold mb-3', theme.text.primary)}>
                Text Colors
              </h4>
              <div className={theme.spacing('tight')}>
                <p className={theme.text.primary}>Primary Text</p>
                <p className={theme.text.secondary}>Secondary Text</p>
                <p className={theme.text.accent}>Accent Text</p>
                <p className={theme.text.muted}>Muted Text</p>
              </div>
            </div>

            {/* background Colors */}
            <div className={theme.card('border p-4')}>
              <h4 className={clsx('font-semibold mb-3', theme.text.primary)}>
                background Colors
              </h4>
              <div className={theme.spacing('tight')}>
                <div
                  className={clsx(
                    'p-2 rounded text-xs',
                    theme.background.base,
                    theme.text.primary
                  )}
                >
                  Base background
                </div>
                <div
                  className={clsx(
                    'p-2 rounded text-xs',
                    theme.background.elevated,
                    theme.text.primary
                  )}
                >
                  Elevated background
                </div>
                <div
                  className={clsx(
                    'p-2 rounded text-xs',
                    theme.background.overlay,
                    theme.text.primary
                  )}
                >
                  Overlay background
                </div>
                <div
                  className={clsx(
                    'p-2 rounded text-xs',
                    theme.background.accent,
                    theme.text.primary
                  )}
                >
                  Accent background
                </div>
              </div>
            </div>

            {/* Border Colors */}
            <div className={theme.card('border p-4')}>
              <h4 className={clsx('font-semibold mb-3', theme.text.primary)}>
                Border Colors
              </h4>
              <div className={theme.spacing('tight')}>
                <div
                  className={clsx(
                    'p-2 border rounded text-xs',
                    theme.border.subtle,
                    theme.text.secondary
                  )}
                >
                  Subtle Border
                </div>
                <div
                  className={clsx(
                    'p-2 border rounded text-xs',
                    theme.border.default,
                    theme.text.secondary
                  )}
                >
                  Default Border
                </div>
                <div
                  className={clsx(
                    'p-2 border rounded text-xs',
                    theme.border.accent,
                    theme.text.secondary
                  )}
                >
                  Accent Border
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Testing Section */}
      <div className={theme.card()}>
        <h2 className={clsx('text-2xl font-bold mb-6', theme.text.primary)}>
          Image Testing - Pixel Perfect Sizes
        </h2>

        {/* 16px Icons */}
        <div className="mb-8">
          <h3
            className={clsx('text-lg font-semibold mb-4', theme.text.primary)}
          >
            16px Icons (w-4 h-4)
          </h3>
          <div className="flex flex-wrap gap-6">
            <div className={theme.iconText('sm')}>
              <PixelArtImage
                src={health}
                alt="Health Small"
                className="w-4 h-4 object-contain"
              />
              <span className={theme.text.secondary}>Health Potion</span>
            </div>
            <div className={theme.iconText('sm')}>
              <PixelArtImage
                src={strength}
                alt="Strength Small"
                className="w-4 h-4 object-contain"
              />
              <span className={theme.text.secondary}>Strength Potion</span>
            </div>
            <div className={theme.iconText('sm')}>
              <PixelArtImage
                src={agility}
                alt="Agility Small"
                className="w-4 h-4 object-contain"
              />
              <span className={theme.text.secondary}>Agility Potion</span>
            </div>
          </div>
        </div>

        {/* 32px Icons */}
        <div className="mb-8">
          <h3
            className={clsx('text-lg font-semibold mb-4', theme.text.primary)}
          >
            32px Icons (w-8 h-8)
          </h3>
          <div className="flex flex-wrap gap-6">
            <div className={theme.iconText('md')}>
              <PixelArtImage
                src={health}
                alt="Health Medium"
                className="w-8 h-8 object-contain"
              />
              <span className={theme.text.secondary}>Health Potion</span>
            </div>
            <div className={theme.iconText('md')}>
              <PixelArtImage
                src={copper_bar}
                alt="Copper Bar Medium"
                className="w-8 h-8 object-contain"
              />
              <span className={theme.text.secondary}>Copper Bar</span>
            </div>
            <div className={theme.iconText('md')}>
              <PixelArtImage
                src={carrot}
                alt="Carrot Medium"
                className="w-8 h-8 object-contain"
              />
              <span className={theme.text.secondary}>Carrot</span>
            </div>
          </div>
        </div>

        {/* 64px Icons */}
        <div className="mb-8">
          <h3
            className={clsx('text-lg font-semibold mb-4', theme.text.primary)}
          >
            64px Icons (w-16 h-16)
          </h3>
          <div className="flex flex-wrap gap-6">
            <div className={theme.iconText('lg')}>
              <PixelArtImage
                src={boost}
                alt="Boost Large"
                className="w-16 h-16 object-contain"
              />
              <span className={theme.text.secondary}>Boost Potion</span>
            </div>
            <div className={theme.iconText('lg')}>
              <PixelArtImage
                src={strength}
                alt="Strength Large"
                className="w-16 h-16 object-contain"
              />
              <span className={theme.text.secondary}>Strength Potion</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table Component Testing */}
      <div className={theme.card()}>
        <h2 className={clsx('text-2xl font-bold mb-6', theme.text.primary)}>
          Table Component Testing
        </h2>
        <p className={clsx('mb-6', theme.text.secondary)}>
          Interactive table with sorting, theme-aware styling, and proper data
          presentation.
        </p>

        <Table
          data={TEST_TABLE_DATA}
          columns={tableColumns}
          initialSort={{ column: 'item', direction: 'asc' }}
        />
      </div>

      {/* Spacing and Layout Testing */}
      <div className={theme.card()}>
        <h2 className={clsx('text-2xl font-bold mb-6', theme.text.primary)}>
          Spacing and Layout Testing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tight Spacing */}
          <div className={theme.card('border p-4')}>
            <h3 className={clsx('font-semibold mb-3', theme.text.primary)}>
              Tight Spacing
            </h3>
            <div className={theme.spacing('tight')}>
              <p className={theme.text.secondary}>Line 1</p>
              <p className={theme.text.secondary}>Line 2</p>
              <p className={theme.text.secondary}>Line 3</p>
            </div>
          </div>

          {/* Normal Spacing */}
          <div className={theme.card('border p-4')}>
            <h3 className={clsx('font-semibold mb-3', theme.text.primary)}>
              Normal Spacing
            </h3>
            <div className={theme.spacing('normal')}>
              <p className={theme.text.secondary}>Line 1</p>
              <p className={theme.text.secondary}>Line 2</p>
              <p className={theme.text.secondary}>Line 3</p>
            </div>
          </div>

          {/* Loose Spacing */}
          <div className={theme.card('border p-4')}>
            <h3 className={clsx('font-semibold mb-3', theme.text.primary)}>
              Loose Spacing
            </h3>
            <div className={theme.spacing('loose')}>
              <p className={theme.text.secondary}>Line 1</p>
              <p className={theme.text.secondary}>Line 2</p>
              <p className={theme.text.secondary}>Line 3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Elements Testing */}
      <div className={theme.card()}>
        <h2 className={clsx('text-2xl font-bold mb-6', theme.text.primary)}>
          Form Elements Testing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input States */}
          <div className={theme.card('border p-4')}>
            <h3 className={clsx('font-semibold mb-3', theme.text.primary)}>
              Input States
            </h3>
            <div className={theme.spacing('normal')}>
              <input
                type="text"
                placeholder="Normal input"
                className={theme.input()}
              />
              <input
                type="text"
                placeholder="Error input"
                className={theme.input({ error: true })}
              />
              <input
                type="text"
                placeholder="Disabled input"
                disabled
                className={theme.input({ disabled: true })}
              />
            </div>
          </div>

          {/* Checkbox Examples */}
          <div className={theme.card('border p-4')}>
            <h3 className={clsx('font-semibold mb-3', theme.text.primary)}>
              Checkbox Styling
            </h3>
            <div className={theme.spacing('normal')}>
              <div className={theme.checkbox()}>
                <input type="checkbox" id="test1" />
                <label htmlFor="test1" className={theme.text.secondary}>
                  Option 1
                </label>
              </div>
              <div className={theme.checkbox()}>
                <input type="checkbox" id="test2" />
                <label htmlFor="test2" className={theme.text.secondary}>
                  Option 2
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* State Demonstration */}
      <div className={theme.card()}>
        <h2 className={clsx('text-2xl font-bold mb-6', theme.text.primary)}>
          State Management Demo
        </h2>
        <p className={clsx('mb-6', theme.text.secondary)}>
          Interactive demonstration of how theme state methods work with
          different UI states.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={theme.card('border p-4')}>
            <h3 className={clsx('font-semibold mb-3', theme.text.primary)}>
              Current States
            </h3>
            <div className={theme.spacing('normal')}>
              <p className={theme.text.secondary}>
                Active:{' '}
                <span className={theme.activation(isActive)}>
                  {isActive ? 'Yes' : 'No'}
                </span>
              </p>
              <p className={theme.text.secondary}>
                Selected:{' '}
                <span className={theme.selection(isSelected)}>
                  {isSelected ? 'Yes' : 'No'}
                </span>
              </p>
              <p className={theme.text.secondary}>
                Enabled:{' '}
                <span className={theme.enablement(isEnabled)}>
                  {isEnabled ? 'Yes' : 'No'}
                </span>
              </p>
            </div>
          </div>

          <div className={theme.card('border p-4')}>
            <h3 className={clsx('font-semibold mb-3', theme.text.primary)}>
              State Controls
            </h3>
            <div className={theme.spacing('normal')}>
              <button
                onClick={() => setIsActive(!isActive)}
                className={theme.button('secondary', { size: 'sm' })}
              >
                Toggle Active
              </button>
              <button
                onClick={() => setIsSelected(!isSelected)}
                className={theme.button('secondary', { size: 'sm' })}
              >
                Toggle Selected
              </button>
              <button
                onClick={() => setIsEnabled(!isEnabled)}
                className={theme.button('secondary', { size: 'sm' })}
              >
                Toggle Enabled
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
