import { MantineStyleProp, TextInput, TextInputProps, Flex, Text, Tooltip } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { makeStyles as inputMakeStyles } from "../../styles/inputStyles";

type Variant = "default" | "filled" | "Unstyled";

type CustomInputProps = {
  label: string;
  description?: string;
  placeholder?: string;
  variant?: Variant;
  error?: string;
  isMandatory?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  disabledStyles?: MantineStyleProp;
  tooltipText?: string;
  fullWidth?: boolean;
} & TextInputProps;

const CustomInput = ({
  label,
  description,
  placeholder,
  variant = "default",
  error,
  isMandatory,
  disabled,
  defaultValue,
  tooltipText,
  fullWidth = true,
  ...props
}: CustomInputProps) => {
  const styles = inputMakeStyles(fullWidth);

  const renderLabel = () => {
    if (label === "") {
      return null;
    }
    return (
      <Flex align="center" gap="xs">
        <Text style={styles.label}>
          {label}
          {isMandatory && <span style={{ color: "red" }}> *</span>}
        </Text>
        {tooltipText && (
          <Tooltip label={tooltipText} multiline w={300} mb={100}>
            <IconInfoCircle size={16} style={styles.labelWithTooltip} />
          </Tooltip>
        )}
      </Flex>
    );
  };

  return (
    <TextInput
      variant={variant}
      label={renderLabel()}
      description={description}
      placeholder={placeholder}
      error={error}
      disabled={disabled}
      size="md"
      inputWrapperOrder={["label", "input", "description", "error"]}
      color="#000"
      styles={styles.inputStyles}
      {...props}
    />
  );
};

export default CustomInput;
