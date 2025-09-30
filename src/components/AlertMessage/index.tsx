import { Alert, Text, AlertProps } from "@mantine/core";
import { makeStyles } from "./styles";

interface Props extends AlertProps {
  messageBold?: string;
  messageLight?: string;
}

export const AlertMessage = ({ messageBold, messageLight, variant, color, ...rest }: Props) => {
  const styles = makeStyles();

  return (
    <Alert variant={variant} color={color} mb={30} {...rest}>
      <span style={styles.containerTexts}>
        {messageBold && (
          <Text component="span" style={styles.textBold}>
            {messageBold}{" "}
          </Text>
        )}
        {messageLight && <Text component="span">{messageLight}</Text>}
      </span>
    </Alert>
  );
};
