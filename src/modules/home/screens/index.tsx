import { Box } from "@mantine/core";
import { DashboardHome } from "./components/DashboardHome";
import { translate } from "../../../hooks/useTranslator";
import CustomTitle from "../../../components/CustomTitle";

const Home = () => {
  const t = translate();
  return (
    <Box mt={20}>
      <CustomTitle type="title1" mb={10}>
        {t("home.welcome")}
      </CustomTitle>
      <CustomTitle type="subtitle" mb={10}>
        {t("home.welcome_subtitle")}
      </CustomTitle>
      <DashboardHome />
    </Box>
  );
};

export default Home;
