export type ThemeMode = 'light' | 'dark';

export const palette = {
  light: {
    background: '#F6F8FC',
    backgroundSoft: '#EEF3FA',
    surface: '#FFFFFF',
    surfaceLight: '#F8FBFF',
    elevated: '#FFFFFF',
    text: '#101827',
    muted: '#667085',
    border: 'rgba(16, 24, 39, 0.12)',
    primary: '#2457D6',
    primarySoft: 'rgba(36, 87, 214, 0.10)',
    accent: '#0E7490',
    accentSoft: 'rgba(14, 116, 144, 0.10)',
    white: '#FFFFFF',
    shadow: '0 24px 70px rgba(16, 24, 39, 0.10)'
  },
  dark: {
    background: '#0B1020',
    backgroundSoft: '#11182A',
    surface: '#141C2F',
    surfaceLight: '#1A2438',
    elevated: '#111A2E',
    text: '#F8FAFC',
    muted: '#A7B0C5',
    border: 'rgba(255,255,255,0.12)',
    primary: '#7AA2FF',
    primarySoft: 'rgba(122, 162, 255, 0.14)',
    accent: '#67E8F9',
    accentSoft: 'rgba(103, 232, 249, 0.12)',
    white: '#FFFFFF',
    shadow: '0 24px 70px rgba(0, 0, 0, 0.35)'
  }
} as const;

export const makeTheme = (mode: ThemeMode) => ({
  mode,
  colors: palette[mode],
  radius: {
    sm: '12px',
    md: '18px',
    lg: '28px',
    full: '999px'
  },
  layout: {
    maxWidth: '1180px'
  },
  motion: {
    fast: '180ms ease',
    medium: '320ms ease'
  }
});

export type AppTheme = ReturnType<typeof makeTheme>;
