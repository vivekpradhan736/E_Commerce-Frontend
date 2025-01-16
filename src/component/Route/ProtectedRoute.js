import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const ProtectedRoute = ({ isAdmin, children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  console.log("loading",loading)
  console.log("isAuthenticated",isAuthenticated)
  console.log("user",user)

  if (loading) {
    return <Loader />;
  }

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/login" />;
  }
  
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
