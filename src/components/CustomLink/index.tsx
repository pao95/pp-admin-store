import { Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { makeStyles } from "./styles";

type CustomLinkProps = {
  value: string;
  linkTo: string;
  textStyles?: React.CSSProperties;
  linkStyles?: React.CSSProperties;
  onClick?: () => void;
};

const CustomLink = ({ value, linkTo, textStyles, linkStyles, onClick }: CustomLinkProps) => {
  const styles = makeStyles();
  return (
    <Link to={linkTo} style={{ ...styles.link, ...linkStyles }} onClick={onClick}>
      <Text
        style={{
          ...styles.text,
          ...textStyles,
        }}
      >
        {value}
      </Text>
    </Link>
  );
};

export default CustomLink;
