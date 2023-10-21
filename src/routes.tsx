/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { AUTHORITIES } from "./config/constants";
import RegisterPage from "./pages/account/register/RegisterPage";
import ChatPage from "./pages/communication/ChatPage";
import HomePage from "./pages/home/homePage";
import LoginPage from "./pages/login/LoginPage";
import PageNotFound from "./pages/error/PageNotFound";
import Logout from "./pages/login/Logout";

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
  const userRole = sessionStorage.getItem("ROLES");

  return (
    <div className="view-routes">
      <Routes>
        {/* <Route index element={<Home />} /> */}
        {/* <Route path="login" element={<Login />} /> */}
        <Route
          path="login"
          element={
            userRole !== null ? <Navigate to={"/homepage"} /> : <LoginPage />
          }
        />
        <Route
          path="register"
          element={
            userRole !== null ? <Navigate to={"/homepage"} /> : <RegisterPage />
          }
        />
        <Route
          index
          element={
            userRole !== AUTHORITIES.USER && userRole !== AUTHORITIES.ADMIN ? (
              <Navigate to={"/login"} />
            ) : (
              <HomePage />
            )
          }
        />
        {/* <Route path="profile" element={
          userRole !== AUTHORITIES.USER && userRole !== AUTHORITIES.ADMIN?
          <Navigate to={"/login"} />
          :
          <Profile />
        } /> */}
        <Route
          path="homepage"
          element={
            userRole !== AUTHORITIES.USER && userRole !== AUTHORITIES.ADMIN ? (
              <Navigate to={"/login"} />
            ) : (
              <HomePage />
            )
          }
        />
        {/* <Route path="logout" element={
          userRole !== AUTHORITIES.USER && userRole !== AUTHORITIES.ADMIN?
          <Navigate to={"/login"} />
          :
          <Logout />
        } /> */}
        <Route
          path="chat"
          element={
            userRole !== AUTHORITIES.USER && userRole !== AUTHORITIES.ADMIN ? (
              <Navigate to={"/login"} />
            ) : (
              <ChatPage />
            )
          }
        />
        <Route
          path="logout"
          element={
            userRole !== AUTHORITIES.USER && userRole !== AUTHORITIES.ADMIN ? (
              <Navigate to={"/login"} />
            ) : (
              <Logout/>
            )
          }
        />
        {/* <Route path="account">
          <Route
            path="*"
            element={
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}>
                <Account />
              </PrivateRoute>
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="activate" element={<Activate />} />
          <Route path="reset">
            <Route path="request" element={<PasswordResetInit />} />
            <Route path="finish" element={<PasswordResetFinish />} />
          </Route>
        </Route> */}
        {/* <Route
          path="admin/*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
              <Admin />
            </PrivateRoute>
          }
        /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
