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
                name="recipes"
                options={{
                    title: "Recipes",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "book" : "book-outline"}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="pantry"
                options={{
                    title: "My Pantry",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "list" : "list-outline"}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
