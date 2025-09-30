import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { Box, Divider, Flex, Group, Text } from "@mantine/core";
import { IconArrowLeft, IconCheck, IconX, IconEdit } from "@tabler/icons-react";
import { translate } from "../../../../../../../hooks/useTranslator";
import CustomTitle from "../../../../../../../components/CustomTitle";
import CustomInput from "../../../../../../../components/CustomInput";
import CustomSelect from "../../../../../../../components/CustomSelect";
import CustomInputCellPhone from "../../../../../../../components/CustomInputCellphone";
import CustomButtonWithIcon from "../../../../../../../components/CustomButtonWithIcon";
import { makeStyles } from "./styles";
import { customColors } from "../../../../../../../themes/customColors";
import { IUser } from "../../../../../core/entities/IUser";
import { IProvince } from "../../../../../core/entities/IProvince";
import { ILocality } from "../../../../../core/entities/ILocality";

interface EditUserProps {
  user: IUser;
  onUpdateUser: (userId: number, userData: IUser) => void;
  onBack: () => void;
  loading: boolean;
  provinces: IProvince[];
  localities: ILocality[];
  onProvinceChange: (provinceName: string) => void;
}

const EditUser = ({ user, onUpdateUser, onBack, loading, provinces, localities, onProvinceChange }: EditUserProps) => {
  const t = translate();
  const styles = makeStyles();
  const [isEditing, setIsEditing] = useState(false);

  // Formulario con validaciones
  const form = useForm<IUser>({
    mode: "controlled",
    initialValues: {
      // Datos del usuario
      lastNameUser: user.lastNameUser || "",
      firstNameUser: user.firstNameUser || "",
      dniUser: user.dniUser || "",
      cuilUser: user.cuilUser || "",
      birthDateUser: user.birthDateUser || null,
      genderUser: user.genderUser || "",
      phoneNumberUser: user.phoneNumberUser || "",
      emailUser: user.emailUser || "",
      addressUser: user.addressUser || "",
      addressNumberUser: user.addressNumberUser || "",
      localityUser: user.localityUser || "",
      provinceUser: user.provinceUser || "",
      zipCodeUser: user.zipCodeUser || "",
    },
    validateInputOnBlur: true,
    validate: {
      // Validaciones del usuario
      lastNameUser: (value) => {
        if (!value) return t("common.validationsForm.required");
        if (value.length > 50) return t("common.validationsForm.maxLength", { max: 50 });
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return t("common.validationsForm.onlyLetters");
        return null;
      },
      firstNameUser: (value) => {
        if (!value) return t("common.validationsForm.required");
        if (value.length > 50) return t("common.validationsForm.maxLength", { max: 50 });
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return t("common.validationsForm.onlyLetters");
        return null;
      },
      dniUser: (value) => {
        if (!value) return t("common.validationsForm.required");
        const digitsOnly = value.toString().replace(/\D/g, "");
        if (digitsOnly.length !== 8) return t("common.validationsForm.invalidDni");
        return null;
      },
      birthDateUser: (value) => {
        if (!value) return t("common.validationsForm.required");
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18 || age > 100) return t("common.validationsForm.invalidAge");
        return null;
      },
      genderUser: (value) => {
        if (!value) return t("common.validationsForm.required");
        return null;
      },
      phoneNumberUser: (value) => {
        if (!value) return t("common.validationsForm.required");
        const digitsOnly = value.toString().replace(/\D/g, "");
        if (digitsOnly.length < 10 || digitsOnly.length > 10) return t("common.validationsForm.invalidPhone");
        return null;
      },
      emailUser: (value) => {
        if (!value) return t("common.validationsForm.required");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t("common.validationsForm.invalidEmail");
        return null;
      },
      addressUser: (value) => {
        if (!value) return t("common.validationsForm.required");
        if (value.length > 100) return t("common.validationsForm.maxLength", { max: 100 });
        return null;
      },
      addressNumberUser: (value) => {
        if (!value) return t("common.validationsForm.required");
        if (!/^\d+$/.test(value)) return t("common.validationsForm.invalidAddressNumber");
        return null;
      },
      localityUser: (value) => {
        if (!value) return t("common.validationsForm.required");
        return null;
      },
      provinceUser: (value) => {
        if (!value) return t("common.validationsForm.required");
        return null;
      },
      zipCodeUser: (value) => {
        if (!value) return t("common.validationsForm.required");
        if (!/^\d{4,5}$/.test(value)) return t("common.validationsForm.invalidZipCode");
        return null;
      },
    },
  });

  // Actualizar formulario cuando cambie el usuario
  useEffect(() => {
    form.setValues({
      lastNameUser: user.lastNameUser || "",
      firstNameUser: user.firstNameUser || "",
      dniUser: user.dniUser || "",
      cuilUser: user.cuilUser || "",
      birthDateUser: user.birthDateUser || null,
      genderUser: user.genderUser || "",
      phoneNumberUser: user.phoneNumberUser || "",
      emailUser: user.emailUser || "",
      addressUser: user.addressUser || "",
      addressNumberUser: user.addressNumberUser || "",
      localityUser: user.localityUser || "",
      provinceUser: user.provinceUser || "",
      zipCodeUser: user.zipCodeUser || "",
    });
  }, [user]);

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

    const formData: IUser = {
      lastNameUser: form.values.lastNameUser,
      firstNameUser: form.values.firstNameUser,
      dniUser: form.values.dniUser,
      cuilUser: form.values.cuilUser,
      birthDateUser: form.values.birthDateUser || null,
      genderUser: form.values.genderUser,
      phoneNumberUser: form.values.phoneNumberUser || "",
      emailUser: form.values.emailUser,
      addressUser: form.values.addressUser,
      addressNumberUser: form.values.addressNumberUser || "",
      localityUser: form.values.localityUser || "",
      provinceUser: form.values.provinceUser || "",
      zipCodeUser: form.values.zipCodeUser,
    };

    onUpdateUser(user.idUser || 0, formData);
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

  return (
    <Box>
      <Box style={styles.containerBoxButtons}>
        <Flex justify="space-between" align="center">
          <CustomButtonWithIcon
            title={t("store.edit.userSection.returnButton")}
            onClick={onBack}
            variant="subtle"
            disabled={false}
            icon={() => <IconArrowLeft />}
            leftIcon={true}
          />
          {!isEditing ? (
            <CustomButtonWithIcon
              size="sm"
              variant="light"
              leftSection={<IconEdit size={16} />}
              onClick={handleEdit}
              disabled={loading}
              title={t("common.edit")}
            />
          ) : (
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
          )}
        </Flex>
      </Box>
      <Box style={styles.containerBox}>
        <Flex justify="space-between" align="center">
          <CustomTitle type="title2">{t("store.edit.commons.sections.personalData")}</CustomTitle>
        </Flex>
      </Box>

      <Box style={styles.containerBoxTop}>
        <Flex columnGap="xs" wrap="wrap" direction="row">
          <Box>
            <Flex justify="start" align="center" mb="md">
              <Text size="xs" c={customColors.gray.gray700} fw={500}>
                {t("store.edit.userSection.fields.firstNameUser")}:
              </Text>
              <Text size="xs" c={customColors.gray.gray500} fw={400} ml="5">
                {user.firstNameUser}
              </Text>
            </Flex>
          </Box>
          <Box>
            <Flex justify="start" align="center" mb="md">
              <Text size="xs" c={customColors.gray.gray700} fw={500}>
                {t("store.edit.userSection.fields.lastNameUser")}:
              </Text>
              <Text size="xs" c={customColors.gray.gray500} fw={400} ml="5">
                {user.lastNameUser}
              </Text>
            </Flex>
          </Box>
          <Box>
            <Flex justify="start" align="center" mb="md">
              <Text size="xs" c={customColors.gray.gray700} fw={500}>
                {t("store.edit.userSection.fields.dniUser")}:
              </Text>
              <Text size="xs" c={customColors.gray.gray500} fw={400} ml="5">
                {user.dniUser}
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Flex columnGap="xs" wrap="wrap" direction="row">
          <Box>
            <Flex justify="start" align="center" mb="md">
              <Text size="xs" c={customColors.gray.gray700} fw={500}>
                {t("store.edit.userSection.fields.birthDateUser")}:
              </Text>
              <Text size="xs" c={customColors.gray.gray500} fw={400} ml="5">
                {user.birthDateUser ? new Date(user.birthDateUser).toLocaleDateString() : ""}
              </Text>
            </Flex>
          </Box>
          <Box>
            <Flex justify="start" align="center" mb="md">
              <Text size="xs" c={customColors.gray.gray700} fw={500}>
                {t("store.edit.userSection.fields.genderUser")}:
              </Text>
              <Text size="xs" c={customColors.gray.gray500} fw={400} ml="5">
                {user.genderUser}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Box>

      <Box style={styles.containerBox}>
        <Flex justify="space-between" align="center" mb="md">
          <CustomTitle type="title2" mb={10}>
            {t("store.edit.commons.sections.contactData")}
          </CustomTitle>
        </Flex>
        <Flex columnGap="xs" wrap="wrap" direction="row">
          <CustomInputCellPhone
            label={t("store.edit.userSection.fields.phoneNumberUser")}
            placeholder={t("store.edit.userSection.placeholders.phoneNumberUser")}
            key={form.key("phoneNumberUser")}
            {...form.getInputProps("phoneNumberUser")}
            onAccept={(value) => {
              form.setFieldValue("phoneNumberUser", value);
            }}
            disabled={!isEditing}
            fullWidth={false}
            isMandatory
            mb="md"
          />
          <CustomInput
            label={t("store.edit.userSection.fields.emailUser")}
            placeholder={t("store.edit.userSection.placeholders.emailUser")}
            key={form.key("emailUser")}
            {...form.getInputProps("emailUser")}
            disabled={!isEditing}
            fullWidth={false}
            isMandatory
            mb="md"
            type="email"
          />
        </Flex>
      </Box>

      <Divider />

      <Box style={styles.containerBox}>
        <Flex justify="space-between" align="center" mb="md">
          <CustomTitle type="title2" mb={10}>
            {t("store.edit.commons.sections.addressData")}
          </CustomTitle>
        </Flex>
        <Flex columnGap="xs" wrap="wrap" direction="row">
          <CustomInput
            label={t("store.edit.userSection.fields.addressUser")}
            placeholder={t("store.edit.userSection.placeholders.addressUser")}
            key={form.key("addressUser")}
            {...form.getInputProps("addressUser")}
            disabled={!isEditing}
            fullWidth={false}
            isMandatory
            mb="md"
          />
          <CustomInput
            label={t("store.edit.userSection.fields.addressNumberUser")}
            placeholder={t("store.edit.userSection.placeholders.addressNumberUser")}
            key={form.key("addressNumberUser")}
            {...form.getInputProps("addressNumberUser")}
            disabled={!isEditing}
            fullWidth={false}
            isMandatory
            mb="md"
            type="number"
          />
          <CustomInput
            label={t("store.edit.userSection.fields.zipCodeUser")}
            placeholder={t("store.edit.userSection.placeholders.zipCodeUser")}
            key={form.key("zipCodeUser")}
            {...form.getInputProps("zipCodeUser")}
            disabled={!isEditing}
            fullWidth={false}
            isMandatory
            mb="md"
            type="number"
          />
        </Flex>
        <Flex columnGap="xs" wrap="wrap" direction="row">
          <CustomSelect
            label={t("store.edit.userSection.fields.provinceUser")}
            placeholder={t("store.edit.userSection.placeholders.provinceUser")}
            key={form.key("provinceUser")}
            {...form.getInputProps("provinceUser")}
            options={provincesOptions}
            disabled={!isEditing}
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
            label={t("store.edit.userSection.fields.localityUser")}
            placeholder={t("store.edit.userSection.placeholders.localityUser")}
            key={form.key("localityUser")}
            {...form.getInputProps("localityUser")}
            options={localitiesOptions}
            disabled={!isEditing}
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

export default EditUser;
