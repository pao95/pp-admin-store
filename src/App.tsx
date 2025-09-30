import { useEffect } from "react";
import { LoadingOverlay, MantineProvider } from "@mantine/core";
import { customTheme } from "./themes";
import Router from "./routes/router";
import * as app from "./app.imports";
import Loader from "./components/Loader";
import { Notifications } from "@mantine/notifications";

const App = () => {
  const [isLoaded, setIsLoaded] = app.useState<boolean>(false);
  const [dependencyManager] = app.useState<app.DependencyManager>(new app.DependencyManager());
  const [isLoading, setIsLoading] = app.useState<boolean>(false);

  useEffect(() => {
    const initializeApp = async () => {
      await Promise.all([
        app.multiLanguageModuleInitialize(),
        app.httpClientModuleInitialize(dependencyManager),
        app.authModuleInitialize(dependencyManager),
        app.storeRegisterModuleInitialize(dependencyManager),
        app.storesModuleInitialize(dependencyManager),
        app.reportsModuleInitialize(dependencyManager),
        app.abmBranchesModuleInitialize(dependencyManager),
        app.storeDetailModuleInitialize(dependencyManager),
        app.resetPasswordModuleInitialize(dependencyManager),
      ]);
      setIsLoading(false);
      setIsLoaded(true);
    };
    setIsLoading(true);
    initializeApp();
  }, []);

  return (
    <MantineProvider theme={customTheme}>
      <Notifications />
      <LoadingOverlay
        visible={isLoading}
        loaderProps={{
          children: <Loader />,
        }}
      />
      {isLoaded && !isLoading && (
        <app.DependenciesContextProvider dependencyManager={dependencyManager}>
          <Router />
        </app.DependenciesContextProvider>
      )}
    </MantineProvider>
  );
};

export default App;
