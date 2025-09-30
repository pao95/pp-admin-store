import { customColors } from "../../../../../../themes/customColors";

export const makeStyles = () => ({
  noRows: {
    textAlign: "center" as const,
  },
  actions: {
    display: "flex",
    gap: "8px",
  },

  tableContainer: {
    overflowX: "auto" as const,
  },
  noRowsContainer: {
    minHeight: "400px",
    width: "100%",
    border: `1px solid ${customColors.gray.gray300}`,
    borderRadius: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
  link: {
    fontSize: "14px",
  },
});
