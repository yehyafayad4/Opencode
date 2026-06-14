import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { darkTheme } from '../../../themes/darkTheme';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
}

export const PrimaryButton = ({ 
  title, 
  onPress, 
  disabled = false, 
  loading = false,
  icon
}: PrimaryButtonProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={loading || disabled ? undefined : onPress}
      disabled={loading || disabled}
      style={{
        backgroundColor: disabled || loading 
          ? darkTheme.colors.textDisabled 
          : darkTheme.colors.primary,
        paddingVertical: darkTheme.spacing.md,
        paddingHorizontal: darkTheme.spacing.lg,
        borderRadius: darkTheme.borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled || loading ? 0.7 : 1
      }}
    >
      {loading ? (
        <Text style={{ color: darkTheme.colors.textPrimary, fontSize: darkTheme.typography.button.fontSize }}>
          Loading...
        </Text>
      ) : (
        <>
          {icon && <Text style={{ marginRight: darkTheme.spacing.xs }}>{icon}</Text>}
          <Text 
            style={{ 
              color: darkTheme.colors.textOnPrimary, 
              fontSize: darkTheme.typography.button.fontSize,
              fontWeight: '600'
            }}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};