import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../providers/UserProvider";

export const SecureRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
