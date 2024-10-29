import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavoriteScreen } from '../Screens/FavoriteScreen';

const Stack = createNativeStackNavigator();

export const FavoriteStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={FavoriteScreen} />
    </Stack.Navigator>
  );
};
