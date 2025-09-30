import { customTheme } from "../../themes";
import { customColors } from "../../themes/customColors";

export const makeStyles = () => {
  return {
    infoBox: {
      display: "flex",
      alignItems: "center",
      alignContent: "center",
      gap: "10px",
    },
    iconInfo: {
      color: customColors.primary.primary700,
    },
    textInfo: {
      fontSize: customTheme.fontSizes?.xs,
      fontWeight: 400,
      color: customColors.gray.gray500,
      margin: 0,
    },
  };
};
