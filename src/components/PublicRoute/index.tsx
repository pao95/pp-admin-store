import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { HOME } from "../../routes/constants";
import { AuthContext } from "../../contexts/AuthContext";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { authState } = useContext(AuthContext);
  if (authState?.authenticated) {
    return <Navigate to={HOME} replace />;
  }
  return <>{children}</>;
};

export default PublicRoute;
