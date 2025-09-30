import { useState, useEffect, useContext } from "react";
import { useForm } from "@mantine/form";
import { Box, Divider, Flex, Group } from "@mantine/core";
import { IconEdit, IconCheck, IconX } from "@tabler/icons-react";
import { translate } from "../../../../../../hooks/useTranslator";
import CustomTitle from "../../../../../../components/CustomTitle";
import CustomInput from "../../../../../../components/CustomInput";
import CustomNumberInput from "../../../../../../components/CustomNumberInput";
import CustomSelect from "../../../../../../components/CustomSelect";
import CustomButtonWithIcon from "../../../../../../components/CustomButtonWithIcon";

import { makeStyles } from "./styles";
import { removeCuitDashes } from "../../../../../../utils/cuilFormatter";
import { IProvince } from "../../../../core/entities/IProvince";
import { ILocality } from "../../../../core/entities/ILocality";
import { IStore } from "../../../../core/entities/IStore";
import CustomSelectMultiple from "../../../../../../components/CustomSelectMultiple";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { PERMISSIONS } from "../../../../../../constants/permissions";

interface GeneralTabProps {
  store: IStore;
  onUpdateStore: (storeData: IStore) => void;
  loading: boolean;
  provinces: IProvince[];
  localities: ILocality[];
  onProvinceChange: (provinceName: string) => void;
  industries: Array<{ option: string; key: string }>;
}

