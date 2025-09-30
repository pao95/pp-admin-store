import { customColors } from "../../themes/customColors";
import { customTheme } from "../../themes";

export const makeStyles = () => ({
  label: {
    fontSize: customTheme.fontSizes?.xs,
    marginBottom: "8px",
    fontWeight: 500,
    letterSpacing: "0.72px",
    color: customColors.gray.gray500,
  },
  labelWithTooltip: {
    cursor: "pointer",
    marginBottom: "8px",
    color: customColors.gray.gray500,
  },
  uploadArea: {
    border: `1px dashed ${customColors.primary.primary300}`,
    borderRadius: "4px",
    padding: "1rem",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor: "white",
    minHeight: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadAreaDragOver: {
    borderColor: customColors.primary.primary700,
    backgroundColor: customColors.primary.primary100,
  },
  uploadIcon: {
    color: customColors.gray.gray500,
  },
  uploadText: {
    fontSize: customTheme.fontSizes?.sm,
    fontWeight: 500,
    color: customColors.gray.gray500,
  },
  uploadSubtext: {
    fontSize: customTheme.fontSizes?.xs,
    color: customColors.gray.gray500,
  },
  fileTypes: {
    fontSize: customTheme.fontSizes?.xs,
    color: customColors.gray.gray400,
  },
  fileDisplay: {
    border: `1px solid ${customColors.primary.primary300}`,
    borderRadius: "8px",
    padding: "1rem",
    backgroundColor: customColors.gray.gray200,
  },
  fileIcon: {
    color: customColors.primary.primary700,
  },
  fileName: {
    fontSize: customTheme.fontSizes?.sm,
    fontWeight: 500,
    color: customColors.gray.gray700,
  },
  fileSize: {
    fontSize: customTheme.fontSizes?.xs,
    color: customColors.gray.gray500,
  },
  removeIcon: {
    color: customColors.gray.gray500,
    "&:hover": {
      color: customColors.alerts.errorDark,
    },
  },
  errorText: {
    fontSize: customTheme.fontSizes?.xs,
    color: customColors.alerts.errorDark,
    marginTop: "0.5rem",
    fontWeight: 500,
  },
});
