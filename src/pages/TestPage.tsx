// src/pages/TestPage.tsx
import { useMemo } from 'react';

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
import { useStyles } from '@/hooks';

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
  const { styles } = useStyles();

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
            textClassName={`font-medium ${styles.text.primary}`}
          />
        ),
      },
      {
        header: 'Category',
        minWidth: '120px',
        sortBy: 'category',
        render: item => <span>{item.category}</span>,
      },
      {
        header: 'Value',
        minWidth: '100px',
        sortBy: 'value',
        defaultSortDirection: 'desc',
        render: item => (
          <span className="font-medium">{item.value.toLocaleString()}</span>
        ),
      },
    ],
    [styles.text.primary]
  );

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title="UI Test Page"
        description="This is a test page to demonstrate all standard components and image sizes. Used for UI testing and validation."
      />

      {/* Image Size Testing Section */}
      <div className={styles.card}>
        <h2 className={`text-2xl font-bold ${styles.text.primary} mb-6`}>
          Pixel Art Icon Size Testing
        </h2>

        <h3 className={`text-lg font-semibold ${styles.text.primary} mb-4`}>
          Standard Icon Sizes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* 16px (sm) */}
          <div className={`p-4 ${styles.bg.accent} rounded-lg`}>
            <h4 className={`font-medium ${styles.text.primary} mb-3`}>
              Small (16px)
            </h4>
            <div className="flex items-center space-x-2 mb-2">
              <PixelArtImage
                src={katie}
                alt="Katie Small"
                className="w-4 h-4 object-contain"
              />
              <span className={styles.text.secondary}>Katie (Logo)</span>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <PixelArtImage
                src={health}
                alt="Health Small"
                className="w-4 h-4 object-contain"
              />
              <span className={styles.text.secondary}>Health Potion</span>
            </div>
            <div className="flex items-center space-x-2">
              <PixelArtImage
                src={zombie_boss}
                alt="Boss Small"
                className="w-4 h-4 object-contain"
              />
              <span className={styles.text.secondary}>Zombie Boss</span>
            </div>
          </div>

          {/* 32px (md) */}
          <div className={`p-4 ${styles.bg.accent} rounded-lg`}>
            <h4 className={`font-medium ${styles.text.primary} mb-3`}>
              Medium (32px)
            </h4>
            <div className="flex items-center space-x-3 mb-3">
              <PixelArtImage
                src={katie}
                alt="Katie Medium"
                className="w-8 h-8 object-contain"
              />
              <span className={styles.text.secondary}>Katie (Logo)</span>
            </div>
            <div className="flex items-center space-x-3 mb-3">
              <PixelArtImage
                src={health}
                alt="Health Medium"
                className="w-8 h-8 object-contain"
              />
              <span className={styles.text.secondary}>Health Potion</span>
            </div>
            <div className="flex items-center space-x-3">
              <PixelArtImage
                src={zombie_boss}
                alt="Boss Medium"
                className="w-8 h-8 object-contain"
              />
              <span className={styles.text.secondary}>Zombie Boss</span>
            </div>
          </div>

          {/* 64px (lg) */}
          <div className={`p-4 ${styles.bg.accent} rounded-lg`}>
            <h4 className={`font-medium ${styles.text.primary} mb-3`}>
              Large (64px)
            </h4>
            <div className="flex items-center space-x-4 mb-4">
              <PixelArtImage
                src={katie}
                alt="Katie Large"
                className="w-16 h-16 object-contain"
              />
              <span className={styles.text.secondary}>Katie (Logo)</span>
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <PixelArtImage
                src={health}
                alt="Health Large"
                className="w-16 h-16 object-contain"
              />
              <span className={styles.text.secondary}>Health Potion</span>
            </div>
            <div className="flex items-center space-x-4">
              <PixelArtImage
                src={zombie_boss}
                alt="Boss Large"
                className="w-16 h-16 object-contain"
              />
              <span className={styles.text.secondary}>Zombie Boss</span>
            </div>
          </div>
        </div>
      </div>

      {/* Component Testing Section */}
      <div className={styles.card}>
        <h2 className={`text-2xl font-bold ${styles.text.primary} mb-6`}>
          Standard Components
        </h2>

        {/* Buttons */}
        <h3 className={`text-lg font-semibold ${styles.text.primary} mb-4`}>
          Buttons
        </h3>
        <div className="flex flex-wrap gap-4 mb-8">
          <button className={styles.button.primary}>Primary Button</button>
          <button className={styles.button.secondary}>Secondary Button</button>
          <button className={styles.button.darkToggle}>
            Dark Toggle Button
          </button>
        </div>

        {/* Text Components */}
        <h3 className={`text-lg font-semibold ${styles.text.primary} mb-4`}>
          Text Styles
        </h3>
        <div className="space-y-2 mb-8">
          <p className={styles.text.primary}>
            Primary text - main content and headings
          </p>
          <p className={styles.text.secondary}>
            Secondary text - descriptions and supporting content
          </p>
          <p className={styles.text.accent}>
            Accent text - highlights and important elements
          </p>
          <p className={styles.text.muted}>
            Muted text - subtle information and metadata
          </p>
        </div>

        {/* TextWithIcon Component */}
        <h3 className={`text-lg font-semibold ${styles.text.primary} mb-4`}>
          TextWithIcon Components
        </h3>
        <div className="space-y-4 mb-8">
          <TextWithIcon
            item={{ id: 'test1', name: 'Health Potion', icon: health }}
            iconSize="sm"
            textClassName={styles.text.primary}
          />
          <TextWithIcon
            item={{
              id: 'test2',
              name: 'Baby Slime (Red)',
              icon: baby_slime_red,
            }}
            iconSize="md"
            textClassName={styles.text.primary}
          />
          <TextWithIcon
            item={{ id: 'test3', name: 'Zombie Boss', icon: zombie_boss }}
            iconSize="lg"
            textClassName={styles.text.primary}
          />
        </div>
      </div>

      {/* Page Cards */}
      <div>
        <h2 className={`text-2xl font-bold ${styles.text.primary} mb-6`}>
          Page Cards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {TEST_CARDS.map(card => (
            <PageCard key={card.id} item={card} styles={styles} />
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
      <div className={styles.card}>
        <h2 className={`text-2xl font-bold ${styles.text.primary} mb-6`}>
          Table Component
        </h2>
        <Table
          data={TEST_TABLE_DATA}
          columns={tableColumns}
          initialSort={{ column: 'name', direction: 'asc' }}
        />
      </div>

      {/* Lorem Ipsum Content */}
      <div className={styles.card}>
        <h2 className={`text-2xl font-bold ${styles.text.primary} mb-6`}>
          Lorem Ipsum Content
        </h2>

        <div className="prose prose-lg max-w-none">
          <p className={`${styles.text.secondary} mb-4`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>

          <p className={`${styles.text.secondary} mb-4`}>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Sed ut perspiciatis
            unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>

          <p className={`${styles.text.secondary} mb-6`}>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
            ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
            numquam eius modi tempora incidunt ut labore et dolore magnam
            aliquam quaerat voluptatem.
          </p>

          <h3 className={`text-xl font-semibold ${styles.text.primary} mb-4`}>
            Subsection with More Content
          </h3>

          <p className={`${styles.text.secondary} mb-4`}>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga.
          </p>

          <p className={`${styles.text.secondary}`}>
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