const GeneralTab = ({
  store,
  onUpdateStore,
  loading,
  provinces,
  localities,
  onProvinceChange,
  industries,
}: GeneralTabProps) => {
  const t = translate();
  const styles = makeStyles();
  const [isEditing, setIsEditing] = useState(false);
  const { actions } = useContext(AuthContext);

  // Formulario con validaciones
  const form = useForm<IStore>({
    mode: "controlled",
    initialValues: {
      businessNameStore: store.businessNameStore,
      tradeNameStore: store.tradeNameStore,
      streetStore: store.streetStore,
      streetNumberStore: store.streetNumberStore,
      floorStore: store.floorStore,
      apartmentStore: store.apartmentStore,
      zipCodeStore: store.zipCodeStore,
      localityStore: store.localityStore,
      provinceStore: store.provinceStore,
      cuitStore: store.cuitStore,
      categoryStore: store.categoryStore,
      emailStore: store.emailStore,
      vatConditionStore: store.vatConditionStore,
      iibbRegisteredStore: store.iibbRegisteredStore,
      profitsRegisteredStore: store.profitsRegisteredStore,
      enabledStore: store.enabledStore,
    },
    validateInputOnBlur: true,
    validate: {
      businessNameStore: (value) => {
        if (!value) return t("common.validationsForm.required");
        if (value.length > 100) return t("common.validationsForm.maxLength", { max: 100 });
        return null;
      },
      tradeNameStore: (value) => {
        if (!value) return t("common.validationsForm.required");
        if (value.length > 100) return t("common.validationsForm.maxLength", { max: 100 });
        return null;
      },
      streetStore: (value) => {
        if (!value) return t("common.validationsForm.required");
        if (value.length > 100) return t("common.validationsForm.maxLength", { max: 100 });
        return null;
      },
      streetNumberStore: (value) => {
        if (value === null || value === undefined || !value) return t("common.validationsForm.required");
        if (value <= 0) return t("common.validationsForm.invalidStreetNumber");
        return null;
      },
      zipCodeStore: (value) => {
        if (!value) return t("common.validationsForm.required");
        if (!/^\d{4,5}$/.test(value)) return t("common.validationsForm.invalidZipCode");
        return null;
      },
      localityStore: (value) => {
        if (!value) return t("common.validationsForm.required");
        return null;
      },
      provinceStore: (value) => {
        if (!value) return t("common.validationsForm.required");
        return null;
      },

      cuitStore: (value) => {
        if (!value) return t("common.validationsForm.required");
        const digitsOnly = value.replace(/\D/g, "");
        if (digitsOnly.length !== 11) return t("common.validationsForm.invalidCuit");
        return null;
      },

      categoryStore: (value) => {
        if (!value || value.length === 0) return t("common.validationsForm.required");
        return null;
      },

      emailStore: (value) => {
        if (!value) return t("common.validationsForm.required");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t("common.validationsForm.invalidEmail");
        return null;
      },
    },
  });

  // Actualizar formulario cuando cambie el store
  useEffect(() => {
    form.setValues({
      businessNameStore: store.businessNameStore,
      tradeNameStore: store.tradeNameStore,
      streetStore: store.streetStore,
      streetNumberStore: store.streetNumberStore,
      floorStore: store.floorStore,
      apartmentStore: store.apartmentStore,
      zipCodeStore: store.zipCodeStore,
      localityStore: store.localityStore,
      provinceStore: store.provinceStore,
      cuitStore: store.cuitStore,
      categoryStore: store.categoryStore,
      emailStore: store.emailStore,
      vatConditionStore: store.vatConditionStore,
      iibbRegisteredStore: store.iibbRegisteredStore,
      profitsRegisteredStore: store.profitsRegisteredStore,
      enabledStore: store.enabledStore,
    });
  }, [store]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    form.reset();
  };

  const handleSaveEdit = () => {
    const validation = form.validate();
    if (validation.hasErrors) {
      return;
    }

    const formData: IStore = {
      businessNameStore: form.values.businessNameStore,
      tradeNameStore: form.values.tradeNameStore,
      streetStore: form.values.streetStore,
      streetNumberStore: form.values.streetNumberStore,
      floorStore: form.values.floorStore,
      apartmentStore: form.values.apartmentStore,
      zipCodeStore: form.values.zipCodeStore,
      localityStore: form.values.localityStore,
      provinceStore: form.values.provinceStore,
      cuitStore: removeCuitDashes(form.values.cuitStore),
      categoryStore: form.values.categoryStore,
      emailStore: form.values.emailStore,
      vatConditionStore: form.values.vatConditionStore,
      iibbRegisteredStore: form.values.iibbRegisteredStore,
      profitsRegisteredStore: form.values.profitsRegisteredStore,
      enabledStore: form.values.enabledStore,
    };

    onUpdateStore(formData);
    setIsEditing(false);
  };

  const provincesOptions = provinces.map((province) => ({
    option: province.name,
    key: province.id,
  }));

  const localitiesOptions = localities.map((locality) => ({
    option: locality.name,
    key: locality.id,
  }));

  const renderActionButtons = () => {
    if (isEditing) {
      return (
        <Group>
          <CustomButtonWithIcon
            size="sm"
            variant="light"
            color="gray"
            leftSection={<IconX size={16} />}
            onClick={handleCancelEdit}
            disabled={loading}
            title={t("common.cancel")}
          />

          <CustomButtonWithIcon
            size="sm"
            variant="primary"
            leftSection={<IconCheck size={16} />}
            onClick={handleSaveEdit}
            loading={loading}
            title={t("common.save")}
          />
        </Group>
      );
    }

    return (
      <CustomButtonWithIcon
        title={t("common.edit")}
        size="sm"
        variant="light"
        leftSection={<IconEdit size={16} />}
        onClick={handleEdit}
        disabled={!actions.hasPermission([PERMISSIONS.STORE_EDIT])}
      />
    );
  };

  return (
    <Box>
      <Box style={styles.containerBox}>
        <Flex justify="space-between" align="center" mb="md">
          <CustomTitle type="title2" mb={10}>
            {t("store.edit.commons.sections.businessData")}
          </CustomTitle>
          <Flex justify="flex-end" align="center" mb="md">
            {renderActionButtons()}
          </Flex>
        </Flex>
        <Flex columnGap="xs" wrap="wrap" direction="row">
          <CustomInput
            label={t("store.edit.generalSection.fields.tradeNameStore")}
            placeholder={t("store.edit.generalSection.placeholders.tradeNameStore")}
            key={form.key("tradeNameStore")}
            {...form.getInputProps("tradeNameStore")}
            disabled={!isEditing}
            fullWidth={false}
            isMandatory
            mb="md"
          />
          <CustomInput
            label={t("store.edit.generalSection.fields.emailStore")}
            placeholder={t("store.edit.generalSection.placeholders.emailStore")}
            key={form.key("emailStore")}
            {...form.getInputProps("emailStore")}
            disabled={!isEditing}
            fullWidth={false}
            isMandatory
            mb="md"
            type="email"
          />
        </Flex>
        <Flex columnGap="xs" wrap="wrap" direction="row">
          <CustomSelectMultiple
            label={t("store.edit.generalSection.fields.categoryStore")}
            placeholder={t("store.edit.generalSection.placeholders.categoryStore")}
            key={form.key("categoryStore")}
            {...form.getInputProps("categoryStore")}
            options={industries}
            disabled={!isEditing}
            defaultValue={store.categoryStore}
            fullWidth={false}
            isMandatory
            mb="md"
          />
        </Flex>
      </Box>

      <Divider />

      <Box style={styles.containerBox}>
        <Flex justify="space-between" align="center" mb="md">
          <CustomTitle type="title2" mb={10}>
            {t("store.edit.commons.sections.legalAddress")}
          </CustomTitle>
        </Flex>
        <Flex columnGap="xs" wrap="wrap" direction="row">
          <CustomInput
            label={t("store.edit.generalSection.fields.streetStore")}
            placeholder={t("store.edit.generalSection.placeholders.streetStore")}
            key={form.key("streetStore")}
            {...form.getInputProps("streetStore")}
            disabled={!isEditing}
            fullWidth={false}
            isMandatory
            mb="md"
          />
          <CustomNumberInput
            label={t("store.edit.generalSection.fields.streetNumberStore")}
            placeholder={t("store.edit.generalSection.placeholders.streetNumberStore")}
            key={form.key("streetNumberStore")}
            {...form.getInputProps("streetNumberStore")}
            disabled={!isEditing}
            fullWidth={false}
            isMandatory
            mb="md"
            min={1}
          />
          <CustomInput
            label={t("store.edit.generalSection.fields.floorStore")}
            placeholder={t("store.edit.generalSection.placeholders.floorStore")}
            key={form.key("floorStore")}
            {...form.getInputProps("floorStore")}
            disabled={!isEditing}
            fullWidth={false}
            mb="md"
          />
          <CustomInput
            label={t("store.edit.generalSection.fields.apartmentStore")}
            placeholder={t("store.edit.generalSection.placeholders.apartmentStore")}
            key={form.key("apartmentStore")}
            {...form.getInputProps("apartmentStore")}
            disabled={!isEditing}
            fullWidth={false}
            mb="md"
          />
          <CustomInput
            label={t("store.edit.generalSection.fields.zipCodeStore")}
            placeholder={t("store.edit.generalSection.placeholders.zipCodeStore")}
            key={form.key("zipCodeStore")}
            {...form.getInputProps("zipCodeStore")}
            disabled={!isEditing}
            fullWidth={false}
            isMandatory
            mb="md"
          />
        </Flex>
        <Flex columnGap="xs" wrap="wrap" direction="row">
          <CustomSelect
            label={t("store.edit.generalSection.fields.provinceStore")}
            placeholder={t("store.edit.generalSection.placeholders.provinceStore")}
            key={form.key("provinceStore")}
            {...form.getInputProps("provinceStore")}
            options={provincesOptions}
            disabled={!isEditing}
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
            label={t("store.edit.generalSection.fields.localityStore")}
            placeholder={t("store.edit.generalSection.placeholders.localityStore")}
            key={form.key("localityStore")}
            {...form.getInputProps("localityStore")}
            options={localitiesOptions}
            disabled={!isEditing}
            fullWidth={false}
            isMandatory
            mb="md"
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default GeneralTab;
