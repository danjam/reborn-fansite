// src/router/index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/Layout';
import HomePage from '../pages/HomePage';
import GuidesPage from '../pages/GuidesPage';
import ToolsPage from '../pages/ToolsPage';
import CommunityPage from '../pages/CommunityPage';
import CropCalculatorPage from '../pages/tools/CropCalculatorPage';
import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'guides',
        element: <GuidesPage />
      },
      {
        path: 'tools',
        children: [
          {
            index: true,
            element: <ToolsPage />
          },
          {
            path: 'crop-calculator',
            element: <CropCalculatorPage />
          }
          // Add more tool routes here as needed
        ]
      },
      {
        path: 'community',
        element: <CommunityPage />
      }
    ]
  }
]);

export const AppRouter = () => <RouterProvider router={router} />;
export default router;