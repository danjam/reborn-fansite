// src/router/index.tsx
import { lazy, ReactNode, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from '@/components/Layout';
import ErrorPage from '@/pages/ErrorPage';
import GameObjectPage from '@/pages/GameObjectPage';
import HomePage from '@/pages/HomePage';
import ReferencePage from '@/pages/ReferencePage';
import TestPage from '@/pages/TestPage';
import ToolsPage from '@/pages/ToolsPage';

// Lazy-loaded pages
const CrystalsPage = lazy(() => import('@/pages/reference/CrystalsPage'));
const MonstersPage = lazy(() => import('@/pages/reference/MonstersPage'));
const PotionListPage = lazy(() => import('@/pages/reference/PotionsPage'));
const SmithingPage = lazy(() => import('@/pages/reference/SmithingPage'));
const VegetablesPage = lazy(() => import('@/pages/reference/VegetablesPage'));
const VillagersPage = lazy(() => import('@/pages/reference/VillagersPage'));
const CropCalculatorPage = lazy(
  () => import('@/pages/tools/CropCalculatorPage')
);

// Loading fallback with animations - Fixed icon sizes to follow guidelines
const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
    {/* Spinning circle - Fixed to use 32px (w-8 h-8) */}
    <div className="relative">
      <div className="w-8 h-8 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin border-t-green-500"></div>
      <div
        className="w-4 h-4 border-4 border-transparent border-t-green-400 rounded-full animate-spin absolute top-2 left-2"
        style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}
      ></div>
    </div>

    {/* Animated dots - these are decorative so size is less critical */}
    <div className="flex space-x-1">
      <div
        className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
        style={{ animationDelay: '0ms' }}
      ></div>
      <div
        className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
        style={{ animationDelay: '150ms' }}
      ></div>
      <div
        className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
        style={{ animationDelay: '300ms' }}
      ></div>
    </div>

    {/* Loading text */}
    <div className="text-gray-600 dark:text-gray-400 font-medium">
      Loading page...
    </div>
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
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
