export const makeStyles = () => ({
  accessModalContainer: {
    padding: "5em",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    paddingBottom: "2em",
  },
  modalButtonsContainer: {
    display: "flex",
    flexDirection: "row" as const,
    justifyContent: "space-between",
    gap: "20px",
  },
});
