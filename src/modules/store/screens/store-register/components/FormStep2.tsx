import { Box, Divider, Flex } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { translate } from "../../../../../hooks/useTranslator";
import CustomInput from "../../../../../components/CustomInput";
import CustomNumberInput from "../../../../../components/CustomNumberInput";
import CustomSelect from "../../../../../components/CustomSelect";
import CustomInputCuit from "../../../../../components/CustomInputCuit";
import { IProvince } from "../../../core/entities/IProvince";
import { ILocality } from "../../../core/entities/ILocality";
import CustomTitle from "../../../../../components/CustomTitle";
import IconButton from "../../../../../components/IconButton";
import { IconCircleX } from "@tabler/icons-react";
import { makeStyles } from "./styles";
import CustomRadioGroup from "../../../../../components/CustomRadioGroup";
import { IStore } from "../../../core/entities/IStore";
import CustomSelectMultiple from "../../../../../components/CustomSelectMultiple";

interface FormStep2Props {
  form: UseFormReturnType<IStore>;
  provinces?: IProvince[];
  localities?: ILocality[];
  onProvinceChange?: (provinceName: string) => void;
  vatConditions?: Array<{ option: string; key: string }>;
  yesNoOptions?: Array<{ option: string; key: string }>;
  iibbRegistereds?: Array<{ option: string; key: string }>;
  categories: Array<{ option: string; key: string }>;
  handleCancel: () => void;
}

