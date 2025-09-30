import { useState, useEffect } from "react";
import { Text, Combobox, Input, TextInput, useCombobox, TextInputProps } from "@mantine/core";
import "@mantine/core/styles/global.css";
import "@mantine/core/styles/Input.css";
import { IconChevronDown } from "@tabler/icons-react";
import { makeStyles as inputMakeStyles } from "../../styles/inputStyles";
import { translate } from "../../hooks/useTranslator";

type ICustomSelect = {
  label: string;
  options: any[];
  onChange: (val: string) => void;
  loading?: boolean;
  description?: string;
  placeholder?: string;
  error?: string;
  isMandatory?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  fullWidth?: boolean;
};

type CustomSelectProps = TextInputProps & ICustomSelect;

export default function CustomSelect({
  label,
  options = [],
  onChange,
  description,
  placeholder,
  loading = false,
  error,
  isMandatory,
  disabled,
  defaultValue,
  value: externalValue,
  fullWidth = true,
  ...props
}: CustomSelectProps) {
  const [value, setValue] = useState<string>(defaultValue || (externalValue as string) || "");
  const [search, setSearch] = useState<string>("");
  const styles = inputMakeStyles(fullWidth);

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      setSearch("");
    },
    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
  });

  const t = translate();

  useEffect(() => {
    if (defaultValue !== undefined) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (externalValue !== undefined) {
      setValue(externalValue as string);
    }
  }, [externalValue]);

  useEffect(() => {
    if (value && value !== defaultValue) {
      onChange(value);
    }
  }, [value]);

  const filteredOptions = options.filter((item) => {
    const text = item?.name || item.option || "";
    return text.toLowerCase().includes(search.toLowerCase().trim());
  });

  const optionItems = filteredOptions.map((item, index) => {
    return (
      <Combobox.Option value={item.option} key={`${item.key}-${index}`} style={styles.option}>
        {item.option}
      </Combobox.Option>
    );
  });

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
      disabled={disabled}
    >
      <Combobox.Target>
        <TextInput
          label={label}
          description={description}
          placeholder={placeholder}
          error={error}
          withAsterisk={isMandatory}
          disabled={loading || disabled}
          size="md"
          inputWrapperOrder={["label", "input", "description", "error"]}
          color="#000"
          styles={styles.inputStyles}
          component="button"
          type="button"
          pointer
          value={value}
          onClick={() => !disabled && combobox.toggleDropdown()}
          rightSection={<IconChevronDown strokeWidth={1.5} />}
          rightSectionPointerEvents="none"
          {...props}
        >
          {value ? (
            <Text style={styles.inputStyles.input}>{value}</Text>
          ) : (
            <Input.Placeholder>{loading ? t("components.selectInput.loading") : placeholder}</Input.Placeholder>
          )}
        </TextInput>
      </Combobox.Target>

      <Combobox.Dropdown style={styles.dropdown}>
        <Combobox.Search
          value={search}
          onChange={(e) => {
            setSearch(e.currentTarget.value);
          }}
          placeholder={t("components.selectInput.search_placeholder")}
        />
        <Combobox.Options>
          {optionItems.length > 0 ? (
            optionItems
          ) : (
            <Combobox.Empty>{t("components.selectInput.no_options")}</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
