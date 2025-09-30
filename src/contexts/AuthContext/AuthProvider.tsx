import { createContext, ReactNode, useEffect, useReducer, useMemo, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FORBIDDEN, LOGIN, RESET_PASSWORD } from "../../routes/constants";
import { IAuthState } from "./core/entities/IAuthState";
import { authPresenterProvider } from "./infrastructure/presentation/presenterProvider";
import { IAuthScreens } from "./core/presentation/IAuthScreens";
import { IAuthPresenter } from "./core/presentation/IAuthPresenter";
import { ILoginCredentials } from "./core/entities/ILoginCredentials";
import { IPermissionsResponse } from "./core/entities/IPermissionsResponse";
import {
  setTokenProvider,
  setLogoutCallback,
  ERROR_CODES,
  setForbiddenCallback,
} from "../../modules/httpClient/httpClientModule";
import { LoadingAuth } from "../../components/LoadingAuth";
import { showErrorToast } from "../../utils/toasts";
import { translate } from "../../hooks/useTranslator";
import { PermissionType, PermissionsObject } from "../../constants/permissions";

interface AuthContextData {
  authState: IAuthState;
  actions: {
    login: (credentials: ILoginCredentials) => void;
    logout: () => void;
    refreshToken: () => void;
    getPermissions: () => void;
    hasPermission: (permissions: PermissionType[]) => boolean;
  };
}

type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: Partial<IAuthState> }
  | { type: "LOGIN_ERROR" }
  | { type: "REFRESH_TOKEN_SUCCESS"; payload: Partial<IAuthState> }
  | { type: "REFRESH_TOKEN_ERROR" }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "GET_PERMISSIONS_SUCCESS"; payload: PermissionsObject }
  | { type: "GET_PERMISSIONS_ERROR" }
  | { type: "SET_PERMISSIONS_LOADING"; payload: boolean };

