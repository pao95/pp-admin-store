import { BrowserRouter, Routes } from "react-router-dom";
import { routerRoutes } from "..";
import { AuthProvider } from "../../contexts/AuthContext";

const Router = () => {
  return (
    <BrowserRouter basename="/">
      <AuthProvider>
        <Routes>{routerRoutes}</Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
