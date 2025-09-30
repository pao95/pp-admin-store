import { Flex, InputBase, MantineStyleProp, Text, InputBaseProps } from "@mantine/core";
import { makeStyles as inputMakeStyles } from "../../styles/inputStyles";
import { IMaskInput } from "react-imask";

type Variant = "default" | "filled" | "Unstyled";
type Margins = "xs" | "sm" | "md" | "lg" | "xl";

type CustomInputCellPhoneProps = {
  label: string;
  description?: string;
  placeholder?: string;
  variant?: Variant;
  error?: string;
  isMandatory?: boolean;
  onChangeText?: (value: string) => void;
  mt?: Margins;
  ml?: Margins;
  mb?: Margins;
  disabled?: boolean;
  defaultValue?: string;
  isLabelBlue?: boolean;
  disabledStyles?: MantineStyleProp;
  onAccept?: (value: string) => void;
  fullWidth?: boolean;
} & InputBaseProps;

const CustomInputCellPhone = ({
  label,
  placeholder,
  variant = "default",
  error,
  isMandatory,
  onChangeText,
  mt,
  ml,
  mb,
  disabled,
  defaultValue,
  disabledStyles,
  onAccept,
  fullWidth = true,
  ...props
}: CustomInputCellPhoneProps) => {
  const styles = inputMakeStyles(fullWidth);
  return (
    <InputBase
      leftSection={
        <Flex>
          <Text style={styles.leftSectionText}>+54</Text>
          <div style={styles.divider} />
        </Flex>
      }
      component={IMaskInput}
      mask="(000) 000-00-00"
      variant={variant}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      error={error}
      withAsterisk={isMandatory}
      onAccept={onAccept}
      size="md"
      inputWrapperOrder={["label", "input", "description", "error"]}
      mt={mt}
      mb={mb}
      ml={ml}
      styles={styles.inputStyles}
      {...props}
    />
  );
};

export default CustomInputCellPhone;
