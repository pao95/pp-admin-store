import { Navigate, Outlet, Route } from "react-router-dom";
import Login from "../modules/login/screens";
import ResetPassword from "../modules/resetPassword/screens";
import Home from "../modules/home/screens";
import Stores from "../modules/store/screens/store-list";
import StoreRegister from "../modules/store/screens/store-register";
import StoreDetail from "../modules/store/screens/store-detail";
import Reports from "../modules/reports/screens";
import { ProtectedRoute } from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import { PERMISSIONS } from "../constants/permissions";
import { ADD_BRANCHES, HOME, LOGIN, RESET_PASSWORD, STORES, REPORTS, STORE_DETAIL, FORBIDDEN } from "./constants";
import { STORE_REGISTER } from "./constants";
import AbmBranches from "../modules/abm-branches/screens";
import { Layout } from "../components/Layout";
import { StoreLayout } from "../components/Layout/StoreLayout/index";
import { ProtectedPageInfo } from "../components/ProtectedPageInfo";

export const routerRoutes = (
  <>
    <Route element={<Outlet />}>
      <Route
        path={LOGIN}
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path={RESET_PASSWORD}
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />
      <Route
        path={HOME}
        element={
          <ProtectedRoute permissions={[]}>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path={STORES}
        element={
          <ProtectedRoute permissions={[PERMISSIONS.STORE_VIEW]}>
            <Layout>
              <Stores />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path={STORE_REGISTER}
        element={
          <ProtectedRoute
            permissions={[PERMISSIONS.STORE_CREATE, PERMISSIONS.USERS_CREATE, PERMISSIONS.DOCUMENTATION_CREATE]}
          >
            <StoreRegister />
          </ProtectedRoute>
        }
      />
      <Route
        path={`${STORES}/:storeId/${STORE_DETAIL.GENERAL}`}
        element={
          <ProtectedRoute permissions={[PERMISSIONS.STORE_VIEW]}>
            <StoreLayout>
              <StoreDetail />
            </StoreLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path={`${STORES}/:storeId/${STORE_DETAIL.USERS}`}
        element={
          <ProtectedRoute permissions={[PERMISSIONS.STORE_VIEW, PERMISSIONS.USERS_VIEW]}>
            <StoreLayout>
              <StoreDetail />
            </StoreLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path={`${STORES}/:storeId/${STORE_DETAIL.BRANCHES}`}
        element={
          <ProtectedRoute permissions={[PERMISSIONS.STORE_VIEW]}>
            <StoreLayout>
              <StoreDetail />
            </StoreLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path={`${STORES}/:storeId/${STORE_DETAIL.DOCUMENTS}`}
        element={
          <ProtectedRoute permissions={[PERMISSIONS.STORE_VIEW, PERMISSIONS.DOCUMENTATION_VIEW]}>
            <StoreLayout>
              <StoreDetail />
            </StoreLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path={`${STORES}/:storeId/${STORE_DETAIL.LIQUIDITY}`}
        element={
          <ProtectedRoute permissions={[PERMISSIONS.STORE_VIEW, PERMISSIONS.SETTLEMENT_VIEW]}>
            <StoreLayout>
              <StoreDetail />
            </StoreLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path={`${STORES}/:storeId/${STORE_DETAIL.REPORTS}`}
        element={
          <ProtectedRoute permissions={[PERMISSIONS.STORE_VIEW, PERMISSIONS.REPORTS_VIEW]}>
            <StoreLayout>
              <StoreDetail />
            </StoreLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path={ADD_BRANCHES}
        element={
          <ProtectedRoute permissions={[PERMISSIONS.STORE_VIEW, PERMISSIONS.STORE_EDIT]}>
            <Layout>
              <AbmBranches />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path={REPORTS}
        element={
          <ProtectedRoute permissions={[PERMISSIONS.REPORTS_VIEW]}>
            <Layout>
              <Reports />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path={FORBIDDEN}
        element={
          <ProtectedRoute permissions={[]}>
            <ProtectedPageInfo />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={LOGIN} replace />} />
    </Route>
  </>
);
