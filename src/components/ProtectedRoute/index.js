import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../../config/localStorage";

const PrivateComponent = () =>
  !!auth ? <Outlet /> : <Navigate to="/sign-in" />;

export default PrivateComponent;
