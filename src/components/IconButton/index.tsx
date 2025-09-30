import { ActionIcon } from "@mantine/core";
import makeStyles from "./styles";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  variant: string;
  size: string | number;
  color: "primary" | "danger" | "default";
}

const IconButton = ({ icon, onClick, variant, size = "md", color = "default" }: IconButtonProps) => {
  const { iconButtonColor } = makeStyles(color);

  return (
    <ActionIcon onClick={onClick} variant={variant} size={size} color={iconButtonColor}>
      {icon}
    </ActionIcon>
  );
};

export default IconButton;
