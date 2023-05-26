import React, { Suspense, lazy } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dummy = lazy(() => import('./components/Dummy/dummy'));

const Routing = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const PublicRoutes = [
    {
      export: true,
      path: '/',
      component: <Dummy />,
    },
  ].filter(cur => cur);

  const PrivateRoutes = [].filter(cur => cur);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? (
      children
    ) : (
      <Navigate
        to={{
          pathname: '/login',
        }}
      />
    );
  };

  const PublicRoute = ({ children }) => {
    return isAuthenticated ? (
      <Navigate
        to={{
          pathname: '/dashboard',
        }}
      />
    ) : (
      children
    );
  };

  return (
    <Suspense className="loader">
      <Routes>
        {PublicRoutes.map(route => (
          <Route
            exact={route.exact}
            key={route.path}
            path={route.path}
            element={<PublicRoute> {route.component} </PublicRoute>}
          />
        ))}
        {PrivateRoutes.map(route => (
          <Route
            exact={route.exact}
            key={route.path}
            path={route.path}
            element={<PrivateRoute> {route.component} </PrivateRoute>}
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default Routing;
