import { MantineStyleProp, NumberInput, NumberInputProps } from "@mantine/core";
import { makeStyles as inputMakeStyles } from "../../styles/inputStyles";

type Variant = "default" | "filled" | "Unstyled";

type CustomNumberInputProps = {
  label: string;
  description?: string;
  placeholder?: string;
  variant?: Variant;
  error?: string;
  isMandatory?: boolean;
  disabled?: boolean;
  defaultValue?: number;
  disabledStyles?: MantineStyleProp;
  fullWidth?: boolean;
} & NumberInputProps;

const CustomNumberInput = ({
  label,
  description,
  placeholder,
  variant = "default",
  error,
  isMandatory,
  disabled,
  defaultValue,
  disabledStyles,
  fullWidth = true,
  ...props
}: CustomNumberInputProps) => {
  const styles = inputMakeStyles(fullWidth);

  return (
    <NumberInput
      variant={variant}
      label={label}
      description={description}
      placeholder={placeholder}
      error={error}
      withAsterisk={isMandatory}
      disabled={disabled}
      hideControls
      size="md"
      inputWrapperOrder={["label", "input", "description", "error"]}
      color="#000"
      styles={styles.inputStyles}
      {...props}
    />
  );
};

export default CustomNumberInput;
