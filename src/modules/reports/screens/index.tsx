import { useState, useEffect } from "react";
import { Box, Divider, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { translate } from "../../../hooks/useTranslator";
import dayjs from "dayjs";
import CustomTitle from "../../../components/CustomTitle";
import CustomButton from "../../../components/CustomButton";
import CustomInputDate from "../../../components/CustomInputDate";
import CustomSelect from "../../../components/CustomSelect";
import { IReportsPresenter } from "../core/presentation/IReportsPresenter";
import { IReportsScreens } from "../core/screens/IReportsScreens";
import { IReportRequest } from "../core/entities/IReportRequest";
import { reportsPresenterProvider } from "../infrastructure/presentation/presenterProvider";
import { showErrorToast, showSuccessToast } from "../../../utils/toasts";
import { makeStyles } from "./styles";
import CustomButtonWithIcon from "../../../components/CustomButtonWithIcon";
import { IconDownload } from "@tabler/icons-react";
import { downloadFile } from "../../../utils/downloadUtils";
import CustomInput from "../../../components/CustomInput";

interface ReportFormValues {
  startDate: Date | null;
  endDate: Date | null;
  status: string;
  filename: string;
}

const Reports = () => {
  const t = translate();
  const [presenter, setPresenter] = useState<IReportsPresenter>({} as IReportsPresenter);
  const [loading, setLoading] = useState(false);
  const styles = makeStyles();
  const presenterProvider = reportsPresenterProvider();

  const form = useForm<ReportFormValues>({
    mode: "controlled",
    initialValues: {
      startDate: null,
      endDate: null,
      status: "",
      filename: t("reports.defaultValues.filename"),
    },
    validateInputOnChange: true,
    validate: {
      startDate: (value) => {
        if (!value) return t("reports.validations.startDateRequired");
        if (dayjs(value).isAfter(dayjs(form.values.endDate))) return t("reports.validations.startDateAfterEndDate");
        return null;
      },
      endDate: (value) => {
        if (!value) return t("reports.validations.endDateRequired");
        if (dayjs(value).isBefore(dayjs(form.values.startDate))) return t("reports.validations.endDateBeforeStartDate");
        return null;
      },
      status: (value) => {
        if (!value) return t("reports.validations.statusRequired");
        return null;
      },
      filename: (value) => {
        if (!value) return t("reports.validations.filenameRequired");
        return null;
      },
    },
  });

  const statusOptions = [
    { option: t("reports.filters.allStatuses"), key: "all" },
    { option: t("reports.filters.incomplete"), key: "created" },
    { option: t("reports.filters.approved"), key: "approved" },
    { option: t("reports.filters.rejected"), key: "rejected" },
  ];

  const viewHandlers: IReportsScreens = {
    onDownloadReportSuccess: (response) => {
      setLoading(false);
      if (response.success && response.downloadUrl) {
        downloadFile({
          url: response.downloadUrl,
          filename: `${form.values.filename}.xlsx`,
        });

        showSuccessToast(t("reports.success.download"), t("reports.success.downloadMessage"));
      } else {
        showErrorToast(t("reports.errors.download"), response.message || t("reports.errors.generic"));
      }
    },
    onDownloadReportError: (error: string) => {
      setLoading(false);
      showErrorToast(t("reports.errors.download"), error);
    },
  };

  useEffect(() => {
    setPresenter(presenterProvider.getPresenter(viewHandlers));
  }, [form.values.filename]);

  const handleDownload = () => {
    const validation = form.validate();
    if (validation.hasErrors) {
      return;
    }

    setLoading(true);

    const selectedOption = statusOptions.find((option) => option.option === form.values.status);
    const statusKey = selectedOption ? selectedOption.key : form.values.status;

    const request: IReportRequest = {
      startDate: form.values.startDate ? dayjs(form.values.startDate).format("YYYY-MM-DD") : "",
      endDate: form.values.endDate ? dayjs(form.values.endDate).format("YYYY-MM-DD") : "",
      status: statusKey,
    };

    presenter?.downloadReport(request);
  };

  const handleClearFilters = () => {
    form.reset();
  };

  return (
    <Box mt={20}>
      <CustomTitle type="title1">{t("reports.title")}</CustomTitle>
      <Divider mt="lg" mb="xs" />

      <CustomTitle type="subtitle">{t("reports.subtitle")}</CustomTitle>
      <Box style={styles.containerBox} mt="lg">
        <Box style={styles.containerBoxTop}>
          <CustomTitle type="title2" mb={10}>
            {t("reports.headerBox.title")}
          </CustomTitle>
          <CustomTitle type="subtitle">{t("reports.headerBox.description")}</CustomTitle>
        </Box>
        <Divider />

        <Box style={styles.containerBoxBottom}>
          <Flex gap={16} align="center" mb={40} wrap="wrap">
            <Box style={{ flex: 1 }}>
              <CustomInputDate
                label={t("reports.filters.startDate")}
                {...form.getInputProps("startDate")}
                placeholder={t("reports.filters.startDatePlaceholder")}
                isMandatory={true}
              />
            </Box>
            <Box style={{ flex: 1 }}>
              <CustomInputDate
                label={t("reports.filters.endDate")}
                {...form.getInputProps("endDate")}
                placeholder={t("reports.filters.endDatePlaceholder")}
                isMandatory={true}
              />
            </Box>
            <Box style={{ flex: 1 }}>
              <CustomSelect
                label={t("reports.filters.status")}
                options={statusOptions}
                {...form.getInputProps("status")}
                placeholder={t("reports.filters.statusPlaceholder")}
                isMandatory={true}
              />
            </Box>
            <Box style={{ flex: 1, marginTop: "30px" }}>
              <CustomButton
                variant="light"
                onClick={handleClearFilters}
                disabled={loading}
                title={t("reports.actions.clearFilters")}
              />
            </Box>
          </Flex>

          <Flex gap={16} align="center">
            <CustomInput
              label={t("reports.actions.filename")}
              {...form.getInputProps("filename")}
              placeholder="reporte-solicitudes"
              isMandatory={true}
              fullWidth={false}
            />
            <CustomButtonWithIcon
              title={t("reports.actions.download")}
              size="md"
              variant="primary"
              onClick={handleDownload}
              disabled={
                !form.values.startDate ||
                !form.values.endDate ||
                loading ||
                !form.values.status ||
                !form.values.filename
              }
              icon={() => <IconDownload />}
              leftIcon={true}
              style={styles.button}
            />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Reports;
