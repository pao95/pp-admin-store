import { customTheme } from "../../themes";
import { customColors } from "../../themes/customColors";

export const getCustomCardStyles = () => {
  const baseColor = customColors.gray.gray500;

  return {
    card: {
      width: "100%",
      backgroundColor: "#FFFFFF",
      border: `1px solid ${customColors.gray.gray300}`,
      borderRadius: "18px",
      padding: "24px",
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "space-between",
      transition: "all 0.2s ease-in-out",
    },

    icon: {
      color: baseColor,
    },
    title: {
      color: customColors.gray.gray800,
      fontSize: customTheme.fontSizes?.md,
      fontWeight: 500,
      lineHeight: "18px",
      marginTop: "auto",
    },
    description: {
      color: baseColor,
      fontSize: customTheme.fontSizes?.sm,
      fontWeight: 400,
      lineHeight: "18px",
      marginTop: "auto",
    },
  };
};
