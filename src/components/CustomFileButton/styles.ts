import { customTheme } from "../../themes";

export const makeStyles = () => ({
  label: {
    fontSize: customTheme.fontSizes?.xs,
    // color: customColors.inputLabels,
  },
  button: {
    minWidth: "150px",
  },
  clearIcon: {
    cursor: "pointer",
  },
  errorMessage: {
    // color: customColors.warningAdvice,
    marginTop: "0.5em",
    fontSize: customTheme.fontSizes?.xs,
    fontWeight: "700",
  },
  fileInput: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    maxWidth: "300px",
  },
});
