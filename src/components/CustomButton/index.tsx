import { Button, ButtonProps } from "@mantine/core";

type Sizes = "xs" | "sm" | "md" | "lg" | "xl";

type Types = "button" | "submit" | "reset";

interface CustomButtonProps extends Partial<ButtonProps> {
  variant?: "primary" | "default" | "light" | "gradient" | "filled" | "outline";
  isFullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  size?: Sizes;
  mt?: Sizes;
  mb?: Sizes;
  type?: Types;
  title?: string;
}

const CustomButton = ({
  variant = "default",
  disabled = false,
  onClick,
  isFullWidth = false,
  size = "md",
  mt,
  mb,
  type,
  title,
  ...rest
}: CustomButtonProps) => {
  return (
    <Button
      fullWidth={isFullWidth}
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      size={size}
      mt={mt}
      mb={mb}
      type={type}
      radius="md"
      {...rest}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
