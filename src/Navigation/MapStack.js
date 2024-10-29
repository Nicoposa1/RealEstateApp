import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../Screens/HomeScreen';
import { MapScreen } from '../Screens/MapScreen';

const Stack = createNativeStackNavigator();

export const MapStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MapScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
};
