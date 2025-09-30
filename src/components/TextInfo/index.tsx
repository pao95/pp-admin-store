import React from "react";
import { Box, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { makeStyles } from "./styles";

interface TextInfoProps {
  text: string;
}

const TextInfo: React.FC<TextInfoProps> = ({ text }) => {
  const styles = makeStyles();

  return (
    <Box style={styles.infoBox}>
      <IconInfoCircle style={styles.iconInfo} size={18} />
      <Text style={styles.textInfo}>{text}</Text>
    </Box>
  );
};

export default TextInfo;
