/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import Loadable from 'react-loadable';

import Login from 'app/modules/login/login';
import Register from 'app/modules/account/register/register';
import Activate from 'app/modules/account/activate/activate';
import PasswordResetInit from 'app/modules/account/password-reset/init/password-reset-init';
import PasswordResetFinish from 'app/modules/account/password-reset/finish/password-reset-finish';
import Logout from 'app/modules/login/logout';
import Home from 'app/modules/home/home';
import EntitiesRoutes from 'app/entities/routes';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import PageNotFound from 'app/shared/error/page-not-found';
import { AUTHORITIES } from 'app/config/constants';
import Profile from './modules/profile/profile';
import HomePage from './modules/home/homePage';
import LoginPage from './modules/login/LoginPage';
import RegisterPage from './modules/account/register/RegisterPage';
import ChatPage from './modules/communication/ChatPage';
import { useSelector } from 'react-redux';

const loading = <div>loading ...</div>;

// const Account = Loadable({
//   loader: () => import(/* webpackChunkName: "account" */ 'app/modules/account'),
//   loading: () => loading,
// });

// const Admin = Loadable({
//   loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
//   loading: () => loading,
// });

const AppRoutes = () => {  

  // const userDetails = useSelector((state: any) => state);
  const userRole =  sessionStorage.getItem("ROLES");

  return (
    <div className="view-routes">
      <ErrorBoundaryRoutes>
        {/* <Route index element={<Home />} /> */}
        {/* <Route path="login" element={<Login />} /> */}
        <Route path="login" element={
          userRole !== null?
          <Navigate to={"/homepage"} />
          :
          <LoginPage />
        } />
        <Route path="register" element={
          userRole !== null?
          <Navigate to={"/homepage"} />
          :
          <RegisterPage />
        } />
        <Route index element={
          userRole !== AUTHORITIES.USER && userRole !== AUTHORITIES.ADMIN?
          <Navigate to={"/login"} />
          :
          <HomePage />
        } />
        <Route path="profile" element={
          userRole !== AUTHORITIES.USER && userRole !== AUTHORITIES.ADMIN?
          <Navigate to={"/login"} />
          :
          <Profile />
        } />
        <Route path="homepage" element={
          userRole !== AUTHORITIES.USER && userRole !== AUTHORITIES.ADMIN?
          <Navigate to={"/login"} />
          :
          <HomePage />
        } />
        <Route path="logout" element={
          userRole !== AUTHORITIES.USER && userRole !== AUTHORITIES.ADMIN?
          <Navigate to={"/login"} />
          :
          <Logout />
        } />
        <Route path="chat" element={
          userRole !== AUTHORITIES.USER && userRole !== AUTHORITIES.ADMIN?
          <Navigate to={"/login"} />
          :
          <ChatPage />
        } />
        <Route path="account">
          {/* <Route
            path="*"
            element={
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}>
                <Account />
              </PrivateRoute>
            }
          /> */}
          {/* <Route path="register" element={<Register />} /> */}
          <Route path="activate" element={<Activate />} />
          <Route path="reset">
            <Route path="request" element={<PasswordResetInit />} />
            <Route path="finish" element={<PasswordResetFinish />} />
          </Route>
        </Route>
        {/* <Route
          path="admin/*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
              <Admin />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
              <EntitiesRoutes />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </ErrorBoundaryRoutes>
    </div>
  );
};

export default AppRoutes;
