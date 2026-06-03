export const darkTheme = {
  colors: {
    // Primary
    primary: '#0066FF', // Electric Blue
    primaryDark: '#0052CC',
    primaryLight: '#3385FF',
    
    // Secondary
    secondary: '#00C853', // Vital Green
    secondaryDark: '#009E44',
    secondaryLight: '#33D87C',
    
    // Accent
    accent: '#FF6B35', // Sunrise Orange
    accentDark: '#E65A2E',
    accentLight: '#FF8C66',
    
    // Backgrounds
    background: '#121212', // Deep Space
    backgroundDark: '#0D0D0D',
    backgroundLight: '#1E1E1E',
    
    // Surfaces
    surface: '#1E1E1E', // Elevated Dark
    surfaceVariant: '#2A2A2A',
    surfaceBright: '#252525',
    
    // Text
    textPrimary: '#FFFFFF', // Pure White
    textSecondary: '#E0E0E0', // Light Gray
    textDisabled: '#8E8E93', // Medium Gray
    textOnPrimary: '#FFFFFF',
    textOnSecondary: '#FFFFFF',
    textOnAccent: '#FFFFFF',
    
    // Status
    success: '#00C853',
    warning: '#FFB300',
    error: '#CF6679',
    info: '#33B5E5',
    
    // Borders
    border: '#2A2A2A',
    borderLight: '#3A3A3A',
    
    // Inputs
    inputBackground: '#2A2A2A',
    inputText: '#FFFFFF',
    inputPlaceholder: '#8E8E93',
    
    // Glassmorphism
    glassBackground: 'rgba(30, 30, 30, 0.7)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    glassShadow: '0px 8px 32px rgba(0, 0, 0, 0.2)'
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32
  },
  
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    pill: 50
  },
  
  shadows: {
    sm: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    md: '0px 4px 16px rgba(0, 0, 0, 0.2)',
    lg: '0px 8px 32px rgba(0, 0, 0, 0.25)',
    xl: '0px 12px 48px rgba(0, 0, 0, 0.3)'
  },
  
  typography: {
    fontFamily: 'System',
    h1: { fontSize: 32, fontWeight: '700' as const },
    h2: { fontSize: 28, fontWeight: '600' as const },
    h3: { fontSize: 24, fontWeight: '600' as const },
    h4: { fontSize: 20, fontWeight: '600' as const },
    h5: { fontSize: 18, fontWeight: '500' as const },
    h6: { fontSize: 16, fontWeight: '500' as const },
    body1: { fontSize: 18, fontWeight: '400' as const },
    body2: { fontSize: 16, fontWeight: '400' as const },
    body3: { fontSize: 14, fontWeight: '400' as const },
    caption: { fontSize: 12, fontWeight: '400' as const },
    button: { fontSize: 16, fontWeight: '600' as const }
  }
};