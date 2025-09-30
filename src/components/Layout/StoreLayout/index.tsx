import { Box, Container, Flex } from "@mantine/core";
import StoreSideMenu from "../StoreSideMenu";
import { layoutStyles } from "../styles";
import CustomLink from "../../CustomLink";
import { translate } from "../../../hooks/useTranslator";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react";

export const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  const t = translate();
  const { actions } = useContext(AuthContext);

  return (
    <Flex>
      <Box style={layoutStyles.container}>
        <Box style={layoutStyles.sideMenuWrapper}>
          <StoreSideMenu />
        </Box>
        <Box style={layoutStyles.contentWrapper} py="md">
          <Box style={layoutStyles.closeSessionContainer} pr={10}>
            <CustomLink
              textStyles={layoutStyles.linkCloseSession}
              linkStyles={layoutStyles.linkCloseSession}
              value={t("login.close_session")}
              linkTo="#"
              onClick={() => actions.logout()}
            />
          </Box>
          <Container size={"xl"}>{children}</Container>
        </Box>
      </Box>
    </Flex>
  );
};
