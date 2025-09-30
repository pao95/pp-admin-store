import { notifications } from "@mantine/notifications";
import { customColors } from "../themes/customColors";
const position = "top-center";
export const showErrorToast = (title = "", message = "", time = 3000) => {
  notifications.show({
    title,
    message,
    color: customColors.alerts.errorLight,
    position,
    autoClose: time,
  });
};

export const showSuccessToast = (title = "", message = "") => {
  notifications.show({
    title,
    message,
    color: customColors.alerts.successLight,
    position,
  });
};
