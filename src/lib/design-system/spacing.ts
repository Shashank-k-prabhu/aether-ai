export const spacing = {
  none: "0px",
  xs: "0.25rem",    // 4px
  sm: "0.5rem",     // 8px (Grid Unit)
  md: "0.75rem",    // 12px
  lg: "1rem",       // 16px (2x Grid Unit)
  xl: "1.25rem",    // 20px
  xxl: "1.5rem",    // 24px (3x Grid Unit)
  "2xl": "2rem",     // 32px (4x Grid Unit)
  "3xl": "2.5rem",   // 40px (5x Grid Unit)
  "4xl": "3rem",     // 48px (6x Grid Unit)
  "5xl": "4rem",     // 64px (8x Grid Unit)
  "6xl": "5rem",     // 80px
  "7xl": "6rem",     // 96px
} as const;

export const spacingScale = {
  base: 8, // 8px base unit
  step: (multiplier: number) => `${multiplier * 0.5}rem`,
};