const FormStep2 = ({
  form,
  provinces = [],
  localities = [],
  onProvinceChange,
  vatConditions = [],
  iibbRegistereds = [],
  yesNoOptions = [],
  categories = [],
  handleCancel,
}: FormStep2Props) => {
  const styles = makeStyles();
  const t = translate();

  const provincesOptions = provinces.map((province) => ({
    option: province.name,
    key: province.id,
  }));

  const localitiesOptions = localities.map((locality) => ({
    option: locality.name,
    key: locality.id,
  }));

  return (
    <Box style={styles.containerBox}>
      <Box style={styles.containerBoxTop}>
        <Box>
          <CustomTitle type="title2" mb={10}>
            {t("store.register.headerBox.title")}
          </CustomTitle>
          <CustomTitle type="subtitle">{t("store.register.headerBox.description")}</CustomTitle>
        </Box>
        <Box style={styles.iconClose}>
          <IconButton variant="transparent" size="md" icon={<IconCircleX />} color="default" onClick={handleCancel} />
        </Box>
      </Box>
      <Box style={styles.containerBoxBottom}>
        <CustomTitle type="title2" mb={10}>
          {t("store.register.step2.taxData.title")}
        </CustomTitle>
        <Flex columnGap="xs" wrap="wrap" direction="row">
          <CustomInput
            label={t("store.register.step2.fields.businessNameStore")}
            placeholder={t("store.register.step2.placeholders.businessNameStore")}
            key={form.key("businessNameStore")}
            {...form.getInputProps("businessNameStore")}
            fullWidth={false}
            isMandatory
            mb="md"
          />
          <CustomInputCuit
            label={t("store.register.step2.fields.cuitStore")}
            placeholder={t("store.register.step2.placeholders.cuitStore")}
            key={form.key("cuitStore")}
            {...form.getInputProps("cuitStore")}
            fullWidth={false}
            isMandatory
            mb="md"
          />
        </Flex>
        <Flex columnGap="xs" wrap="wrap" direction="row">
          <CustomSelect
            label={t("store.register.step2.fields.vatConditionStore")}
            placeholder={t("store.register.step2.placeholders.vatConditionStore")}
            options={vatConditions}
            {...form.getInputProps("vatConditionStore")}
            fullWidth={false}
            isMandatory
            mb="md"
          />

          <CustomSelect
            label={t("store.register.step2.fields.iibbRegisteredStore")}
            placeholder={t("store.register.step2.placeholders.iibbRegisteredStore")}
            options={iibbRegistereds}
            {...form.getInputProps("iibbRegisteredStore")}
            fullWidth={false}
            isMandatory
            mb="md"
          />

          <CustomRadioGroup
            label={t("store.register.step2.fields.profitsRegisteredStore")}
            options={yesNoOptions}
            {...form.getInputProps("profitsRegisteredStore")}
            isMandatory
          />
        </Flex>
      </Box>
      <Divider />
      <Box style={styles.containerBoxBottom}>
        <CustomTitle type="title2" mb={10}>
          {t("store.register.step2.businessData.title")}
        </CustomTitle>
        <Flex columnGap="xs" wrap="wrap" direction="row">
          <CustomInput
            label={t("store.register.step2.fields.tradeNameStore")}
            placeholder={t("store.register.step2.placeholders.tradeNameStore")}
            key={form.key("tradeNameStore")}
            {...form.getInputProps("tradeNameStore")}
            fullWidth={false}
            isMandatory
            mb="md"
          />

          <CustomInput
            label={t("store.register.step2.fields.emailStore")}
            placeholder={t("store.register.step2.placeholders.emailStore")}
            key={form.key("emailStore")}
            {...form.getInputProps("emailStore")}
            fullWidth={false}
            isMandatory
            mb="md"
            type="email"
          />
        </Flex>
        <Flex columnGap="xs" wrap="wrap" direction="row">
          <CustomSelectMultiple
            label={t("store.register.step2.fields.categoryStore")}
            placeholder={t("store.register.step2.placeholders.categoryStore")}
            options={categories}
            {...form.getInputProps("categoryStore")}
            defaultValue={form.values.categoryStore}
            fullWidth={false}
            isMandatory
            mb="md"
          />
        </Flex>
      </Box>
      <Divider />
      <Box style={styles.containerBoxBottom}>
        <CustomTitle type="title2" mb={10}>
          {t("store.register.step2.legalAddress.title")}
        </CustomTitle>
        <Flex columnGap="xs" wrap="wrap" direction="row">
          <CustomInput
            label={t("store.register.step2.fields.streetStore")}
            placeholder={t("store.register.step2.placeholders.streetStore")}
            key={form.key("streetStore")}
            {...form.getInputProps("streetStore")}
            fullWidth={false}
            isMandatory
            mb="md"
          />

          <CustomNumberInput
            label={t("store.register.step2.fields.streetNumberStore")}
            placeholder={t("store.register.step2.placeholders.streetNumberStore")}
            key={form.key("streetNumberStore")}
            {...form.getInputProps("streetNumberStore")}
            fullWidth={false}
            isMandatory
            mb="md"
            min={1}
          />

          <CustomInput
            label={t("store.register.step2.fields.floorStore")}
            placeholder={t("store.register.step2.placeholders.floorStore")}
            key={form.key("floorStore")}
            {...form.getInputProps("floorStore")}
            fullWidth={false}
            mb="md"
          />

          <CustomInput
            label={t("store.register.step2.fields.apartmentStore")}
            placeholder={t("store.register.step2.placeholders.apartmentStore")}
            key={form.key("apartmentStore")}
            {...form.getInputProps("apartmentStore")}
            fullWidth={false}
            mb="md"
          />

          <CustomInput
            label={t("store.register.step2.fields.zipCodeStore")}
            placeholder={t("store.register.step2.placeholders.zipCodeStore")}
            key={form.key("zipCodeStore")}
            {...form.getInputProps("zipCodeStore")}
            fullWidth={false}
            isMandatory
            mb="md"
          />
        </Flex>

        <Flex columnGap="xs" wrap="wrap" direction="row">
          <CustomSelect
            label={t("store.register.step2.fields.provinceStore")}
            placeholder={t("store.register.step2.placeholders.provinceStore")}
            options={provincesOptions}
            {...form.getInputProps("provinceStore")}
            fullWidth={false}
            isMandatory
            mb="md"
            onChange={(value) => {
              form.setFieldValue("provinceStore", value as string);
              form.setFieldValue("localityStore", "");
              if (onProvinceChange) {
                const provinceKey = provincesOptions.find((province) => province.option === value)?.key;
                onProvinceChange(provinceKey as string);
              }
            }}
          />
          <CustomSelect
            label={t("store.register.step2.fields.localityStore")}
            placeholder={t("store.register.step2.placeholders.localityStore")}
            options={localitiesOptions}
            {...form.getInputProps("localityStore")}
            fullWidth={false}
            isMandatory
            mb="md"
            onChange={(value) => {
              form.setFieldValue("localityStore", value as string);
            }}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default FormStep2;
