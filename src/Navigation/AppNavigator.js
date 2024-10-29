import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HomeStack } from './HomeStack';
import TabNavigator from './TabNavigator';

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
