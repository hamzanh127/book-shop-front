import React, { useContext } from "react";
import { Navigate, Outlet, redirect, Route } from "react-router-dom";
import  { UserContext } from "./context/auth";

const AuthenticatedRoute = () => {
  const { user } = useContext(UserContext);

  console.log(user);
  return window.localStorage.getItem("login") != undefined &&
    window.localStorage.getItem("login") != null ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default AuthenticatedRoute;