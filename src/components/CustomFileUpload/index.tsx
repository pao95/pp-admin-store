import React, { useState, useRef } from "react";
import { Box, Text, Flex, Paper, Tooltip } from "@mantine/core";
import { IconUpload, IconFile, IconX, IconInfoCircle } from "@tabler/icons-react";
import { makeStyles } from "./styles";
import { translate } from "../../hooks/useTranslator";

export interface CustomFileUploadProps {
  label: string;
  file: File | null;
  setFile: (file: File | null) => void;
  accept?: string;
  maxSize?: number;
  isMandatory?: boolean;
  error?: string;
  mb?: string | number;
  tooltipText?: string;
}

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({
  label,
  file,
  setFile,
  accept = "application/pdf,image/png,image/jpeg",
  maxSize = 5,
  isMandatory = false,
  error,
  mb = "md",
  tooltipText,
}) => {
  const styles = makeStyles();
  const t = translate();
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFileError(null);

    // Validar tipo de archivo
    if (!accept.includes(selectedFile.type)) {
      setFileError(t("components.fileInput.invalidType"));
      return;
    }

    // Validar tamaño
    const fileSizeMB = selectedFile.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      setFileError(t("components.fileInput.sizeLimitMessage", { max: maxSize }));
      return;
    }

    setFile(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      handleFileSelect(droppedFiles[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      handleFileSelect(selectedFiles[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const renderLabel = () => {
    return (
      <Flex align="center" gap="xs">
        <Text style={styles.label}>
          {label}
          {isMandatory && <span style={{ color: "red" }}> *</span>}
        </Text>
        {tooltipText && (
          <Tooltip label={tooltipText} multiline w={300} mb={100}>
            <IconInfoCircle size={16} style={styles.labelWithTooltip} />
          </Tooltip>
        )}
      </Flex>
    );
  };

  return (
    <Box mb={mb}>
      {renderLabel()}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        style={{ display: "none" }}
      />

      {!file ? (
        <Paper
          style={
            isDragOver ? ({ ...styles.uploadArea, ...styles.uploadAreaDragOver } as any) : (styles.uploadArea as any)
          }
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <Flex direction="column" align="center" gap="sm">
            <IconUpload size={32} style={styles.uploadIcon} />
            <Text style={styles.uploadText}>{t("components.fileInput.dragDropText")}</Text>
            <Text style={styles.uploadSubtext}>{t("components.fileInput.clickToSelect")}</Text>
          </Flex>
        </Paper>
      ) : (
        <Paper style={styles.fileDisplay as any}>
          <Flex align="center" justify="space-between" w="100%">
            <Flex align="center" gap="sm">
              <IconFile size={20} style={styles.fileIcon} />
              <Box>
                <Text style={styles.fileName}>{file.name}</Text>
                <Text style={styles.fileSize}>{(file.size / (1024 * 1024)).toFixed(2)} MB</Text>
              </Box>
            </Flex>
            <IconX size={16} style={styles.removeIcon} onClick={handleRemoveFile} cursor="pointer" />
          </Flex>
        </Paper>
      )}

      {(error || fileError) && <Text style={styles.errorText}>{error || fileError}</Text>}
    </Box>
  );
};

export default CustomFileUpload;
