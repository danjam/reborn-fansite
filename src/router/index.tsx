// src/router/index.tsx
import { lazy, ReactNode, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from '@/components/Layout';
import ErrorPage from '@/pages/ErrorPage';
import GameObjectPage from '@/pages/GameObjectPage';
import GuidesPage from '@/pages/GuidesPage';
import HomePage from '@/pages/HomePage';
import ReferencePage from '@/pages/ReferencePage';
import TestPage from '@/pages/TestPage';
import ToolsPage from '@/pages/ToolsPage';

// Lazy-loaded pages - Reference
const CrystalsPage = lazy(() => import('@/pages/reference/CrystalsPage'));
const EquipmentPage = lazy(() => import('@/pages/reference/EquipmentPage'));
const MonsterDropsPage = lazy(
  () => import('@/pages/reference/MonsterDropsPage')
);
const MonstersPage = lazy(() => import('@/pages/reference/MonstersPage'));
const PotionListPage = lazy(() => import('@/pages/reference/PotionsPage'));
const SmithingPage = lazy(() => import('@/pages/reference/SmithingPage'));
const VegetablesPage = lazy(() => import('@/pages/reference/VegetablesPage'));
const VillagersPage = lazy(() => import('@/pages/reference/VillagersPage'));

// Lazy-loaded pages - Tools
const CropCalculatorPage = lazy(
  () => import('@/pages/tools/CropCalculatorPage')
);
const WishingWellCalculatorPage = lazy(
  () => import('@/pages/tools/WishingWellCalculatorPage')
);

// Lazy-loaded pages - Guides
const FaqPage = lazy(() => import('@/pages/guides/FaqPage'));
const TipsAndTricksPage = lazy(
  () => import('@/pages/guides/TipsAndTricksPage')
);
const FarmingPage = lazy(() => import('@/pages/guides/FarmingPage'));
const EnchantingPage = lazy(() => import('@/pages/guides/EnchantingPage'));
const YourHousePage = lazy(() => import('@/pages/guides/YourHousePage'));
const HowToPlayPage = lazy(() => import('@/pages/guides/HowToPlayPage'));
const BrewingPotionsPage = lazy(
  () => import('@/pages/guides/BrewingPotionsPage')
);
const SmithingGuidePage = lazy(
  () => import('@/pages/guides/SmithingGuidePage')
);

// Loading fallback with animations - Completely theme-agnostic
const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
    {/* Spinning circle - Using neutral colors only */}
    <div className="relative">
      <div className="w-8 h-8 border-4 border-gray-300 rounded-full animate-spin border-t-gray-600"></div>
      <div
        className="w-4 h-4 border-4 border-transparent border-t-gray-400 rounded-full animate-spin absolute top-2 left-2"
        style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}
      ></div>
    </div>

    {/* Animated dots - using neutral colors */}
    <div className="flex space-x-1">
      <div
        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
        style={{ animationDelay: '0ms' }}
      ></div>
      <div
        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
        style={{ animationDelay: '150ms' }}
      ></div>
      <div
        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
        style={{ animationDelay: '300ms' }}
      ></div>
    </div>

    {/* Loading text - using neutral color that works in both themes */}
    <div className="text-gray-500 font-medium">Loading page...</div>
  </div>
);

// Lazy wrapper
const LazyPage = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'data/:type/:id',
        element: <GameObjectPage />,
      },
      {
        path: 'test',
        element: <TestPage />,
      },
      {
        path: 'tools',
        children: [
          {
            index: true,
            element: <ToolsPage />,
          },
          {
            path: 'crop-calculator',
            element: (
              <LazyPage>
                <CropCalculatorPage />
              </LazyPage>
            ),
          },
          {
            path: 'wishing-well-calculator',
            element: (
              <LazyPage>
                <WishingWellCalculatorPage />
              </LazyPage>
            ),
          },
        ],
      },
      {
        path: 'reference',
        children: [
          {
            index: true,
            element: <ReferencePage />,
          },
          {
            path: 'crystals',
            element: (
              <LazyPage>
                <CrystalsPage />
              </LazyPage>
            ),
          },
          {
            path: 'drops',
            element: (
              <LazyPage>
                <MonsterDropsPage />
              </LazyPage>
            ),
          },
          {
            path: 'equipment',
            element: (
              <LazyPage>
                <EquipmentPage />
              </LazyPage>
            ),
          },
          {
            path: 'monsters',
            element: (
              <LazyPage>
                <MonstersPage />
              </LazyPage>
            ),
          },
          {
            path: 'potions',
            element: (
              <LazyPage>
                <PotionListPage />
              </LazyPage>
            ),
          },
          {
            path: 'smithing',
            element: (
              <LazyPage>
                <SmithingPage />
              </LazyPage>
            ),
          },
          {
            path: 'vegetables',
            element: (
              <LazyPage>
                <VegetablesPage />
              </LazyPage>
            ),
          },
          {
            path: 'villagers',
            element: (
              <LazyPage>
                <VillagersPage />
              </LazyPage>
            ),
          },
        ],
      },
      {
        path: 'guides',
        children: [
          {
            index: true,
            element: <GuidesPage />,
          },
          {
            path: 'faq',
            element: (
              <LazyPage>
                <FaqPage />
              </LazyPage>
            ),
          },
          {
            path: 'how-to-play',
            element: (
              <LazyPage>
                <HowToPlayPage />
              </LazyPage>
            ),
          },
          {
            path: 'tips-and-tricks',
            element: (
              <LazyPage>
                <TipsAndTricksPage />
              </LazyPage>
            ),
          },
          {
            path: 'farming',
            element: (
              <LazyPage>
                <FarmingPage />
              </LazyPage>
            ),
          },
          {
            path: 'brewing-potions',
            element: (
              <LazyPage>
                <BrewingPotionsPage />
              </LazyPage>
            ),
          },
          {
            path: 'smithing',
            element: (
              <LazyPage>
                <SmithingGuidePage />
              </LazyPage>
            ),
          },
          {
            path: 'enchanting',
            element: (
              <LazyPage>
                <EnchantingPage />
              </LazyPage>
            ),
          },
          {
            path: 'your-house',
            element: (
              <LazyPage>
                <YourHousePage />
              </LazyPage>
            ),
          },
        ],
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
