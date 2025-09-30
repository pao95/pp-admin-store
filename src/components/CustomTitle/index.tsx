import React from "react";
import { getTitleStyles } from "./styles";
import { Title, TitleProps as MantineTitleProps } from "@mantine/core";

interface CustomTitleProps extends MantineTitleProps {
  type: "title1" | "title2" | "subtitle";
  children: React.ReactNode;
  className?: string;
}

const CustomTitle: React.FC<CustomTitleProps> = ({ type, children, className, ...props }) => {
  const styles = getTitleStyles(type);
  return (
    <Title style={styles} className={className} {...props}>
      {children}
    </Title>
  );
};

export default CustomTitle;
