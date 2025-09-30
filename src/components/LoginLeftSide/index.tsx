import { Box, Image, Title, Flex } from "@mantine/core";
import Logo from "../../assets/images/logo-consumo.svg";
import login from "../../assets/images/login.png";
import CustomLink from "../CustomLink";
import { translate } from "../../hooks/useTranslator";
import { makeStyles } from "./styles";

const LoginLeftSide = () => {
  const translator = translate();
  const styles = makeStyles();

  return (
    <Box>
      <Image src={Logo} maw="300px" w={{ base: "15vw", md: "20vw" }} />
      <Box mt="lg" mb="xl">
        <Title order={2} style={styles.loginColorTitle}>
          {translator("login.tid_title_slogan")}
        </Title>
        <Title order={2} style={styles.loginColorTitleSecond}>
          {translator("login.tid_title_slogan_second")}
        </Title>
      </Box>
      <Flex>
        <Image src={login} h={{ base: "15vw", md: "20vw" }} mah={230} fit="contain" mb="lg" />
      </Flex>

      <Flex direction="row" gap="sm">
        <CustomLink
          textStyles={styles.linkFooter}
          linkStyles={styles.linkFooter}
          value={translator("login.footer_link_about_us")}
          linkTo="#"
        />
        <CustomLink
          textStyles={styles.linkFooter}
          linkStyles={styles.linkFooter}
          value={translator("login.footer_link_objectives")}
          linkTo="#"
        />
        <CustomLink
          textStyles={styles.linkFooter}
          linkStyles={styles.linkFooter}
          value={translator("login.footer_link_why_choose_us")}
          linkTo="#"
        />
      </Flex>
    </Box>
  );
};

export default LoginLeftSide;
