import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Platform, ViewStyle } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const tabBarStyle: ViewStyle = {
    ...Platform.select({
      web: {
        position: "absolute",
        top: 0, // Ensure it sticks to top of page
        width: "100%", // Ensure it spans the width of the screen
        zIndex: 1000, // Ensure it appears on top
      },
      default: {
        // If android/ios then tabs stick to bottom
        position: "absolute",
        bottom: 0, // Ensure it sticks to the bottom of the page
        width: "100%",
        zIndex: 1000,
      },
    }),
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tabthree"
        options={{
          title: "Tab Three",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "construct" : "construct-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
