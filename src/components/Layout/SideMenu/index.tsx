import { Box, Image, Text, UnstyledButton } from "@mantine/core";
import { useNavigate, useLocation, matchPath } from "react-router-dom";
import { sideMenuStyles } from "../styles";
import Logo from "../../../assets/images/logoLight.svg";

import { IconHome2, IconBuildingStore, IconReport } from "@tabler/icons-react";
import { translate } from "../../../hooks/useTranslator";
import { ADD_BRANCHES, HOME, REPORTS, STORES, STORE_REGISTER } from "../../../routes/constants";
import { PERMISSIONS } from "../../../constants/permissions";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react";

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
  },
  {
    icon: <IconReport size={20} />,
    label: "components.sideMenu.reports",
    path: REPORTS,
    associatedRoutes: [REPORTS],
    permissions: [PERMISSIONS.REPORTS_VIEW],
  },
];

const SideMenu = () => {
  const t = translate();
  const styles = sideMenuStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { actions } = useContext(AuthContext);

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const isMenuItemActive = (associatedRoutes: string[]) => {
    return associatedRoutes.some((route) => matchPath(route, location.pathname));
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
          .map((item) => (
            <UnstyledButton
              key={item.label}
              style={styles.menuButton(isMenuItemActive(item.associatedRoutes))}
              onClick={() => handleMenuClick(item.path)}
            >
              <Box style={styles.icon}>{item.icon}</Box>
              <Text style={styles.label}>{t(item.label)}</Text>
            </UnstyledButton>
          ))}
      </div>
    </Box>
  );
};

export default SideMenu;
