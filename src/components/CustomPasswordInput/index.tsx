import { PasswordInput, PasswordInputProps } from "@mantine/core";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { makeStyles as inputMakeStyles } from "../../styles/inputStyles";

type CustomPasswordInputProps = {
  label: React.ReactNode;
  password?: string;
  placeholder?: string;
  defaultValue?: string;
  description?: string;
  fullWidth?: boolean;
} & PasswordInputProps;

const CustomPasswordInput = ({
  label,
  placeholder,
  defaultValue,
  description,
  fullWidth = true,
  ...props
}: CustomPasswordInputProps) => {
  const styles = inputMakeStyles(fullWidth);
  return (
    <PasswordInput
      label={label}
      description={description}
      placeholder={placeholder}
      size="md"
      styles={styles.inputStyles}
      visibilityToggleIcon={({ reveal }) =>
        reveal ? (
          <IconEyeOff
            style={{
              width: "var(--psi-icon-size)",
              height: "var(--psi-icon-size)",
            }}
          />
        ) : (
          <IconEye
            style={{
              width: "var(--psi-icon-size)",
              height: "var(--psi-icon-size)",
            }}
          />
        )
      }
      {...props}
    />
  );
};

export default CustomPasswordInput;
