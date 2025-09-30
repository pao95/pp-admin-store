import { Button, ButtonProps, Loader } from "@mantine/core";

type Sizes = "xs" | "sm" | "md" | "lg" | "xl";

type Types = "button" | "submit" | "reset";

interface CustomButtonWithIconProps extends Partial<ButtonProps> {
  title: string;
  variant?: "primary" | "default" | "light" | "gradient" | "filled" | "outline" | "subtle";
  isFullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  size?: Sizes;
  mt?: Sizes;
  mb?: Sizes;
  type?: Types;
  icon?: React.ComponentType<{ size?: number; color?: string }>;
  leftIcon?: boolean;
  rightIcon?: boolean;
  isLoading?: boolean;
}

const CustomButtonWithIcon = ({
  title,
  variant = "default",
  disabled = false,
  onClick,
  isFullWidth = false,
  size = "md",
  mt,
  mb,
  type,
  icon: Icon,
  leftIcon,
  rightIcon,
  isLoading = false,
  ...rest
}: CustomButtonWithIconProps) => {
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
      leftSection={leftIcon && Icon && <Icon size={16} />}
      rightSection={!isLoading && rightIcon && Icon && <Icon size={16} />}
      {...rest}
    >
      {isLoading ? (
        <Loader
          // color={customColors.white}
          className="mx-4"
          size="sm"
        />
      ) : (
        title
      )}
    </Button>
  );
};

export default CustomButtonWithIcon;
