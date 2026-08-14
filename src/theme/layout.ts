// Spacing and radius tokens — the "how rounded" and "how much breathing room"
// values, kept consistent across every component the same way colors are.

export const radius = {
  card: 24,
  button: 16,
  pill: 999, // large enough that it always renders as a full pill
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;
