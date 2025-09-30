import { customTheme } from "../../themes";
import { customColors } from "../../themes/customColors";

export const makeStyles = () => ({
  link: {
    textDecorationColor: customColors.primary.primary700,
  },

  text: {
    color: customColors.primary.primary700,
    fontSize: customTheme.fontSizes?.xs,
    fontWeight: "600",
  },
});
