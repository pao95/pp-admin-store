import { Container } from "@mantine/core";
import LogoWithSlogan from "../../assets/images/logoWithSlogan";
import { makeStyles } from "./styles";

const Loader = () => {
  const styles = makeStyles();

  return (
    <Container style={styles.mainContainer}>
      <LogoWithSlogan />
    </Container>
  );
};

export default Loader;
