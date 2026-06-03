import { View, StyleSheet, Platform } from 'react-native';
import { darkTheme } from '../../themes/darkTheme';

interface CardProps {
  children: React.ReactNode;
  padding?: number;
  marginBottom?: number;
  elevation?: number;
}

export const Card = ({ 
  children, 
  padding = darkTheme.spacing.md,
  marginBottom = 0,
  elevation = 0
}: CardProps) => {
  return (
    <View style={[
      styles.card,
      { 
        padding,
        marginBottom,
        ...(elevation > 0 && { 
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation
        })
      }
    ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: darkTheme.colors.glassBackground,
    borderRadius: darkTheme.borderRadius.lg,
    borderWidth: 1,
    borderColor: darkTheme.colors.glassBorder,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(10px)',
      },
      default: {}
    })
  }
});