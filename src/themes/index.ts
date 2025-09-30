import { createTheme, MantineThemeOverride, defaultVariantColorsResolver, VariantColorsResolver } from "@mantine/core";
import { customColors } from "./customColors";

const fontSizes = {
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "18px",
  xl: "20px",
  "2xl": "24px",
};

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);

  if (input.variant === "primary") {
    return {
      ...defaultResolvedColors,
      background: customColors.primary.primary700,
      hover: customColors.primary.primary800,
      color: "#FFFFFF",
      border: "none",
    };
  }

  if (input.variant === "subtle") {
    return {
      ...defaultResolvedColors,
      color: customColors.primary.primary700,
      hover: "none",
    };
  }
  if (input.variant === "outline") {
    return {
      ...defaultResolvedColors,
      background: "#FFFFFF",
      color: customColors.primary.primary700,
      border: `1px solid ${customColors.primary.primary700}`,
    };
  }

  if (input.variant === "light") {
    return {
      ...defaultResolvedColors,
      background: customColors.primary.primary100,
      color: customColors.primary.primary700,
      border: "none",
      fontSize: fontSizes.sm,
    };
  }

  return defaultResolvedColors;
};

export const customTheme: MantineThemeOverride = createTheme({
  fontFamily: "Inter, sans-serif",
  fontSizes: {
    ...fontSizes,
  },
  variantColorResolver,

  components: {
    Button: {
      styles: {
        root: {
          fontSize: fontSizes.sm,
        },
      },
    },

    Table: {
      styles: {
        table: {
          fontSize: fontSizes.sm,
          color: customColors.gray.gray500,
        },
        thead: {
          color: customColors.primary.primary900,
        },
        td: {
          borderInlineEnd: "inherit",
        },
        th: {
          borderInlineEnd: "inherit",
        },
        tr: {
          backgroundColor: "transparent",
        },
      },
    },
    Menu: {
      styles: {
        item: {
          color: customColors.gray.gray700,
          fontSize: fontSizes.sm,
        },
      },
    },
    Tabs: {
      styles: {
        tab: {
          color: customColors.gray.gray500,
          fontWeight: 500,
          backgroundColor: customColors.gray.gray200,
        },
      },
    },
    Input: {
      styles: {
        input: {
          overflow: "hidden",
        },
      },
    },
  },
});
