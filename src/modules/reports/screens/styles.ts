import { customColors } from "../../../themes/customColors";

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
  button: {
    marginTop: "30px",
  },
});
