import { customTheme } from "../../themes";
import { customColors } from "../../themes/customColors";
import background from "../../assets/images/background.svg";

export const layoutStyles = {
  container: {
    display: "flex",
    width: "100vw",
    minHeight: "100vh",
    height: "100vh",
  },
  sideMenuWrapper: {
    minWidth: "250px",
    padding: "10px",
  },
  contentWrapper: {
    flex: 1,
    minHeight: "100vh",
    height: "100vh",
    width: "100%",
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right bottom",
    backgroundSize: "auto",
    overflowY: "auto" as const,
  },
  closeSessionContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  linkCloseSession: {
    color: customColors.gray.gray500,
    textDecorationColor: customColors.gray.gray500,
    fontSize: customTheme.fontSizes?.sm,
  },
};

export const sideMenuStyles = () => ({
  container: {
    backgroundColor: customColors.primary.primary900,
    zIndex: 100,
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "flex-start" as const,
    paddingLeft: "24px",
    paddingRight: "24px",
    height: "100%",
    width: "100%",
    borderRadius: "16px",
  },
  logoBox: {
    background: "transparent",
    padding: "20px 0px",
  },

  divider: {
    height: "1px",
    background: "#fff",
    marginBottom: "32px",
    backgroundColor: customColors.primary.primary300,
  },
  menuList: {
    flexDirection: "column" as const,
    gap: "16px",
    display: "flex",
  },
  menuButton: (active: boolean) => ({
    height: "40px",
    borderRadius: "4px",
    backgroundColor: active ? "#fff" : "transparent",
    display: "flex",
    alignItems: "center",
    padding: "10px",
    color: active ? customColors.primary.primary900 : customColors.primary.primary300,
    fontSize: customTheme.fontSizes?.sm || "14px",
    transition: "background 0.2s",
    cursor: "pointer",
  }),
  icon: {
    marginRight: "12px",
  },
  label: {
    fontSize: customTheme.fontSizes?.sm || "14px",
    fontWeight: 500,
  },
});
