// src/components/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { userService } from "../../services/UserService";

export const ProtectedRoute = ({ children }) => {
  const isLogged = userService.isLoggedIn();

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
