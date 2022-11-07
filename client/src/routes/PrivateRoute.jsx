import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/UserContext";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (user?.uid) {
    return <>{children}</>;
  }
  return <Navigate to="/login" replace state={{ from: location }} />;
};

export default PrivateRoute;
