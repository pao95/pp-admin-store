import { customTheme } from "../themes";
import { customColors } from "../themes/customColors";

export const makeStyles = (fullWidth = true) => ({
  inputStyles: {
    label: {
      color: customColors.gray.gray500,
      fontSize: customTheme.fontSizes?.xs,
      marginBottom: "8px",
      fontWeight: 500,
      letterSpacing: "0.72px",
    },
    input: {
      borderWidth: "1px",
      fontSize: customTheme.fontSizes?.xs,
      letterSpacing: "0.72px",
      color: customColors.gray.gray700,
    },
    root: {
      minWidth: fullWidth ? "100%" : "215px",
    },
    dropdown: {
      cursor: "pointer",
      position: "absolute" as const,
      overflow: "auto",
      maxHeight: "250px",
      padding: "0.5em",
      borderRadius: "4px",
      zIndex: 10,
    },
    pill: {
      fontSize: customTheme.fontSizes?.xs,
      letterSpacing: "0.72px",
    },
    option: {
      fontSize: customTheme.fontSizes?.xs,
      letterSpacing: "0.72px",
    },
  },

  label: {
    fontSize: customTheme.fontSizes?.xs,
    fontWeight: 500,
    letterSpacing: "0.72px",
    color: customColors.gray.gray500,
  },
  labelWithTooltip: {
    cursor: "pointer",
  },
  pill: {
    fontSize: customTheme.fontSizes?.xs,
    letterSpacing: "0.72px",
  },
  divider: {
    height: "auto",
    width: 1,
    position: "relative" as const,
    left: "3px",
  },
  leftSectionText: {
    fontSize: customTheme.fontSizes?.xs,
    letterSpacing: "0.72px",
  },
  optionsContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "0.5rem",
    color: customColors.gray.gray500,
  },
  dropdown: {
    cursor: "pointer",
    position: "absolute" as const,
    overflow: "auto",
    maxHeight: "250px",
    padding: "0.5em",
    borderRadius: "4px",
    zIndex: 10,
    input: {
      display: "flex",
      alignItems: "center",
      alignContent: "center",
    },
  },
  option: {
    padding: "0.5em 0.1em",
    margin: "0.5em 0 !important",
    fontSize: customTheme.fontSizes?.xs,
    letterSpacing: "0.72px",
    fontWeight: 400,
  },
  inputDisabledStyles: {
    label: {
      // color: customColors.input.label,
      fontSize: customTheme.fontSizes?.xs,
      marginBottom: "8px",
      fontWeight: 500,
      letterSpacing: "0.72px",
    },
    input: {
      // backgroundColor: customColors.primary.white,
      // borderColor: customColors.text.noActive,
      borderWidth: "1px",
      // color: customColors.text.noActive,
      cursor: "not-allowed",
      opacity: 1,
      fontSize: customTheme.fontSizes?.xs,
      letterSpacing: "0.72px",
      fontWeight: 500,
    },
  },
});
