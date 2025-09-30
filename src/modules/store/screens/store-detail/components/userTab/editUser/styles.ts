import { customColors } from "../../../../../../../themes/customColors";

export const makeStyles = () => ({
  containerBoxTop: {
    padding: "20px",
    borderRadius: " 16px 16px",
    margin: "20px",
    // display: "flex",
    // justifyContent: "space-between",
    // alignItems: "center",
    // border: `1px solid ${customColors.gray.gray300}`,
    backgroundColor: customColors.gray.gray200,
  },
  containerBox: {
    padding: "20px",
  },
  containerBoxButtons: {
    padding: "20px 20px 0px 20px",
  },

  iconClose: {
    display: "flex",
    justifyContent: "flex-end",
  },
});
