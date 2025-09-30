import { useDependencyManager } from "../dependencyManager";
import { DependenciesContext } from "../contexts/Dependencies";

export const useDependency = <T extends any>(dependencyKey: string): T => {
  const dependencyManager = useDependencyManager(DependenciesContext);
  return dependencyManager.resolve(dependencyKey) as T;
};
