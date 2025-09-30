import { customColors } from "../../../../themes/customColors";

export const makeStyles = () => ({
  containerBox: {
    border: `1px solid ${customColors.gray.gray300}`,
    borderRadius: "12px",
  },
  containerBoxTop: {
    padding: "20px",
    backgroundColor: "#FAFDFE",
    borderRadius: "12px 12px 0 0",
  },
  containerBoxBottom: {
    padding: "20px",
  },
  containerButtons: {
    marginTop: "50px",
  },
  noBranches: {
    border: `1px solid ${customColors.gray.gray300}`,
    borderRadius: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px",
    padding: "20px",
  },
});
