import { Box, Image, Text, UnstyledButton, Collapse } from "@mantine/core";
import { useNavigate, useLocation, matchPath } from "react-router-dom";
import { sideMenuStyles } from "../styles";
import Logo from "../../../assets/images/logoLight.svg";

import {
  IconHome2,
  IconBuildingStore,
  IconReport,
  IconUser,
  IconBuilding,
  IconFileText,
  IconCash,
} from "@tabler/icons-react";
import { translate } from "../../../hooks/useTranslator";
import { ADD_BRANCHES, HOME, REPORTS, STORES, STORE_REGISTER } from "../../../routes/constants";
import { PERMISSIONS } from "../../../constants/permissions";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext, useState } from "react";

const menuItems = [
  {
    icon: <IconHome2 size={20} />,
    label: "components.sideMenu.home",
    path: HOME,
    associatedRoutes: [HOME],
    permissions: [],
  },
  {
    icon: <IconBuildingStore size={20} />,
    label: "components.sideMenu.comercios",
    path: STORES,
    associatedRoutes: [STORES, STORE_REGISTER, ADD_BRANCHES],
    permissions: [PERMISSIONS.STORE_VIEW],
    hasSubmenu: true,
    submenuItems: [
      {
        icon: <IconBuildingStore size={16} />,
        label: "store.edit.commons.tabs.general",
        path: "general",
        permissions: [PERMISSIONS.STORE_VIEW],
      },
      {
        icon: <IconUser size={16} />,
        label: "store.edit.commons.tabs.users",
        path: "users",
        permissions: [PERMISSIONS.STORE_VIEW, PERMISSIONS.USERS_VIEW],
      },
      {
        icon: <IconBuilding size={16} />,
        label: "store.edit.commons.tabs.branches",
        path: "branches",
        permissions: [PERMISSIONS.STORE_VIEW],
      },
      {
        icon: <IconFileText size={16} />,
        label: "store.edit.commons.tabs.documents",
        path: "documents",
        permissions: [PERMISSIONS.STORE_VIEW, PERMISSIONS.DOCUMENTATION_VIEW],
      },
      {
        icon: <IconCash size={16} />,
        label: "store.edit.commons.tabs.liquidity",
        path: "liquidity",
        permissions: [PERMISSIONS.STORE_VIEW, PERMISSIONS.SETTLEMENT_VIEW],
      },
    ],
  },
  {
    icon: <IconReport size={20} />,
    label: "components.sideMenu.reports",
    path: REPORTS,
    associatedRoutes: [REPORTS],
    permissions: [PERMISSIONS.REPORTS_VIEW],
  },
];

const StoreSideMenu = () => {
  const t = translate();
  const styles = sideMenuStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { actions } = useContext(AuthContext);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Extraer storeId de la URL actual
  const pathSegments = location.pathname.split("/");
  const storeId = pathSegments[2]; // /stores/:storeId/...
  const currentStoreDetailTab = pathSegments[3]; // /stores/:storeId/:tab

  const handleMenuClick = (path: string) => {
    if (path === STORES) {
      navigate(path);
    } else {
      // Para submenús de store detail
      navigate(`/stores/${storeId}/${path}`);
    }
  };

  const handleMainMenuClick = (item: any) => {
    if (item.hasSubmenu) {
      // Toggle submenu
      const isExpanded = expandedItems.includes(item.label);
      if (isExpanded) {
        setExpandedItems(expandedItems.filter((label) => label !== item.label));
      } else {
        setExpandedItems([...expandedItems, item.label]);
      }
    } else {
      navigate(item.path);
    }
  };

  const isMenuItemActive = (associatedRoutes: string[]) => {
    return associatedRoutes.some((route) => matchPath(route, location.pathname));
  };

  const isSubmenuItemActive = (path: string) => {
    return currentStoreDetailTab === path;
  };

  const isStoreDetailActive = () => {
    return location.pathname.includes("/stores/") && storeId && currentStoreDetailTab;
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.logoBox}>
        <Image src={Logo} w="55%" />
      </Box>

      <div style={styles.divider} />
      <div style={styles.menuList}>
        {menuItems
          .filter((item) => actions.hasPermission(item.permissions))
          .map((item) => {
            const isExpanded = expandedItems.includes(item.label);
            const isActive = isMenuItemActive(item.associatedRoutes);
            const isStoreDetail = Boolean(isStoreDetailActive() && item.hasSubmenu);

            // Solo marcar el item padre como activo si NO estamos en store detail
            const shouldMarkParentActive = isActive && !isStoreDetail;

            return (
              <Box key={item.label}>
                <UnstyledButton
                  style={styles.menuButton(shouldMarkParentActive)}
                  onClick={() => handleMainMenuClick(item)}
                >
                  <Box style={styles.icon}>{item.icon}</Box>
                  <Text style={styles.label}>{t(item.label)}</Text>
                </UnstyledButton>

                {item.hasSubmenu && (
                  <Collapse in={Boolean(isExpanded || isStoreDetail)}>
                    <Box style={{ paddingLeft: 20 }}>
                      {item.submenuItems
                        ?.filter((subItem) => actions.hasPermission(subItem.permissions))
                        .map((subItem) => (
                          <UnstyledButton
                            key={subItem.path}
                            style={styles.menuButton(isSubmenuItemActive(subItem.path))}
                            onClick={() => handleMenuClick(subItem.path)}
                          >
                            <Box style={styles.icon}>{subItem.icon}</Box>
                            <Text style={styles.label}>{t(subItem.label)}</Text>
                          </UnstyledButton>
                        ))}
                    </Box>
                  </Collapse>
                )}
              </Box>
            );
          })}
      </div>
    </Box>
  );
};

export default StoreSideMenu;
