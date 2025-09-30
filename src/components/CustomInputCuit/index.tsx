import { InputBase, MantineStyleProp, InputBaseProps } from "@mantine/core";
import { makeStyles as inputMakeStyles } from "../../styles/inputStyles";
import { useState, useEffect } from "react";

type Variant = "default" | "filled" | "Unstyled";
type Margins = "xs" | "sm" | "md" | "lg" | "xl";

type CustomInputCuitProps = {
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
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (event: any) => void;
  fullWidth?: boolean;
} & Omit<InputBaseProps, "value" | "onChange" | "onBlur">;

const CustomInputCuit = ({
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
  value,
  onChange,
  onBlur,
  fullWidth = true,
  ...props
}: CustomInputCuitProps) => {
  const styles = inputMakeStyles(fullWidth);

  const [internalValue, setInternalValue] = useState(value || defaultValue || "");

  const formatCuit = (input: string): string => {
    const numbers = input.replace(/\D/g, "");

    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 10) {
      return `${numbers.slice(0, 2)}-${numbers.slice(2)}`;
    } else {
      return `${numbers.slice(0, 2)}-${numbers.slice(2, 10)}-${numbers.slice(10, 11)}`;
    }
  };

  const cleanCuit = (input: string): string => {
    return input.replace(/\D/g, "");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const cleanedValue = cleanCuit(inputValue);

    if (cleanedValue.length <= 11) {
      const formattedValue = formatCuit(cleanedValue);
      setInternalValue(formattedValue);

      if (onChange) {
        onChange(formattedValue);
      }
      if (onChangeText) {
        onChangeText(formattedValue);
      }
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;
    const cleanedValue = cleanCuit(currentValue);

    if (cleanedValue.length === 11) {
      const formattedValue = formatCuit(cleanedValue);
      setInternalValue(formattedValue);

      if (onChange) {
        onChange(formattedValue);
      }
      if (onChangeText) {
        onChangeText(formattedValue);
      }
    }

    if (onBlur) {
      onBlur(event);
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  return (
    <InputBase
      variant={variant}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      error={error}
      withAsterisk={isMandatory}
      // style={styles.input}
      size="md"
      inputWrapperOrder={["label", "input", "description", "error"]}
      mt={mt}
      mb={mb}
      ml={ml}
      value={internalValue}
      onChange={handleChange}
      onBlur={handleBlur}
      maxLength={13}
      styles={styles.inputStyles}
      {...props}
    />
  );
};

export default CustomInputCuit;
