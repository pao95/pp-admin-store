import { makeStyles as inputMakeStyles } from "../../styles/inputStyles";
import { DatesProvider, DatePickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import "./styles.css";
import "dayjs/locale/es";
import { MantineStyleProp } from "@mantine/core";

type Variant = "default" | "filled" | "Unstyled";
type Margins = "xs" | "sm" | "md" | "lg" | "xl";

type CustomInputDateProps = {
  label: string;
  description?: string;
  placeholder?: string;
  variant?: Variant;
  error?: string;
  isMandatory?: boolean;
  mt?: Margins;
  ml?: Margins;
  mb?: Margins;
  disabled?: boolean;
  defaultValue?: Date;
  disabledStyles?: MantineStyleProp;
  value?: Date | null;
  onChange?: (value: Date | null) => void;
  maxDate?: Date;
  fullWidth?: boolean;
};

const CustomInputDate = ({
  label,
  description,
  variant = "default",
  placeholder,
  error,
  isMandatory,
  mt,
  ml,
  mb,
  disabled,
  defaultValue,
  disabledStyles,
  value,
  fullWidth = true,
  ...props
}: CustomInputDateProps) => {
  const styles = inputMakeStyles(fullWidth);

  return (
    <DatesProvider settings={{ locale: "es" }}>
      <DatePickerInput
        valueFormat="DD/MM/YYYY"
        variant={variant}
        label={label}
        description={description}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        withAsterisk={isMandatory}
        size="md"
        mt={mt}
        mb={mb}
        ml={ml}
        inputWrapperOrder={["label", "input", "description", "error"]}
        color="#000"
        styles={styles.inputStyles}
        {...props}
        value={value}
        defaultValue={defaultValue}
      />
    </DatesProvider>
  );
};

export default CustomInputDate;
