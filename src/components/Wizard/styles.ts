import { customTheme } from "../../themes";
import { customColors } from "../../themes/customColors";

export const wizardStyles = () => ({
  container: {
    display: "flex",
    width: "100%",
  },
  sideMenuWrapper: {
    width: "250px",
    padding: "10px",
    height: "100%",
    maxHeight: "700px",
  },
  contentWrapper: {
    flex: 1,
    height: "100%",
    width: "100%",
    padding: "10px",
  },
  containerContent: {
    width: "100%",
    borderRadius: "16px",
    backgroundColor: customColors.gray.gray200,
    padding: 0,
    border: `1px solid ${customColors.gray.gray300}`,
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
});
