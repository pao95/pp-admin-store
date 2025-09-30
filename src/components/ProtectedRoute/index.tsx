import { ReactNode, useContext } from "react";
import { PermissionType } from "../../constants/permissions";
import { AuthContext } from "../../contexts/AuthContext";
import Login from "../../modules/login/screens";
import { ProtectedPageInfo } from "../ProtectedPageInfo";

type ProtectedRouteProps = {
  children: ReactNode;
  permissions: PermissionType[];
};

export const ProtectedRoute = ({ children, permissions }: ProtectedRouteProps) => {
  const { authState, actions } = useContext(AuthContext);

  if (!authState?.authenticated) {
    return <Login />;
  }
  // Verificar permisos usando la función hasPermission del contexto
  const hasRequiredPermissions = actions.hasPermission(permissions);

  // Si no tiene los permisos requeridos, mostrar la página de acceso denegado
  if (!hasRequiredPermissions) {
    return <ProtectedPageInfo />;
  }

  // Si tiene los permisos requeridos, mostrar el componente al que se quiere acceder
  return <>{children}</>;
};
