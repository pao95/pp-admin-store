import React from "react";
import { Box, Divider, Flex } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { translate } from "../../../../../hooks/useTranslator";
import CustomInput from "../../../../../components/CustomInput";
import CustomInputCuit from "../../../../../components/CustomInputCuit";
import CustomInputDate from "../../../../../components/CustomInputDate";
import CustomRadioGroup from "../../../../../components/CustomRadioGroup";
import CustomSelect from "../../../../../components/CustomSelect";
import { makeStyles } from "./styles";
import CustomTitle from "../../../../../components/CustomTitle";
import { IProvince } from "../../../core/entities/IProvince";
import { ILocality } from "../../../core/entities/ILocality";
import CustomInputCellPhone from "../../../../../components/CustomInputCellphone";
import { getMaxDate } from "../../../../../utils/getMaxDate";
import IconButton from "../../../../../components/IconButton";
import { IconCircleX } from "@tabler/icons-react";
import TextInfo from "../../../../../components/TextInfo";
import { IUser } from "../../../core/entities/IUser";

interface FormStep1Props {
  form: UseFormReturnType<IUser>;
  genderOptions: Array<{ option: string; key: string }>;
  provinces?: IProvince[];
  localities?: ILocality[];
  onProvinceChange?: (provinceName: string) => void;
  handleCancel: () => void;
}

const FormStep1: React.FC<FormStep1Props> = ({
  form,
  genderOptions,
  provinces = [],
  localities = [],
  onProvinceChange,
  handleCancel,
}) => {
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
            {t("store.register.step1.title")}
          </CustomTitle>

          <CustomTitle type="subtitle">{t("store.register.step1.description")}</CustomTitle>
        </Box>

        <Box style={styles.iconClose}>
          <IconButton variant="transparent" size="md" icon={<IconCircleX />} color="default" onClick={handleCancel} />
        </Box>
      </Box>

      {/* <Divider /> */}
      <Box style={styles.containerBoxBottom}>
        <CustomTitle type="title2" mb={10}>
          {t("store.register.step1.personalData.title")}
        </CustomTitle>

        <Flex columnGap="xs" wrap="wrap" direction="row">
          <CustomInput
            label={t("store.register.step1.fields.lastNameUser")}
            placeholder={t("store.register.step1.placeholders.lastNameUser")}
            key={form.key("lastNameUser")}
            {...form.getInputProps("lastNameUser")}
            isMandatory
            mb="md"
            fullWidth={false}
          />

          <CustomInput
            label={t("store.register.step1.fields.firstNameUser")}
            placeholder={t("store.register.step1.placeholders.firstNameUser")}
            key={form.key("firstNameUser")}
            {...form.getInputProps("firstNameUser")}
            isMandatory
            mb="md"
            fullWidth={false}
          />
          <CustomInputCuit
            label={t("store.register.step1.fields.cuilUser")}
            placeholder={t("store.register.step1.placeholders.cuilUser")}
            key={form.key("cuilUser")}
            {...form.getInputProps("cuilUser")}
            isMandatory
            mb="md"
            fullWidth={false}
          />
          <CustomInputDate
            label={t("store.register.step1.fields.birthDateUser")}
            placeholder={t("store.register.step1.placeholders.birthDateUser")}
            key={form.key("birthDateUser")}
            {...form.getInputProps("birthDateUser")}
            isMandatory
            maxDate={getMaxDate()}
            fullWidth={false}
          />

          <CustomRadioGroup
            label={t("store.register.step1.fields.genderUser")}
            options={genderOptions}
            {...form.getInputProps("genderUser")}
            isMandatory
          />
        </Flex>
      </Box>

      <Divider />

      {/* Datos de Contacto */}
      <Box style={{ ...styles.containerBoxBottom }}>
        <CustomTitle type="title2" mb={10}>
          {t("store.register.step1.contactData.title")}
        </CustomTitle>
        <Flex columnGap="xs" wrap="wrap" direction="row">
          <CustomInputCellPhone
            label={t("store.register.step1.fields.phoneNumberUser")}
            placeholder={t("store.register.step1.placeholders.phoneNumberUser")}
            key={form.key("phoneNumberUser")}
            {...form.getInputProps("phoneNumberUser")}
            onAccept={(value) => {
              form.setFieldValue("phoneNumberUser", value);
            }}
            fullWidth={false}
            isMandatory
            mb="md"
          />
          <CustomInput
            label={t("store.register.step1.fields.emailUser")}
            placeholder={t("store.register.step1.placeholders.emailUser")}
            key={form.key("emailUser")}
            {...form.getInputProps("emailUser")}
            isMandatory
            mb="md"
            type="email"
            fullWidth={false}
          />
        </Flex>
        <TextInfo text={t("store.register.step1.infoDescription")} />
      </Box>

      <Divider />

      {/* Datos de Dirección */}
      <Box style={{ ...styles.containerBoxBottom }}>
        <CustomTitle type="title2" mb={10}>
          {t("store.register.step1.addressData.title")}
        </CustomTitle>
        <Flex columnGap="xs" wrap="wrap" direction="row">
          <CustomInput
            label={t("store.register.step1.fields.addressUser")}
            placeholder={t("store.register.step1.placeholders.addressUser")}
            key={form.key("addressUser")}
            {...form.getInputProps("addressUser")}
            isMandatory
            mb="md"
            fullWidth={false}
          />
          <CustomInput
            label={t("store.register.step1.fields.addressNumberUser")}
            placeholder={t("store.register.step1.placeholders.addressNumberUser")}
            key={form.key("addressNumberUser")}
            {...form.getInputProps("addressNumberUser")}
            isMandatory
            mb="md"
            type="number"
            fullWidth={false}
          />
          <CustomInput
            label={t("store.register.step1.fields.zipCodeUser")}
            placeholder={t("store.register.step1.placeholders.zipCodeUser")}
            key={form.key("zipCodeUser")}
            {...form.getInputProps("zipCodeUser")}
            isMandatory
            mb="md"
            type="number"
            fullWidth={false}
          />
        </Flex>

        <Flex columnGap="xs" wrap="wrap" direction="row">
          <CustomSelect
            label={t("store.register.step1.fields.provinceUser")}
            placeholder={t("store.register.step1.placeholders.provinceUser")}
            options={provincesOptions}
            {...form.getInputProps("provinceUser")}
            fullWidth={false}
            isMandatory
            mb="md"
            onChange={(value) => {
              form.setFieldValue("provinceUser", value as string);
              form.setFieldValue("localityUser", "");
              if (onProvinceChange) {
                const provinceKey = provincesOptions.find((province) => province.option === value)?.key;
                onProvinceChange(provinceKey as string);
              }
            }}
          />
          <CustomSelect
            label={t("store.register.step1.fields.localityUser")}
            placeholder={t("store.register.step1.placeholders.localityUser")}
            options={localitiesOptions}
            {...form.getInputProps("localityUser")}
            fullWidth={false}
            isMandatory
            mb="md"
            onChange={(value) => {
              form.setFieldValue("localityUser", value as string);
            }}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default FormStep1;
