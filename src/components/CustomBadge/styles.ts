import { customColors } from "../../themes/customColors";

export const makeStyles = (color: string) => {
  const getColor = {
    success: {
      color: customColors.alerts.successDark,
      backgroundColor: customColors.alerts.successLight,
      fontWeight: 400,
    },
    warning: {
      color: customColors.alerts.warningDark,
      backgroundColor: customColors.alerts.warningLight,
      fontWeight: 400,
    },
    error: {
      color: customColors.alerts.errorDark,
      backgroundColor: customColors.alerts.errorLight,
      fontWeight: 400,
    },
    info: {
      color: customColors.alerts.infoDark,
      backgroundColor: customColors.alerts.infoLight,
      fontWeight: 400,
    },
    default: {
      color: customColors.gray.gray800,
      backgroundColor: customColors.gray.gray100,
      fontWeight: 400,
    },
  };

  return {
    badge: {
      ...getColor[color as keyof typeof getColor],
    },
  };
};
