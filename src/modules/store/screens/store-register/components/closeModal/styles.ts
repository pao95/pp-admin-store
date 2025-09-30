import { CSSProperties } from "react";
import { MantineTheme } from "@mantine/core";

export const makeStyles = (theme: MantineTheme) => ({
  modalContainer: {
    backgroundColor: theme.colors.gray[0],
  } as CSSProperties,
  logoModalContainer: {
    paddingTop: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  } as CSSProperties,
});
