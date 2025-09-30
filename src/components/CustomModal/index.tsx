import { Box, Flex } from "@mantine/core";
import { ReactNode } from "react";
import IconButton from "../IconButton";
import { IconCircleX } from "@tabler/icons-react";
import { makeStyles } from "./styles";

interface ICustomModalProps {
  isVisible: boolean;
  children?: ReactNode;
  showCloseButton?: boolean;
  onCloseButton: () => void;
  image?: ReactNode;
  header?: ReactNode;
  buttonContainer?: ReactNode;
  logo?: ReactNode;
}

const CustomModal = ({
  isVisible,
  children,
  showCloseButton = true,
  onCloseButton,
  image,
  header,
  buttonContainer,
  logo,
}: ICustomModalProps) => {
  const styles = makeStyles();

  return (
    isVisible && (
      <div style={styles.mainModalContainer}>
        <Flex style={styles.modal}>
          <Box style={styles.content} p="xl">
            {showCloseButton && (
              <Flex style={styles.closeModalButton} p="sm">
                <IconButton
                  size={"md"}
                  icon={<IconCircleX />}
                  onClick={() => onCloseButton()}
                  variant={"transparent"}
                  color={"default"}
                />
              </Flex>
            )}
            <Flex direction="column" align="center">
              {image}
              {header}
              {buttonContainer}
            </Flex>
            {children}
            {logo}
          </Box>
        </Flex>
      </div>
    )
  );
};

export default CustomModal;
