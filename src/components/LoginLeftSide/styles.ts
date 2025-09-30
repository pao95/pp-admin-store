import { customTheme } from "../../themes";
import { customColors } from "../../themes/customColors";

export const makeStyles = () => {
  return {
    loginColorTitle: {
      color: customColors.primary.primary400,
      fontWeight: 600,
      fontSize: customTheme.fontSizes?.xxxl,
    },
    loginColorTitleSecond: {
      color: customColors.gray.gray800,
      fontWeight: 400,
      fontSize: customTheme.fontSizes?.xxxl,
    },
    linkFooter: {
      color: customColors.gray.gray500,
      textDecorationColor: customColors.gray.gray500,
      fontSize: customTheme.fontSizes?.xs,
    },
  };
};
