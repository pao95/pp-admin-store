import { customColors } from "../../../../themes/customColors";

export const makeStyles = () => ({
  containerContent: {
    backgroundColor: "white",
    borderRadius: "16px",
    border: `1px solid ${customColors.gray.gray300}`,
  },
  backButton: {
    color: customColors.gray.gray600,
    fontWeight: 500,
  },
  storeInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  storeIcon: {
    color: customColors.primary.primary700,
    backgroundColor: customColors.primary.primary100,
    borderRadius: "8px",
    padding: "8px",
  },
  storeDetails: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px",
  },
  storeName: {
    fontWeight: 600,
    fontSize: "18px",
    color: customColors.gray.gray800,
  },
  storeCuit: {
    fontSize: "14px",
    color: customColors.gray.gray600,
  },
});
