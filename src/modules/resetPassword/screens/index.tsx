import { Box, Flex, List } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import CustomInput from "../../../components/CustomInput";
import { translate } from "../../../hooks/useTranslator";
import CustomLink from "../../../components/CustomLink";
import CustomButton from "../../../components/CustomButton";
import CustomPasswordInput from "../../../components/CustomPasswordInput";
import CustomTitle from "../../../components/CustomTitle";
import { LOGIN } from "../../../routes/constants";
import LoginLeftSide from "../../../components/LoginLeftSide";
import { IResetPasswordCredentials } from "../core/entities/IResetPasswordCredentials";
import { resetPasswordPresenterProvider } from "../infrastructure/presentation/presenterProvider";
import { ResetPasswordScreens } from "../core/screens/IResetPasswordScreens";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../../utils/toasts";
import { IResetPasswordPresenter } from "../core/presentation/IResetPasswordPresenter";
import { makeStyles } from "./styles";
import TextInfo from "../../../components/TextInfo";

interface ResetPasswordForm {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const translator = translate();
  const navigate = useNavigate();
  const styles = makeStyles();
  const presenterProvider = resetPasswordPresenterProvider();
  const [presenter, setPresenter] = useState<IResetPasswordPresenter>({} as IResetPasswordPresenter);

  const [, setIsLoaded] = useState<boolean>(false);
  const [isResetPasswordLoading, setIsResetPasswordLoading] = useState<boolean>(false);

  const resetPasswordScreens: ResetPasswordScreens = {
    resetPasswordSuccess: () => {
      setIsResetPasswordLoading(false);
      showSuccessToast(translator("resetPassword.success.password_updated"));
      navigate(LOGIN);
    },
    resetPasswordError: (err) => {
      setIsResetPasswordLoading(false);
      showErrorToast(translator("resetPassword.error.password_updated"), err);
    },
  };

  useEffect(() => {
    setPresenter(presenterProvider.getPresenter(resetPasswordScreens));
    setIsLoaded(true);
  }, []);

  const form = useForm<ResetPasswordForm>({
    mode: "controlled",
    initialValues: {
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validate: {
      email: (value) => {
        const emailRegex = /^\S+@\S+$/;
        return emailRegex.test(value) ? null : translator("common.validationsForm.invalidEmail");
      },
      currentPassword: (value) => {
        if (value.length === 0) {
          return translator("common.validationsForm.required");
        }
        if (value.length < 8) {
          return translator("common.validationsForm.password_min_length");
        }
        return null;
      },
      newPassword: (value, values) => {
        if (value.length === 0) {
          return translator("common.validationsForm.required");
        }

        if (value.length < 8) {
          return translator("common.validationsForm.password_min_length");
        }

        // Validar que contenga al menos 1 número
        if (!/\d/.test(value)) {
          return translator("common.validationsForm.password_must_contain_number");
        }

        // Validar que contenga al menos 1 carácter especial
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
          return translator("common.validationsForm.password_must_contain_special_char");
        }

        // Validar que contenga al menos 1 letra mayúscula
        if (!/[A-Z]/.test(value)) {
          return translator("common.validationsForm.password_must_contain_uppercase");
        }

        // Validar que contenga al menos 1 letra minúscula
        if (!/[a-z]/.test(value)) {
          return translator("common.validationsForm.password_must_contain_lowercase");
        }

        // Validar que la nueva contraseña no sea igual a la contraseña actual
        if (value === values.currentPassword) {
          return translator("common.validationsForm.new_password_same_as_current");
        }

        return null;
      },
      confirmPassword: (value, values) => {
        if (value.length === 0) {
          return translator("common.validationsForm.required");
        }
        if (value !== values.newPassword) {
          return translator("common.validationsForm.passwords_not_match");
        }
        return null;
      },
    },
  });

  const handleSubmit = (values: ResetPasswordForm) => {
    setIsResetPasswordLoading(true);

    const credentials: IResetPasswordCredentials = {
      email: values.email,
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    };
    presenter.resetPassword(credentials);
  };

  return (
    <>
      <Flex mih="100vh" w="100%" wrap="nowrap" gap="100" px={"50"} py={"20px"}>
        <Flex flex={1} justify="end" align={"center"}>
          <LoginLeftSide />
        </Flex>
        <Box style={styles.verticalDivider} visibleFrom="md" />

        <Flex flex={1} justify="start" align={"center"}>
          <Box w={{ base: "250px", md: "350px" }}>
            <CustomTitle type="title1">{translator("resetPassword.title")}</CustomTitle>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
              <Flex direction="column" gap="xs">
                <CustomInput
                  label={translator("resetPassword.email_label")}
                  key={form.key("email")}
                  fullWidth={true}
                  {...form.getInputProps("email")}
                />

                <CustomPasswordInput
                  label={translator("resetPassword.current_password_label")}
                  key={form.key("currentPassword")}
                  defaultValue={form.getValues().currentPassword}
                  {...form.getInputProps("currentPassword")}
                />

                <CustomPasswordInput
                  label={translator("resetPassword.new_password_label")}
                  key={form.key("newPassword")}
                  defaultValue={form.getValues().newPassword}
                  {...form.getInputProps("newPassword")}
                />

                <CustomPasswordInput
                  label={translator("resetPassword.confirm_password_label")}
                  key={form.key("confirmPassword")}
                  defaultValue={form.getValues().confirmPassword}
                  {...form.getInputProps("confirmPassword")}
                />
                <Box mt={"xs"}>
                  <List>
                    <TextInfo text={translator("common.validationsForm.password_min_length")} />

                    <TextInfo text={translator("common.validationsForm.password_must_contain_number")} />

                    <TextInfo text={translator("common.validationsForm.password_must_contain_special_char")} />

                    <TextInfo text={translator("common.validationsForm.password_must_contain_uppercase")} />

                    <TextInfo text={translator("common.validationsForm.password_must_contain_lowercase")} />
                  </List>
                </Box>

                <Box style={styles.loginCenteredContainer}>
                  <CustomButton
                    title={translator("resetPassword.submit_button_title")}
                    type="submit"
                    w="220px"
                    variant="primary"
                    loading={isResetPasswordLoading}
                    disabled={isResetPasswordLoading}
                  />
                  <CustomLink value={translator("resetPassword.back_to_login")} linkTo={LOGIN} />
                </Box>
              </Flex>
            </form>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default ResetPassword;
