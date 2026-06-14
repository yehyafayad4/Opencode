import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './tabNavigator';

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};