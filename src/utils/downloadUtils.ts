import i18next from "i18next";

export interface DownloadFileOptions {
  url: string;
  filename: string;
}

export interface DownloadBlobOptions {
  blob: Blob;
  filename: string;
}

export interface DownloadBlobResult {
  success: boolean;
  error?: string;
}

export const downloadFile = (options: DownloadFileOptions): void => {
  const { url, filename } = options;

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadBlob = (options: DownloadBlobOptions): DownloadBlobResult => {
  try {
    const { blob, filename } = options;

    // Validar que el blob exista
    if (!blob) {
      return {
        success: false,
        error: i18next.t("storeRegister.errors.download_document_error"),
      };
    }
    // Validar que el blob sea una instancia de Blob
    if (!(blob instanceof Blob)) {
      return {
        success: false,
        error: i18next.t("storeRegister.errors.download_document_error"),
      };
    }
    const url = window.URL.createObjectURL(blob);

    // Crear elemento link
    const link = document.createElement("a");

    // Configurar link
    link.href = url;
    link.download = filename;

    // Agregar al DOM y hacer click
    document.body.appendChild(link);

    link.click();

    // Limpiar
    document.body.removeChild(link);

    // Limpiar el objeto URL para liberar memoria
    window.URL.revokeObjectURL(url);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : i18next.t("storeRegister.errors.download_document_error"),
    };
  }
};
