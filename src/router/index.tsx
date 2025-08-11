// src/router/index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from '@/pages/ErrorPage';
import MySettingsPage from '@/pages/MySettingsPage';
import Layout from '../components/Layout';
import HomePage from '../pages/HomePage';
import MonstersPage from '../pages/reference/MonstersPage';
import PotionListPage from '../pages/reference/PotionsPage';
import VillagersPage from '../pages/reference/VillagersPage';
import ReferencePage from '../pages/ReferencePage';
import CropCalculatorPage from '../pages/tools/CropCalculatorPage';
import ToolsPage from '../pages/ToolsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'my-settings',
        element: <MySettingsPage />,
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
            element: <CropCalculatorPage />,
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
            path: 'potions',
            element: <PotionListPage />,
          },
          {
            path: 'monsters',
            element: <MonstersPage />,
          },
          {
            path: 'villagers',
            element: <VillagersPage />,
          },
        ],
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