const initialState: IAuthState = {
  authenticated: false,
  accessToken: "",
  permissions: {},
  permissionsAreLoading: true,
  isLoading: true,
  expirationTime: 0,
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const authReducer = (state: IAuthState, action: AuthAction): IAuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        authenticated: true,
        isLoading: false,
        ...action.payload,
      };

    case "LOGIN_ERROR":
      return {
        ...state,
        authenticated: false,
        isLoading: false,
        accessToken: "",
        permissions: {},
        expirationTime: 0,
      };

    case "REFRESH_TOKEN_SUCCESS":
      return {
        ...state,
        authenticated: true,
        isLoading: false,
        ...action.payload,
      };

    case "REFRESH_TOKEN_ERROR":
      return {
        ...state,
        authenticated: false,
        permissionsAreLoading: false,
        isLoading: false,
        accessToken: "",
        permissions: {},
        expirationTime: 0,
      };

    case "LOGOUT":
      return {
        ...state,
        authenticated: false,
        isLoading: false,
        permissionsAreLoading: false,
        accessToken: "",
        permissions: {},
        expirationTime: 0,
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "GET_PERMISSIONS_SUCCESS":
      return {
        ...state,
        permissions: action.payload,
        permissionsAreLoading: false,
      };

    case "GET_PERMISSIONS_ERROR":
      return {
        ...state,
        permissions: {},
        permissionsAreLoading: false,
      };

    case "SET_PERMISSIONS_LOADING":
      return {
        ...state,
        permissionsAreLoading: action.payload,
      };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const navigate = useNavigate();
  const presenterProvider = authPresenterProvider();
  const t = translate();

  // State
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loaded, setLoaded] = useState(false);
  const [refreshTimeout, setRefreshTimeout] = useState<NodeJS.Timeout | null>(null);

  // Refs : para el presenter
  const presenterRef = useRef<IAuthPresenter>({} as IAuthPresenter);

  const scheduleTokenRefresh = useCallback(
    (expirationTime: number) => {
      // Limpiar timeout anterior si existe
      if (refreshTimeout) {
        clearTimeout(refreshTimeout);
      }

      // Calcular tiempo hasta refresh (1 minuto antes de expirar)
      const timeUntilRefresh = (expirationTime - 60) * 1000;

      if (timeUntilRefresh > 0) {
        const timeout = setTimeout(() => {
          presenterRef.current.refreshToken();
        }, timeUntilRefresh);

        setRefreshTimeout(timeout);
      }
    },
    [refreshTimeout]
  );

  const viewHandlers: IAuthScreens = useMemo(
    () => ({
      onLoginSuccess: (authResponse) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            accessToken: authResponse.accessToken,
            permissions: {},
            expirationTime: authResponse.expirationTime,
          },
        });

        scheduleTokenRefresh(authResponse.expirationTime);
        getPermissions();
      },

      onLoginError: (error) => {
        if (error === ERROR_CODES.PASSWORD_CHANGE_REQUIRED) {
          showErrorToast(t("login.errors.login"), t("login.errors.passwordChangeRequired"));
          navigate(RESET_PASSWORD);
          dispatch({ type: "LOGIN_ERROR" });
          return;
        }
        showErrorToast(t("login.errors.login"), error);
        dispatch({ type: "LOGIN_ERROR" });
      },

      onRefreshTokenSuccess: (refreshResponse) => {
        dispatch({
          type: "REFRESH_TOKEN_SUCCESS",
          payload: {
            accessToken: refreshResponse.accessToken,
            expirationTime: refreshResponse.expirationTime,
          },
        });
        getPermissions();
        scheduleTokenRefresh(refreshResponse.expirationTime);
      },

      onRefreshTokenError: () => {
        dispatch({ type: "REFRESH_TOKEN_ERROR" });
        navigate(LOGIN);
      },

      onLogoutSuccess: () => {
        dispatch({ type: "LOGOUT" });
        navigate(LOGIN);
      },

      onLogoutError: () => {
        dispatch({ type: "LOGOUT" });
        navigate(LOGIN);
      },

      onGetPermissionsSuccess: (permissionsResponse: IPermissionsResponse) => {
        dispatch({
          type: "GET_PERMISSIONS_SUCCESS",
          payload: permissionsResponse.permissions,
        });
      },

      onGetPermissionsError: (error: string) => {
        dispatch({ type: "GET_PERMISSIONS_ERROR" });
        showErrorToast(t("login.errors.getPermissions"), error);
      },
    }),
    [navigate, scheduleTokenRefresh]
  );

  const login = useCallback(async (credentials: ILoginCredentials) => {
    dispatch({ type: "SET_LOADING", payload: true });
    await presenterRef.current.login(credentials);
  }, []);

  const refreshToken = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    await presenterRef.current.refreshToken();
  }, []);

  const logout = useCallback(async () => {
    await presenterRef.current.logout();
  }, []);

  const getPermissions = useCallback(async () => {
    dispatch({ type: "SET_PERMISSIONS_LOADING", payload: true });
    await presenterRef.current.getPermissions();
  }, []);

  const hasPermission = useCallback(
    (permissions: PermissionType[]): boolean => {
      if (permissions.length === 0) {
        return true; // Si no se requieren permisos específicos, permitir acceso
      }

      if (state.permissionsAreLoading) {
        return false; // Si aún se están cargando los permisos, denegar acceso
      }

      // Verificar si el usuario tiene todos los permisos requeridos
      return permissions.every((permission) => state.permissions[permission] === true);
    },
    [state.permissions, state.permissionsAreLoading]
  );

  // Inicializar presenter
  useEffect(() => {
    presenterRef.current = presenterProvider.getPresenter(viewHandlers);
    setLoaded(true);
  }, [viewHandlers, presenterProvider]);

  // Verificar autenticación al cargar
  useEffect(() => {
    if (loaded) {
      refreshToken();
    }
  }, [loaded]);

  // Configurar token provider y logout callback para httpClient
  useEffect(() => {
    if (loaded) {
      setTokenProvider(() => state.accessToken);
      setLogoutCallback(() => {
        logout();
      });
      setForbiddenCallback(() => {
        navigate(FORBIDDEN);
      });
    }
  }, [state.accessToken, loaded, logout]);

  // Cleanup timeout al desmontar
  useEffect(() => {
    return () => {
      if (refreshTimeout) {
        clearTimeout(refreshTimeout);
      }
    };
  }, [refreshTimeout]);

  const contextValue = useMemo(
    () => ({
      authState: state,
      actions: {
        login,
        logout,
        refreshToken,
        getPermissions,
        hasPermission,
      },
    }),
    [state, login, logout, refreshToken, getPermissions, hasPermission]
  );

  if (state.isLoading || state.permissionsAreLoading) {
    return <LoadingAuth />;
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
