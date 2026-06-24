import React from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../utils/storage";

/** * protect private routes */
const ProtectedRoute = (props) => {
  const user = getUser();

  // boot to login if no session
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // render requested page
  return props.children;
};

export default ProtectedRoute;
