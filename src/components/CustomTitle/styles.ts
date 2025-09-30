import { customTheme } from "../../themes";
import { customColors } from "../../themes/customColors";

export const getTitleStyles = (type: "title1" | "title2" | "subtitle") => {
  if (type === "title1") {
    return {
      fontSize: customTheme.fontSizes?.["2xl"],
      color: customColors.gray.gray700,
      margin: 0,
      fontWeight: 500,
    };
  }
  if (type === "title2") {
    return {
      fontSize: customTheme.fontSizes?.md,
      color: customColors.gray.gray800,
      margin: 0,
      fontWeight: 500,
    };
  }
  return {
    fontSize: customTheme.fontSizes?.sm,
    fontWeight: 400,
    color: customColors.gray.gray500,
    margin: 0,
  };
};
