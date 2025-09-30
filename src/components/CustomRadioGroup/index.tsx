import React from "react";
import { Radio, RadioGroupProps } from "@mantine/core";
import { customColors } from "../../themes/customColors";
import { makeStyles as inputMakeStyles } from "../../styles/inputStyles";

export interface CustomRadioGroupOption {
  option: string;
  key: string;
}

export interface CustomRadioGroupProps extends Omit<RadioGroupProps, "children"> {
  label?: string;
  options: CustomRadioGroupOption[];
  isMandatory?: boolean;
  error?: string;
  mb?: string | number;
}

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
  label,
  options,
  isMandatory = false,
  error,
  mb = "md",
  ...props
}) => {
  const styles = inputMakeStyles();

  return (
    <Radio.Group
      label={<span style={styles.label}>{label}</span>}
      error={error}
      mb={mb}
      {...props}
      withAsterisk={isMandatory}
    >
      <div style={styles.optionsContainer}>
        {options.map((option) => (
          <Radio key={option.key} value={option.key} label={option.option} color={customColors.primary.primary700} />
        ))}
      </div>
    </Radio.Group>
  );
};

export default CustomRadioGroup;
