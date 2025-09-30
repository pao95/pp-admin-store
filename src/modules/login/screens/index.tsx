import { Box, Flex, Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useState } from "react";
import CustomInput from "../../../components/CustomInput";
import { translate } from "../../../hooks/useTranslator";
import CustomLink from "../../../components/CustomLink";
import CustomButton from "../../../components/CustomButton";
import CustomPasswordInput from "../../../components/CustomPasswordInput";
import { makeStyles } from "./styles";
import { customColors } from "../../../themes/customColors";
import CustomTitle from "../../../components/CustomTitle";
import { RESET_PASSWORD } from "../../../routes/constants";
import LoginLeftSide from "../../../components/LoginLeftSide";
import { AuthContext } from "../../../contexts/AuthContext";

const Login = () => {
  const translator = translate();
  const { actions } = useContext(AuthContext);

  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const styles = makeStyles();

  const form = useForm({
    mode: "controlled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => {
        const emailRegex = /^\S+@\S+$/;
        return emailRegex.test(value) ? null : translator("common.validationsForm.invalidEmail");
      },
      password: (value) => {
        if (value.length === 0) {
          return translator("common.validationsForm.required");
        }
        if (value.length < 8) {
          return translator("common.validationsForm.password_min_length");
        }
        return null;
      },
    },
  });

  const handleSubmit = async (values: any) => {
    actions.login(values);
  };

  return (
    <>
      <Flex h="100vh" w="100%" wrap="nowrap" gap="100" px={"50"} py={"10"}>
        <Flex flex={1} justify="end" align={"center"}>
          <LoginLeftSide />
        </Flex>
        <Box style={styles.verticalDivider} visibleFrom="md" />

        <Flex flex={1} justify="start" align={"center"}>
          <Box w={{ base: "250px", md: "350px" }}>
            <CustomTitle type="title1">{translator("login.login_title")}</CustomTitle>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
              <Flex direction="column" gap="md">
                <CustomInput
                  label={translator("login.email_label")}
                  key={form.key("email")}
                  fullWidth={true}
                  {...form.getInputProps("email")}
                />
                <CustomPasswordInput
                  label={translator("login.password_label")}
                  key={form.key("password")}
                  defaultValue={form.getValues().password}
                  {...form.getInputProps("password")}
                />

                <Box mt={"xs"}>
                  <CustomLink value={translator("login.forgot_password_link")} linkTo={RESET_PASSWORD} />
                </Box>
                <Checkbox
                  label={translator("login.remember_me")}
                  styles={{ label: styles.checkBoxLabel, input: styles.checkBoxInput }}
                  checked={rememberMe}
                  color={customColors.primary.primary700}
                  onChange={(event) => setRememberMe(event.currentTarget.checked)}
                />
                <Box style={styles.loginCenteredContainer}>
                  <CustomButton
                    title={translator("login.submit_button_title")}
                    type="submit"
                    // disabled={authState.isLoading}
                    w="220px"
                    variant="primary"
                    // loading={authState.isLoading}
                  />
                </Box>
              </Flex>
            </form>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Login;
