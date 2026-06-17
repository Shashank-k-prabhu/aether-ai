import { colors } from "./colors";
import { spacing, spacingScale } from "./spacing";
import { typography } from "./typography";
import { radius } from "./radius";

export const designSystem = {
  colors,
  spacing,
  spacingScale,
  typography,
  radius,
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.4)",
    DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px -1px rgba(0, 0, 0, 0.5)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -2px rgba(0, 0, 0, 0.6)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -4px rgba(0, 0, 0, 0.7)",
  },
} as const;

export type DesignSystem = typeof designSystem;
