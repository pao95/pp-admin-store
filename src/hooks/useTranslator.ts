import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const translate = () => {
  const { t } = useTranslation();
  const translate = useCallback(
    (textToTranslate: string, options?: Record<string, any>) => {
      return t(textToTranslate, options).toString();
    },
    [t]
  );
  return translate;
};
