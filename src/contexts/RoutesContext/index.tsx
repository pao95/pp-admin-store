import { createContext, ReactNode, useContext } from "react";

type Route = {
  name: string;
  route: string;
  isPrivate: boolean;
  params: string;
};

const RoutesContext = createContext<Route[]>([]);
export const useRoutes = () => {
  const routes = useContext(RoutesContext);
  return routes;
};
export const RoutesProvider = ({ children, routes }: { children: ReactNode; routes: Route[] }) => {
  return <RoutesContext.Provider value={routes}>{children}</RoutesContext.Provider>;
};
