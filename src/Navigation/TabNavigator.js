import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStack } from "./HomeStack";
import { MapStack } from "./MapStack";
import { ChatStack, FavoriteStack } from "./FavoriteStack";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AiSvg from "../assets/ai";
import { Colors } from "../Constants/Colors";

const Tab = createBottomTabNavigator();

const COLORS = {
  active: Colors.secondary,
  inactive: "black",
};

const ICON_SIZE = 24;

const tabBarStyles = {
  backgroundColor: "#fff",
  borderTopWidth: 0,
  shadowColor: "#000",
  shadowRadius: 10,
  elevation: 10,
};

function TabBarIcon({ name, focused }) {
  const color = focused ? COLORS.active : COLORS.inactive;

  if (name === "chat") {
    return <AiSvg name={name} fill={color} />;
  }

  return <FontAwesome name={name} size={ICON_SIZE} color={color} />;
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors.secondary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: tabBarStyles,
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Map") iconName = "map-marker";
          else if (route.name === "Heart") iconName = "heart";
          return <TabBarIcon name={iconName} focused={focused} />;
        },
        tabBarLabel: route.name,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Map" component={MapStack} />
      <Tab.Screen name="Heart" component={FavoriteStack} />
    </Tab.Navigator>
  );
}
