import { useEffect } from "react";
import { Box, Divider, Flex, Group, Button, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import { translate } from "../../../../hooks/useTranslator";
import CustomInput from "../../../../components/CustomInput";
import CustomSelect from "../../../../components/CustomSelect";
import CustomButton from "../../../../components/CustomButton";
import { IProvince } from "../../../store/core/entities/IProvince";
import { ILocality } from "../../../store/core/entities/ILocality";
import { IBranch } from "../../../store/core/entities/IStore";
import { makeStyles } from "./styles";
import CustomTitle from "../../../../components/CustomTitle";
import CustomNumberInput from "../../../../components/CustomNumberInput";

interface FormAbmBranchesProps {
  onSubmit: (values: IBranch[]) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  provinces?: IProvince[];
  localities?: ILocality[];
  onProvinceChange?: (provinceName: string) => void;
  branches?: IBranch[];
}

const FormAbmBranches = ({
  onSubmit,
  onCancel,
  loading = false,
  provinces = [],
  localities = [],
  onProvinceChange,
  branches = [],
}: FormAbmBranchesProps) => {
  const styles = makeStyles();
  const t = translate();

  const provincesOptions = provinces.map((province) => ({
    option: province.name,
    key: province.name,
  }));

  const localitiesOptions = localities.map((locality) => ({
    option: locality.name,
    key: locality.name,
  }));

  const form = useForm<{ branches: IBranch[] }>({
    mode: "controlled",
    initialValues: {
      branches: [],
    },
    validateInputOnBlur: true,
    validate: {
      branches: {
        nameBranch: (value) => {
          if (!value) return t("addBranches.validationsForm.required");
          if (value.length > 100) return t("addBranches.validationsForm.maxLength", { max: 100 });
          return null;
        },
        streetBranch: (value) => {
          if (!value) return t("addBranches.validationsForm.required");
          if (value.length > 200) return t("addBranches.validationsForm.maxLength", { max: 200 });
          return null;
        },
        streetNumberBranch: (value) => {
          if (!value) return t("addBranches.validationsForm.required");
          return null;
        },
        localityBranch: (value) => {
          if (!value) return t("addBranches.validationsForm.required");
          return null;
        },
        provinceBranch: (value) => {
          if (!value) return t("addBranches.validationsForm.required");
          return null;
        },
        emailBranch: (value) => {
          if (!value) return t("addBranches.validationsForm.required");

          if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return t("addBranches.validationsForm.invalidEmail");
          }
          return null;
        },
      },
    },
  });

  const handleSubmit = async (values: { branches: IBranch[] }) => {
    onSubmit(values.branches);
  };

  const handleCancel = () => {
    onCancel();
  };

  const addBranch = () => {
    const newBranch: IBranch = {
      idBranch: "",
      nameBranch: "",
      streetBranch: "",
      streetNumberBranch: "",
      localityBranch: "",
      provinceBranch: "",
      emailBranch: "",
      storeId: 0,
    };
    form.insertListItem("branches", newBranch, 0);
    // setBranches([...branches, newBranch]);
  };

  const removeBranch = (index: number) => {
    // if (branches.length > 1) {
    form.removeListItem("branches", index);
    // setBranches(branches.filter((_, i) => i !== index));
    // }
  };

  useEffect(() => {
    form.setFieldValue(
      "branches",
      branches.map((branch) => ({
        idBranch: branch.idBranch,
        nameBranch: branch.nameBranch,
        streetBranch: branch.streetBranch,
        streetNumberBranch: branch.streetNumberBranch,
        localityBranch: branch.localityBranch,
        provinceBranch: branch.provinceBranch,
        emailBranch: branch.emailBranch,
        storeId: branch.storeId,
      }))
    );
  }, [branches]);

  return (
    <Box style={styles.containerBox}>
      <Box style={styles.containerBoxTop}>
        <Flex justify="space-between" align="center">
          <Box>
            <CustomTitle type="title2">{t("addBranches.title")}</CustomTitle>
            <CustomTitle type="subtitle">{t("addBranches.description")}</CustomTitle>
          </Box>
          <Box>
            {form.values.branches.length === 0 ? (
              <CustomButton
                title={t("addBranches.buttons.addNewBranch")}
                onClick={addBranch}
                variant="light"
                disabled={loading}
              />
            ) : (
              <CustomButton
                title={t("addBranches.buttons.addAnother")}
                onClick={addBranch}
                variant="light"
                disabled={loading}
              />
            )}
          </Box>
        </Flex>
      </Box>
      <Divider />

      {form.values.branches.length === 0 ? (
        <>
          {loading && (
            <Box style={styles.noBranches}>
              <Loader />
            </Box>
          )}

          {!loading && (
            <Box style={{ ...styles.containerBoxBottom, ...styles.noBranches }}>
              <CustomTitle ta="center" type="subtitle">
                {t("addBranches.errors.noBranches")}
              </CustomTitle>
            </Box>
          )}
        </>
      ) : (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Box style={styles.containerBoxBottom}>
            {form.values.branches.map((_, index) => (
              <Box mb="lg" style={styles.containerBox} key={index}>
                <Box>
                  <Box style={styles.containerBoxTop}>
                    <Flex justify="space-between" align="center">
                      <CustomTitle type="title2">
                        {form.values.branches[index].idBranch === ""
                          ? t("addBranches.newBranch")
                          : form.values.branches[index].nameBranch}
                      </CustomTitle>
                      {form.values.branches[index].idBranch === "" && (
                        <Button variant="subtle" color="red" size="sm" onClick={() => removeBranch(index)}>
                          {t("addBranches.buttons.remove")}
                        </Button>
                      )}
                    </Flex>
                  </Box>
                  <Divider />
                  <Box style={styles.containerBoxBottom}>
                    <Flex gap="xl" wrap="nowrap" direction="row">
                      <Box style={{ flex: 1 }}>
                        <CustomInput
                          label={t("addBranches.fields.name")}
                          placeholder={t("addBranches.placeholders.name")}
                          {...form.getInputProps(`branches.${index}.nameBranch`)}
                          isMandatory
                          mb="md"
                        />
                      </Box>
                      <Box style={{ flex: 1 }}>
                        <CustomInput
                          label={t("addBranches.fields.email")}
                          placeholder={t("addBranches.placeholders.email")}
                          {...form.getInputProps(`branches.${index}.emailBranch`)}
                          isMandatory
                          mb="md"
                          type="email"
                        />
                      </Box>
                      <Box style={{ flex: 2 }}></Box>
                    </Flex>
                    <Flex gap="xl" wrap="nowrap" direction="row">
                      <Box style={{ flex: 1 }}>
                        <CustomInput
                          label={t("addBranches.fields.street")}
                          placeholder={t("addBranches.placeholders.street")}
                          {...form.getInputProps(`branches.${index}.streetBranch`)}
                          isMandatory
                          mb="md"
                        />
                      </Box>
                      <Box style={{ flex: 0.5 }}>
                        <CustomNumberInput
                          label={t("addBranches.fields.streetNumber")}
                          placeholder={t("addBranches.placeholders.streetNumber")}
                          {...form.getInputProps(`branches.${index}.streetNumberBranch`)}
                          isMandatory
                          mb="md"
                          min={1}
                        />
                      </Box>
                      <Box style={{ flex: 1 }}>
                        <CustomSelect
                          label={t("addBranches.fields.province")}
                          placeholder={t("addBranches.placeholders.province")}
                          options={provincesOptions}
                          {...form.getInputProps(`branches.${index}.provinceBranch`)}
                          isMandatory
                          mb="md"
                          onChange={(value) => {
                            form.setFieldValue(`branches.${index}.provinceBranch`, value as string);
                            form.setFieldValue(`branches.${index}.localityBranch`, "");
                            if (onProvinceChange) {
                              onProvinceChange(value as string);
                            }
                          }}
                        />
                      </Box>
                      <Box style={{ flex: 1 }}>
                        <CustomSelect
                          label={t("addBranches.fields.locality")}
                          placeholder={t("addBranches.placeholders.locality")}
                          options={localitiesOptions}
                          {...form.getInputProps(`branches.${index}.localityBranch`)}
                          isMandatory
                          mb="md"
                          onChange={(value) => {
                            form.setFieldValue(`branches.${index}.localityBranch`, value as string);
                          }}
                        />
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <Divider />
          <Box style={styles.containerBoxBottom}>
            <Group justify="flex-end" style={styles.containerButtons}>
              <CustomButton
                title={t("addBranches.buttons.cancel")}
                onClick={handleCancel}
                variant="light"
                disabled={loading}
              />
              <CustomButton
                title={t("addBranches.buttons.save")}
                type="submit"
                variant="primary"
                loading={loading}
                disabled={loading || !form.isValid()}
                pr={50}
                pl={50}
              />
            </Group>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default FormAbmBranches;
