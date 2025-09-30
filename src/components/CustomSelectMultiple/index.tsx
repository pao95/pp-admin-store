import { useState, useEffect } from "react";
import { MultiSelect, MultiSelectProps } from "@mantine/core";
import "@mantine/core/styles/global.css";
import "@mantine/core/styles/Input.css";
import { makeStyles as inputMakeStyles } from "../../styles/inputStyles";
import { translate } from "../../hooks/useTranslator";

type ICustomSelectMultiple = {
  label: string;
  options: any[];
  onChange: (val: string[]) => void;
  loading?: boolean;
  description?: string;
  placeholder?: string;
  error?: string;
  isMandatory?: boolean;
  disabled?: boolean;
  defaultValue?: string[];
  fullWidth?: boolean;
};

type CustomSelectMultipleProps = MultiSelectProps & ICustomSelectMultiple;

export default function CustomSelectMultiple({
  label,
  options = [],
  onChange,
  description,
  placeholder,
  loading = false,
  error,
  isMandatory,
  disabled,
  defaultValue = [],
  value: externalValue,
  fullWidth = true,
  ...props
}: CustomSelectMultipleProps) {
  const [value, setValue] = useState<string[]>(defaultValue || (externalValue as string[]) || []);
  const inputStyles = inputMakeStyles(fullWidth);
  const t = translate();

  // Transformar las opciones al formato que espera MultiSelect
  const transformedOptions = options.map((item) => ({
    value: item.option || item.value || item,
    label: item.option || item.label || item.name || item,
  }));

  useEffect(() => {
    if (defaultValue !== undefined) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (externalValue !== undefined) {
      setValue(externalValue as string[]);
    }
  }, [externalValue]);

  const handleChange = (newValue: string[]) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <MultiSelect
      label={label}
      description={description}
      placeholder={loading ? t("components.selectInput.loading") : placeholder}
      error={error}
      withAsterisk={isMandatory}
      disabled={loading || disabled}
      data={transformedOptions}
      value={value}
      onChange={handleChange}
      size="md"
      inputWrapperOrder={["label", "input", "description", "error"]}
      styles={{
        ...inputStyles.inputStyles,
        input: {
          ...inputStyles.inputStyles.input,
          ...inputStyles.dropdown.input,
        },
      }}
      searchable
      clearable
      {...props}
    />
  );
}
