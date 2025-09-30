import { customColors } from "../../themes/customColors";

const getColorIconButton = (color: string) => {
  switch (color) {
    case "primary":
      return customColors.primary.primary700;
    case "danger":
      return customColors.alerts.errorLight;
    default:
      return "gray";
  }
};

const makeStyles = (color: string) => ({
  iconButtonColor: getColorIconButton(color),
});

export default makeStyles;
