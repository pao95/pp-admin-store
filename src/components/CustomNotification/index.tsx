import { Box, Notification } from "@mantine/core";
import { makeStyles } from "./styles";

interface CustomNotificationProps {
  icon: React.ReactNode;
  color: string;
  title: string;
  text: string;
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

const CustomNotification = ({ icon, color, title, text, isVisible, setIsVisible }: CustomNotificationProps) => {
  const styles = makeStyles();
  return (
    <Box style={styles.notificationContainer}>
      {isVisible && (
        <Notification onClose={() => setIsVisible(false)} icon={icon} color={color} title={title}>
          {text}
        </Notification>
      )}
    </Box>
  );
};

export default CustomNotification;
