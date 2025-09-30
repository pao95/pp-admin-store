import { Box } from "@mantine/core";
import { makeStyles } from "./styles";

interface BackgroundProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Background = ({ children, style }: BackgroundProps) => {
  const styles = makeStyles();

  return (
    <Box style={{ ...styles.container, ...style }}>
      <Box style={styles.backgroundContainer}>
        <svg
          width="608"
          height="509"
          viewBox="0 0 608 509"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={styles.svg}
        >
          <path
            d="M116.389 140.727H99.5312V74.803L0 173.212L99.5312 268.026V205.698H116.389C143.292 205.698 165.172 227.398 165.172 254.079V691.333H230.682V254.079C230.682 191.577 179.41 140.727 116.389 140.727Z"
            fill="#F8FAFC"
          />
          <path
            d="M579.552 399.224L480.021 304.41V368.558H465.783C400.841 368.558 347.996 420.968 347.996 485.375V691.333H413.506V485.375C413.506 456.788 436.959 433.529 465.783 433.529H480.021V497.676L579.552 399.267V399.224Z"
            fill="#F8FAFC"
          />
          <path
            d="M607.369 1.08285L469.362 0L512.555 45.3063L285.148 275.693C267.286 293.755 257.459 317.664 257.459 342.959V691.333H322.969V342.959C322.969 334.773 326.157 327.02 331.966 321.129L557.625 92.5184L603.264 140.38L607.413 1.03953L607.369 1.08285Z"
            fill="#F8FAFC"
          />
        </svg>
      </Box>
      <Box style={styles.contentContainer}>{children}</Box>
    </Box>
  );
};

export default Background;
