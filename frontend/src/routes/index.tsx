import React, { useEffect, useState } from 'react';
import { Splash } from '../components/splash';
import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { AppTemplate } from '../components/app-template';
import { Home } from '../modules/home/components/index';
import { Rides } from '../modules/rides';
import { Estimate } from '../modules/estimate/estimate';

const routes: RouteObject[] = [
  {
    path: '',
    element: <AppTemplate />,
    errorElement: <Navigate to="/" />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'rides',
        element: <Rides />,
      },
      {
        path: 'estimate',
        element: <Estimate />,
      },
    ],
  },
];

const AppRoutes: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
