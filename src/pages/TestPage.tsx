// src/pages/TestPage.tsx
import { useMemo, useState } from 'react';
import clsx from 'clsx';

import {
  agility,
  baby_slime_red,
  boost,
  carrot,
  copper_bar,
  health,
  katie,
  strength,
  zombie_boss,
} from '@/assets/img';
import HighlightCard from '@/components/HighlightCard';
import { PageCard, PageCardData } from '@/components/PageCard';
import PageHeader from '@/components/PageHeader';
import { PixelArtImage } from '@/components/PixelArtImage';
import Table, { type Column } from '@/components/Table';
import TextWithIcon from '@/components/TextWithIcon';
import { useTheme } from '@/hooks/useTheme';

// Test data for demonstrating components
const TEST_CARDS: PageCardData[] = [
  {
    id: 'test-card-1',
    title: 'Test Card 1',
    description:
      'This is a test card to demonstrate the PageCard component with an icon and description.',
    icon: boost,
    linkLabel: 'View Details',
  },
  {
    id: 'test-card-2',
    title: 'Test Card 2',
    description:
      'Another test card showing how multiple cards look in a grid layout.',
    icon: health,
    linkLabel: 'Explore',
  },
];

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
        render: item => <span className={theme.text.secondary}>{item.category}</span>,
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

      {/* NEW: Complete Theme System Showcase */}
      <div className={theme.card()}>
        <h2 className={clsx('text-2xl font-bold mb-6', theme.text.primary)}>
          🎨 Complete Theme System Showcase
        </h2>
        <p className={clsx('mb-8', theme.text.secondary)}>
          Comprehensive demonstration of every ThemeService property and method. Toggle dark/light mode to see all variations.
        </p>

        {/* Theme Context Values */}
        <div className="mb-8">
          <h3 className={clsx('text-xl font-semibold mb-6', theme.text.primary)}>
            Theme Context Values
          </h3>
          <div className={theme.card('border p-4')}>
            <div className={theme.spacing('normal')}>
              <p className={theme.text.secondary}>
                <strong>Current Theme:</strong> {theme.theme.name}
              </p>
              <p className={theme.text.secondary}>
                <strong>Dark Mode:</strong> {theme.darkMode ? 'Enabled' : 'Disabled'}
              </p>
              <button 
                onClick={theme.toggleDarkMode}
                className={theme.button('primary', { size: 'sm' })}
              >
                Toggle Theme
              </button>
            </div>
          </div>
        </div>

        {/* Semantic State Methods */}
        <div className="mb-12">
          <h3 className={clsx('text-xl font-semibold mb-6', theme.text.primary)}>
            Semantic State Methods
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
                  theme.binary(isActive, theme.state.active, theme.state.inactive)
                )}
              >
                Click to toggle: {isActive ? 'Active' : 'Inactive'}
              </button>
              <p className={clsx('text-sm', theme.text.muted)}>
                binary({isActive.toString()}, theme.state.active, theme.state.inactive)
              </p>
            </div>

            {/* Activation Method */}
            <div className={theme.card('border p-4')}>
              <h4 className={clsx('font-semibold mb-3', theme.text.primary)}>
                activation() Method
              </h4>
              <div className={clsx('px-4 py-2 rounded mb-2', theme.activation(isActive))}>
                Activation State: {isActive ? 'Active' : 'Inactive'}
              </div>
              <p className={clsx('text-sm', theme.text.muted)}>
                activation({isActive.toString()})
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
                  theme.selection(isSelected),
                  theme.text.primary
                )}
              >
                Selection: {isSelected ? 'Selected' : 'Unselected'}
              </button>
              <p className={clsx('text-sm', theme.text.muted)}>
                selection({isSelected.toString()})
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
                  theme.enablement(isEnabled),
                  'text-white'
                )}
              >
                State: {isEnabled ? 'Enabled' : 'Disabled'}
              </button>
              <p className={clsx('text-sm', theme.text.muted)}>
                enablement({isEnabled.toString()})
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Composite Methods */}
        <div className="mb-12">
          <h3 className={clsx('text-xl font-semibold mb-6', theme.text.primary)}>
            Enhanced Composite Methods
          </h3>

          {/* Button Method - All Variants and Sizes */}
          <div className="mb-8">
            <h4 className={clsx('font-semibold mb-4', theme.text.primary)}>
              button() Method - All Variants & Sizes
            </h4>
            
            {/* Primary Buttons */}
            <div className={theme.spacing('normal', 'mb-4')}>
              <p className={clsx('font-medium mb-2', theme.text.secondary)}>Primary Variant:</p>
              <div className="flex flex-wrap gap-3">
                <button className={theme.button('primary', { size: 'sm' })}>
                  Small Primary
                </button>
                <button className={theme.button('primary', { size: 'md' })}>
                  Medium Primary
                </button>
                <button className={theme.button('primary', { size: 'lg' })}>
                  Large Primary
                </button>
                <button className={theme.button('primary', { disabled: true })}>
                  Disabled Primary
                </button>
              </div>
            </div>

            {/* Secondary Buttons */}
            <div className={theme.spacing('normal', 'mb-4')}>
              <p className={clsx('font-medium mb-2', theme.text.secondary)}>Secondary Variant:</p>
              <div className="flex flex-wrap gap-3">
                <button className={theme.button('secondary', { size: 'sm' })}>
                  Small Secondary
                </button>
                <button className={theme.button('secondary', { size: 'md' })}>
                  Medium Secondary
                </button>
                <button className={theme.button('secondary', { size: 'lg' })}>
                  Large Secondary
                </button>
                <button className={theme.button('secondary', { disabled: true })}>
                  Disabled Secondary
                </button>
              </div>
            </div>

            {/* Ghost Buttons */}
            <div className={theme.spacing('normal')}>
              <p className={clsx('font-medium mb-2', theme.text.secondary)}>Ghost Variant:</p>
              <div className="flex flex-wrap gap-3">
                <button className={theme.button('ghost', { size: 'sm' })}>
                  Small Ghost
                </button>
                <button className={theme.button('ghost', { size: 'md' })}>
                  Medium Ghost
                </button>
                <button className={theme.button('ghost', { size: 'lg' })}>
                  Large Ghost
                </button>
                <button className={theme.button('ghost', { disabled: true })}>
                  Disabled Ghost
                </button>
              </div>
            </div>
          </div>

          {/* Input Method */}
          <div className="mb-8">
            <h4 className={clsx('font-semibold mb-4', theme.text.primary)}>
              input() Method - All States
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={clsx('block text-sm font-medium mb-1', theme.text.secondary)}>
                  Normal Input
                </label>
                <input 
                  type="text" 
                  placeholder="Normal input"
                  className={theme.input()}
                />
              </div>
              <div>
                <label className={clsx('block text-sm font-medium mb-1', theme.text.secondary)}>
                  Error Input
                </label>
                <input 
                  type="text" 
                  placeholder="Input with error"
                  className={theme.input({ error: true })}
                />
              </div>
              <div>
                <label className={clsx('block text-sm font-medium mb-1', theme.text.secondary)}>
                  Disabled Input
                </label>
                <input 
                  type="text" 
                  placeholder="Disabled input"
                  disabled
                  className={theme.input({ disabled: true })}
                />
              </div>
              <div>
                <label className={clsx('block text-sm font-medium mb-1', theme.text.secondary)}>
                  Custom Classes
                </label>
                <input 
                  type="text" 
                  placeholder="Custom styling"
                  className={theme.input({ className: 'ring-2 ring-purple-500' })}
                />
              </div>
            </div>
          </div>

          {/* Navigation Button Method */}
          <div className="mb-8">
            <h4 className={clsx('font-semibold mb-4', theme.text.primary)}>
              navButton() Method
            </h4>
            <div className="flex gap-2">
              <button className={theme.navButton(true)}>
                Active Nav Item
              </button>
              <button className={theme.navButton(false)}>
                Inactive Nav Item
              </button>
              <button className={theme.navButton(false, 'border-2 border-blue-500')}>
                Custom Nav Item
              </button>
            </div>
          </div>

          {/* Checkbox Method */}
          <div className="mb-8">
            <h4 className={clsx('font-semibold mb-4', theme.text.primary)}>
              checkbox() Method
            </h4>
            <div className={theme.checkbox()}>
              <input type="checkbox" id="test-checkbox" />
              <label htmlFor="test-checkbox" className={theme.text.primary}>
                Themed checkbox container
              </label>
            </div>
          </div>
        </div>

        {/* Direct Accessors */}
        <div className="mb-12">
          <h3 className={clsx('text-xl font-semibold mb-6', theme.text.primary)}>
            Direct Accessors (Stable References)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Text Colors */}
            <div className={theme.card('border p-4')}>
              <h4 className={clsx('font-semibold mb-3', theme.text.primary)}>
                theme.text.*
              </h4>
              <div className={theme.spacing('tight')}>
                <p className={theme.text.primary}>Primary Text</p>
                <p className={theme.text.secondary}>Secondary Text</p>
                <p className={theme.text.accent}>Accent Text</p>
                <p className={theme.text.muted}>Muted Text</p>
              </div>
            </div>

            {/* Surface Colors */}
            <div className={theme.card('border p-4')}>
              <h4 className={clsx('font-semibold mb-3', theme.text.primary)}>
                theme.surface.*
              </h4>
              <div className={theme.spacing('tight')}>
                <div className={clsx('p-2 rounded', theme.surface.base)}>
                  <span className={theme.text.primary}>Base Surface</span>
                </div>
                <div className={clsx('p-2 rounded', theme.surface.elevated)}>
                  <span className={theme.text.primary}>Elevated Surface</span>
                </div>
                <div className={clsx('p-2 rounded', theme.surface.overlay)}>
                  <span className={theme.text.primary}>Overlay Surface</span>
                </div>
                <div className={clsx('p-2 rounded', theme.surface.accent)}>
                  <span className={theme.text.primary}>Accent Surface</span>
                </div>
              </div>
            </div>

            {/* Interactive Colors */}
            <div className={theme.card('border p-4')}>
              <h4 className={clsx('font-semibold mb-3', theme.text.primary)}>
                theme.interactive.*
              </h4>
              <div className={theme.spacing('tight')}>
                <button className={clsx('px-3 py-1 rounded text-sm', theme.interactive.primary)}>
                  Interactive Primary
                </button>
                <button className={clsx('px-3 py-1 rounded text-sm', theme.interactive.secondary)}>
                  Interactive Secondary
                </button>
                <button className={clsx('px-3 py-1 rounded text-sm', theme.interactive.ghost)}>
                  Interactive Ghost
                </button>
              </div>
            </div>

            {/* Border Colors */}
            <div className={theme.card('border p-4')}>
              <h4 className={clsx('font-semibold mb-3', theme.text.primary)}>
                theme.border.*
              </h4>
              <div className={theme.spacing('tight')}>
                <div className={clsx('p-2 border rounded', theme.border.subtle)}>
                  <span className={theme.text.primary}>Subtle Border</span>
                </div>
                <div className={clsx('p-2 border rounded', theme.border.default)}>
                  <span className={theme.text.primary}>Default Border</span>
                </div>
                <div className={clsx('p-2 border rounded', theme.border.accent)}>
                  <span className={theme.text.primary}>Accent Border</span>
                </div>
              </div>
            </div>

            {/* State Colors */}
            <div className={theme.card('border p-4')}>
              <h4 className={clsx('font-semibold mb-3', theme.text.primary)}>
                theme.state.*
              </h4>
              <div className={theme.spacing('tight')}>
                <div className={clsx('p-1 rounded text-sm', theme.state.active)}>Active</div>
                <div className={clsx('p-1 rounded text-sm', theme.state.inactive)}>Inactive</div>
                <div className={clsx('p-1 rounded text-sm', theme.state.selected, theme.text.primary)}>Selected</div>
                <div className={clsx('p-1 rounded text-sm', theme.state.danger, theme.text.primary)}>Danger</div>
              </div>
            </div>

            {/* Feedback Colors */}
            <div className={theme.card('border p-4')}>
              <h4 className={clsx('font-semibold mb-3', theme.text.primary)}>
                theme.feedback.*
              </h4>
              <div className={theme.spacing('tight')}>
                <p className={theme.feedback.loading}>Loading text...</p>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full animate-spin border-t-green-500"></div>
                  <span className={theme.text.secondary}>Spinner</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Utility Methods */}
        <div className="mb-12">
          <h3 className={clsx('text-xl font-semibold mb-6', theme.text.primary)}>
            Utility Methods
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Icon Text Method */}
            <div className={theme.card('border p-4')}>
              <h4 className={clsx('font-semibold mb-3', theme.text.primary)}>
                iconText() Method
              </h4>
              <div className={theme.spacing('normal')}>
                <div className={theme.iconText('sm')}>
                  <PixelArtImage src={health} alt="Health" className="w-4 h-4" />
                  <span className={theme.text.primary}>Small icon text</span>
                </div>
                <div className={theme.iconText('md')}>
                  <PixelArtImage src={strength} alt="Strength" className="w-8 h-8" />
                  <span className={theme.text.primary}>Medium icon text</span>
                </div>
                <div className={theme.iconText('lg')}>
                  <PixelArtImage src={agility} alt="Agility" className="w-16 h-16" />
                  <span className={theme.text.primary}>Large icon text</span>
                </div>
              </div>
            </div>

            {/* Spacing Method */}
            <div className={theme.card('border p-4')}>
              <h4 className={clsx('font-semibold mb-3', theme.text.primary)}>
                spacing() Method
              </h4>
              
              <div className="mb-4">
                <p className={clsx('text-sm mb-2', theme.text.secondary)}>Tight spacing:</p>
                <div className={theme.spacing('tight')}>
                  <div className={clsx('p-1 rounded', theme.surface.overlay, theme.text.primary)}>Item 1</div>
                  <div className={clsx('p-1 rounded', theme.surface.overlay, theme.text.primary)}>Item 2</div>
                  <div className={clsx('p-1 rounded', theme.surface.overlay, theme.text.primary)}>Item 3</div>
                </div>
              </div>

              <div className="mb-4">
                <p className={clsx('text-sm mb-2', theme.text.secondary)}>Normal spacing:</p>
                <div className={theme.spacing('normal')}>
                  <div className={clsx('p-1 rounded', theme.surface.overlay, theme.text.primary)}>Item 1</div>
                  <div className={clsx('p-1 rounded', theme.surface.overlay, theme.text.primary)}>Item 2</div>
                  <div className={clsx('p-1 rounded', theme.surface.overlay, theme.text.primary)}>Item 3</div>
                </div>
              </div>

              <div>
                <p className={clsx('text-sm mb-2', theme.text.secondary)}>Loose spacing:</p>
                <div className={theme.spacing('loose')}>
                  <div className={clsx('p-1 rounded', theme.surface.overlay, theme.text.primary)}>Item 1</div>
                  <div className={clsx('p-1 rounded', theme.surface.overlay, theme.text.primary)}>Item 2</div>
                  <div className={clsx('p-1 rounded', theme.surface.overlay, theme.text.primary)}>Item 3</div>
                </div>
              </div>
            </div>

            {/* Coming Soon Method */}
            <div className={theme.card('border p-4')}>
              <h4 className={clsx('font-semibold mb-3', theme.text.primary)}>
                comingSoon() Method
              </h4>
              <div className={clsx('p-3 rounded', theme.comingSoon())}>
                Coming Soon Feature
              </div>
              <div className={clsx('p-3 rounded mt-2', theme.comingSoon('border-2 border-yellow-600'))}>
                Coming Soon with Custom Border
              </div>
            </div>

            {/* Dark Toggle Button Method */}
            <div className={theme.card('border p-4')}>
              <h4 className={clsx('font-semibold mb-3', theme.text.primary)}>
                darkToggleButton() Method
              </h4>
              <div className="space-y-2">
                <button className={theme.darkToggleButton()}>
                  Dark Mode Toggle
                </button>
                <button 
                  className={theme.darkToggleButton('ring-2 ring-purple-500')}
                  onClick={theme.toggleDarkMode}
                >
                  Toggle Theme (Custom Ring)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Existing content - migrated to use new theme system */}
      
      {/* Image Testing Section */}
      <div className={theme.card()}>
        <h2 className={clsx('text-2xl font-bold mb-6', theme.text.primary)}>
          Image Testing - Pixel Perfect Sizes
        </h2>

        {/* 16px Icons */}
        <div className="mb-8">
          <h3 className={clsx('text-lg font-semibold mb-4', theme.text.primary)}>
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
          <h3 className={clsx('text-lg font-semibold mb-4', theme.text.primary)}>
            32px Icons (w-8 h-8)
          </h3>
          <div className="flex flex-wrap gap-6">
            <div className={theme.iconText('md')}>
              <PixelArtImage
                src={copper_bar}
                alt="Copper Medium"
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
            <div className={theme.iconText('md')}>
              <PixelArtImage
                src={katie}
                alt="Katie Medium"
                className="w-8 h-8 object-contain"
              />
              <span className={theme.text.secondary}>Katie</span>
            </div>
          </div>
        </div>

        {/* 64px Icons */}
        <div className="mb-8">
          <h3 className={clsx('text-lg font-semibold mb-4', theme.text.primary)}>
            64px Icons (w-16 h-16)
          </h3>
          <div className="flex flex-wrap gap-6">
            <div className={theme.iconText('lg')}>
              <PixelArtImage
                src={health}
                alt="Health Large"
                className="w-16 h-16 object-contain"
              />
              <span className={theme.text.secondary}>Health Potion</span>
            </div>
            <div className={theme.iconText('lg')}>
              <PixelArtImage
                src={zombie_boss}
                alt="Boss Large"
                className="w-16 h-16 object-contain"
              />
              <span className={theme.text.secondary}>Zombie Boss</span>
            </div>
          </div>
        </div>
      </div>

      {/* Component Testing Section */}
      <div className={theme.card()}>
        <h2 className={clsx('text-2xl font-bold mb-6', theme.text.primary)}>
          Standard Components (Legacy Patterns Migrated)
        </h2>

        {/* TextWithIcon Component */}
        <h3 className={clsx('text-lg font-semibold mb-4', theme.text.primary)}>
          TextWithIcon Components
        </h3>
        <div className={theme.spacing('normal', 'mb-8')}>
          <TextWithIcon
            item={{ id: 'test1', name: 'Health Potion', icon: health }}
            iconSize="sm"
            textClassName={theme.text.primary}
          />
          <TextWithIcon
            item={{
              id: 'test2',
              name: 'Baby Slime (Red)',
              icon: baby_slime_red,
            }}
            iconSize="md"
            textClassName={theme.text.primary}
          />
          <TextWithIcon
            item={{ id: 'test3', name: 'Zombie Boss', icon: zombie_boss }}
            iconSize="lg"
            textClassName={theme.text.primary}
          />
        </div>
      </div>

      {/* Page Cards */}
      <div>
        <h2 className={clsx('text-2xl font-bold mb-6', theme.text.primary)}>
          Page Cards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {TEST_CARDS.map(card => (
            <PageCard key={card.id} item={card} />
          ))}
        </div>
      </div>

      {/* Highlight Card */}
      <HighlightCard
        icon={boost}
        iconAlt="Boost Crystal"
        title="Highlight Card Example"
        content="This is a **highlight card** component that supports **bold text** formatting and is useful for displaying important information with an icon."
      />

      {/* Table Component */}
      <div className={theme.card()}>
        <h2 className={clsx('text-2xl font-bold mb-6', theme.text.primary)}>
          Table Component
        </h2>
        <Table
          data={TEST_TABLE_DATA}
          columns={tableColumns}
          initialSort={{ column: 'name', direction: 'asc' }}
        />
      </div>

      {/* Lorem Ipsum Content */}
      <div className={theme.card()}>
        <h2 className={clsx('text-2xl font-bold mb-6', theme.text.primary)}>
          Lorem Ipsum Content
        </h2>

        <div className="prose prose-lg max-w-none">
          <p className={clsx(theme.text.secondary, 'mb-4')}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>

          <p className={clsx(theme.text.secondary, 'mb-4')}>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Sed ut perspiciatis
            unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>

          <p className={clsx(theme.text.secondary, 'mb-6')}>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
            ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
            numquam eius modi tempora incidunt ut labore et dolore magnam
            aliquam quaerat voluptatem.
          </p>

          <h3 className={clsx('text-xl font-semibold mb-4', theme.text.primary)}>
            Subsection with More Content
          </h3>

          <p className={clsx(theme.text.secondary, 'mb-4')}>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga.
          </p>

          <p className={clsx(theme.text.secondary)}>
            Et harum quidem rerum facilis est et expedita distinctio. Nam libero
            tempore, cum soluta nobis est eligendi optio cumque nihil impedit
            quo minus id quod maxime placeat facere possimus, omnis voluptas
            assumenda est, omnis dolor repellendus.
          </p>
        </div>
      </div>
    </div>
  );
};

// Add display name for better debugging
TestPage.displayName = 'TestPage';

export default TestPage;