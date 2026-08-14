// Design tokens: the single source of truth for every color in the app.
// Screens and components should import from here, never hardcode a hex value.

export const palette = {
  cream: '#F2F1E7',
  paper: '#FBFAF4',
  forestGreen: '#141F17',
  cardGreen: '#1C2A20',
  leaf: '#7FA04D',
  leafBright: '#8FB65B',
  textLight: '#1E2A20',
  textDark: '#EDEDE2',
  textMuted: '#9AA593',
  starGold: '#E8B83A',
} as const;

// Verdant intentionally mixes light and dark screens by design, rather than
// switching based on the device's system setting. Each screen picks a theme
// explicitly (e.g. Home = light, Recipe Detail = dark).
export const lightTheme = {
  background: palette.cream,
  card: palette.paper,
  text: palette.textLight,
  textMuted: palette.textMuted,
  accent: palette.leaf,
  accentBright: palette.leafBright,
  starGold: palette.starGold,
  // A soft tint standing in for a food photo until real images exist.
  imagePlaceholder: 'rgba(127, 160, 77, 0.16)',
} as const;

export const darkTheme = {
  background: palette.forestGreen,
  card: palette.cardGreen,
  text: palette.textDark,
  textMuted: palette.textMuted,
  accent: palette.leaf,
  accentBright: palette.leafBright,
  starGold: palette.starGold,
  imagePlaceholder: 'rgba(143, 182, 91, 0.18)',
} as const;

// Mapped type: same keys as lightTheme, but each value widened to `string`
// instead of its exact literal — so darkTheme (different hex values, same
// shape) satisfies this type too.
export type Theme = { [Key in keyof typeof lightTheme]: string };
