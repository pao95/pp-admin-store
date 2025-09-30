import { customColors } from "../../../../../../themes/customColors";

export const makeStyles = () => ({
  containerBox: {
    // backgroundColor: "white",
    // borderRadius: "8px",
    // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    // padding: "24px",
  },
  headerContainer: {
    // backgroundColor: "white",
    // borderRadius: "8px",
    // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    // padding: "20px",
    // marginBottom: "16px",
    // backgroundColor: "white",
    // borderRadius: "16px",
    // border: `1px solid ${customColors.gray.gray300}`,
    padding: "10px",
    backgroundColor: customColors.gray.gray200,
    borderRadius: "16px 16px 0 0",
    // marginBottom: "10px",
  },
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
  statusBadge: {
    backgroundColor: customColors.alerts.successLight,
    color: customColors.alerts.successDark,
  },
});
