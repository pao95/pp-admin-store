import { customColors } from "../../themes/customColors";

export const makeStyles = () => {
  return {
    container: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      gap: "24px",
      height: "100vh",
    },
    iconsContainer: {
      display: "flex",
      alignItems: "end",
      justifyContent: "center",
    },

    title403: {
      fontSize: 180,
      fontWeight: 700,
      color: customColors.gray.gray300,
      lineHeight: 1,
    },
  };
};
