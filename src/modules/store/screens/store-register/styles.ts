import { customColors } from "../../../../themes/customColors";

export const makeStyles = () => ({
  containerBox: {
    border: `1px solid ${customColors.gray.gray300}`,
    borderRadius: "16px",
  },
  containerBoxTop: {
    padding: "1rem",
    backgroundColor: customColors.gray.gray200,
    borderRadius: "8px 8px 0 0",
  },
});
