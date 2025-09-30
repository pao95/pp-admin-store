import { Button, FileButton, FileInput, Flex, Title, Text } from "@mantine/core";
import { useRef, useState } from "react";
import { IconFileUpload, IconX } from "@tabler/icons-react";
import { makeStyles } from "./styles";
import { translate } from "../../hooks/useTranslator";

interface CustomFileButtonProps {
  label: string;
  file: File[] | null;
  setFile: (file: File[] | null) => void;
  maxMBSize?: number;
  isPDF?: boolean;
}

const CustomFileButton = ({ label, file, setFile, maxMBSize = 5, isPDF = false }: CustomFileButtonProps) => {
  const styles = makeStyles();
  const resetRef = useRef<() => void>(null);
  const t = translate();
  const [hasExceededFileSize, setHasExceededFileSize] = useState(false);
  const MEGABYTE_SIZE = 1024 * 1024;

  const clearFile = () => {
    setFile(null);
    setHasExceededFileSize(false);
    resetRef.current?.();
  };

  const blobSizeToMB = (size: number) => size / MEGABYTE_SIZE;

  const handleOnChange = (newFiles: File[] | null) => {
    if (!newFiles) return;

    if (newFiles.some((newFile) => blobSizeToMB(newFile.size) > maxMBSize)) {
      clearFile();
      setHasExceededFileSize(true);
    } else {
      setFile(newFiles);
      setHasExceededFileSize(false);
    }
  };

  const acceptedFileTypes = isPDF ? "application/pdf,image/png,image/jpeg" : "image/png,image/jpeg";

  return (
    <Flex flex="1" direction="column" gap="sm">
      <Title style={styles.label} mt="md" mb="sm">
        {label}
      </Title>
      <Flex align="center" gap="md" wrap={"wrap"}>
        <FileButton resetRef={resetRef} onChange={handleOnChange} accept={acceptedFileTypes} multiple>
          {(props) => (
            <Button
              leftSection={<IconFileUpload size={14} />}
              variant="outline"
              {...props}
              size="md"
              style={styles.button}
            >
              {t("newLoan.step_six.chooseFile")}
            </Button>
          )}
        </FileButton>

        <FileInput
          flex={1}
          readOnly
          rightSection={
            file !== null && <IconX onClick={clearFile} size={16} cursor="pointer" style={styles.clearIcon} />
          }
          size="md"
          value={file?.[0] || null}
          accept={acceptedFileTypes}
          style={styles.fileInput}
        />
      </Flex>
      {hasExceededFileSize && <Text style={styles.errorMessage}>{t("components.fileInput.sizeLimit")}</Text>}
    </Flex>
  );
};

export default CustomFileButton;
