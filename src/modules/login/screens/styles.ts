import { customTheme } from "../../../themes";
import { customColors } from "../../../themes/customColors";

export const makeStyles = () => {
  return {
    loginContainer: {
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    loginLeftContainer: {
      height: "90vh",
      alignContent: "center",
    },
    loginBoxTitlesContainer: {
      marginTop: "2em",
      marginBottom: "2em",
    },
    checkBoxLabel: {
      marginLeft: "-5px",
      color: customColors.gray.gray500,
      cursor: "pointer",
      fontWeight: 500,
      letterSpacing: "0.72px",
      fontSize: customTheme.fontSizes?.xs,
    },
    checkBoxInput: {
      fontWeight: 500,
      border: `2px solid ${customColors.gray.gray500}`,
      cursor: "pointer",
    },
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

    verticalDivider: {
      borderLeft: "1px solid #f4f6fa",
      borderRight: "1px solid #f4f6fa",
      height: "100%",
    },
    forgotPassword: {
      fontSize: customTheme.fontSizes?.xs,
      // color: customColors.primary.lightBackground,
    },
    loginRightContainer: {
      height: "90vh",
      alignContent: "center",
    },
    loginCenteredContainer: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column" as const,
    },
    rememberMe: {
      display: "inline-flex",
      // color: customColors.input.label,
      // checkbox: customColors.primary.background,
    },
    submitButton: {
      // backgroundColor: customColors.primary.lightBackground,
      // color: customColors.primary.white,
      padding: "20px 60px",
      borderRadius: "8px",
      height: "unset",
    },

    logoImageSmDesktop: {
      width: "70%",
      margin: "0 auto",
      marginBottom: "4em",
    },
    linkFooter: {
      color: customColors.gray.gray500,
      textDecorationColor: customColors.gray.gray500,
      fontSize: customTheme.fontSizes?.xs,
    },
  };
};
