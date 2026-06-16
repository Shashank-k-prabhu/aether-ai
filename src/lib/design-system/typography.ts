export const typography = {
  fontFamily: {
    sans: "var(--font-geist-sans), Inter, sans-serif",
    mono: "var(--font-geist-mono), monospace",
  },
  fontSize: {
    xs: ["0.75rem", { lineHeight: "1rem" }],
    sm: ["0.875rem", { lineHeight: "1.25rem" }],
    base: ["1rem", { lineHeight: "1.5rem" }],
    lg: ["1.125rem", { lineHeight: "1.75rem" }],
    xl: ["1.25rem", { lineHeight: "1.875rem" }],
    "2xl": ["1.5rem", { lineHeight: "2.25rem" }],
    "3xl": ["1.875rem", { lineHeight: "2.5rem" }],
    "4xl": ["2.25rem", { lineHeight: "2.75rem" }],
    "5xl": ["3rem", { lineHeight: "1" }],
    "6xl": ["3.75rem", { lineHeight: "1" }],
    "7xl": ["4.5rem", { lineHeight: "1" }],
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },
} as const;
