import { createContext } from "react";
import { ReactNode } from "react";
import { DependencyManager } from "../../dependencyManager";

export const DependenciesContext = createContext<DependencyManager>({} as DependencyManager);

type DependenciesContextProviderProps = {
  children: ReactNode;
  dependencyManager: DependencyManager;
};

export function DependenciesContextProvider({ children, dependencyManager }: DependenciesContextProviderProps) {
  return <DependenciesContext.Provider value={dependencyManager}>{children}</DependenciesContext.Provider>;
}
