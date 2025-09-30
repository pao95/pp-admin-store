export const makeStyles = () => ({
  container: {
    position: "relative" as const,
    width: "100%",
    height: "90vh",
  },
  backgroundContainer: {
    position: "absolute" as const,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  svg: {
    width: "auto",
    height: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  contentContainer: {
    position: "relative" as const,
    zIndex: 1,
  },
});
