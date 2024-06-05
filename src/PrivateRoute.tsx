import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated, openAuthModal } = useAuth(); // Get the authentication status from your context
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!isAuthenticated) {
      openAuthModal();
      navigate("/");
    }
  });

  return <>{element}</>;
};

export default PrivateRoute;
