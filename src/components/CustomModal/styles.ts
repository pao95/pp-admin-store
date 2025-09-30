import background from "../../assets/images/background.svg";

export const makeStyles = () => ({
  mainModalContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100%",
    backgroundColor: "rgba(62, 121, 171, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  } as const,
  content: {
    zIndex: 1,
    height: "100%",
    overflow: "auto",
    display: "flex",
    flexDirection: "column" as const,
  },
  scrollableContent: {
    flex: 1,
    overflow: "auto",
    minHeight: 0,
  },
  modal: {
    background: "white",
    opacity: 1,
    borderRadius: "8px",
    position: "relative",
    flexDirection: "column",
    minWidth: "800px",
    maxWidth: "800px",
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom 0% left -80%",
    backgroundSize: "60%",
    minHeight: "30%",
    maxHeight: "95%",
    overflow: "hidden",
  } as const,
  closeModalButton: {
    justifyContent: "flex-end",
  },
  bg: {
    position: "absolute" as const,
    marginTop: "10px",
  },
});
