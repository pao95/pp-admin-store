import { customTheme } from "../../../themes";
import { customColors } from "../../../themes/customColors";

export const wizardStepperStyles = () => ({
  container: {
    zIndex: 100,
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "flex-start" as const,

    padding: "25px 15px 15px 15px",
    height: "100%",
    width: "100%",
    borderRadius: "16px",
    border: `1px solid ${customColors.gray.gray300}`,
  },
  logoContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "end",
    marginTop: "80px",
  },
  divider: {
    height: "1px",
    background: "#fff",
    marginBottom: "32px",
    backgroundColor: customColors.primary.primary700,
  },
  menuList: {
    flexDirection: "column" as const,
    gap: "16px",
    display: "flex",
    marginTop: "40px",
  },
  menuButton: (active: boolean) => ({
    height: "40px",
    borderRadius: "4px",
    backgroundColor: active ? "#fff" : "transparent",
    display: "flex",
    alignItems: "center",
    padding: "10px",
    color: active ? customColors.primary.primary900 : customColors.primary.primary900,
    fontSize: customTheme.fontSizes?.sm || "14px",
    transition: "background 0.2s",
    cursor: "pointer",
  }),
  stepperItem: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    marginBottom: "12px",
  },
  icon: {
    marginRight: "12px",
  },
  iconCircleCompleted: {
    minWidth: "32px",
    minHeight: "32px",
    borderRadius: "50%",
    backgroundColor: customColors.primary.primary900,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    minWidth: "32px",
    minHeight: "32px",
    borderRadius: "50%",
    border: `2px solid ${customColors.primary.primary700}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    color: customColors.primary.primary700,
    fontSize: customTheme.fontSizes?.sm || "14px",
    fontWeight: 600,
    lineHeight: 1,
  },
  iconTextCompleted: {
    color: "#fff",
    fontSize: customTheme.fontSizes?.sm || "14px",
    fontWeight: 600,
    lineHeight: 1,
  },
  label: {
    fontSize: customTheme.fontSizes?.sm || "14px",
    color: customColors.primary.primary700,
    fontWeight: 500,
  },
});
