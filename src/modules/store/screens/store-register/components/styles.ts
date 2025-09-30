import { customColors } from "../../../../../themes/customColors";

export const makeStyles = () => ({
  containerBox: {
    backgroundColor: "white",
    borderRadius: "16px",
  },
  containerBoxTop: {
    padding: "20px",
    borderRadius: "8px 8px 0 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerBoxBottom: {
    padding: "20px",
    backgroundColor: customColors.gray.gray200,
  },
  containerButtons: {
    marginTop: "1rem",
  },
  documentsDescription: {
    fontSize: "14px",
    color: customColors.gray.gray600,
    lineHeight: "1.5",
  },
  infoBox: {
    padding: "0 20px",
    backgroundColor: customColors.gray.gray200,

    display: "flex",
    alignItems: "center",
    alignContent: "center",
    gap: "10px",
  },
  iconInfo: {
    color: customColors.primary.primary700,
  },
  iconClose: {
    display: "flex",
    justifyContent: "flex-end",
  },
});
