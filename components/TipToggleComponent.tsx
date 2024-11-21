import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export async function SaveToggle(checkboxStatus: boolean): Promise<void> {
  try {
    await AsyncStorage.setItem("toggleState", JSON.stringify(checkboxStatus));
    showToggleToast();
    console.log("Toggle state saved:", checkboxStatus);
  } catch (error) {
    console.error("Error saving toggle state:", error);
  }
}

export async function CheckToggle(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem("toggleState");
    return value !== null ? JSON.parse(value) : true;
  } catch (error) {
    console.error("Error loading toggle state:", error);
    return true;
  }
}

export const showToggleToast = async () => {
  const isToggled = await CheckToggle();
  const toastMessage = isToggled ? "Tips turned on" : "Tips turned off";
  Toast.show({
    type: "info",
    text1: toastMessage,
    position: 'bottom',
    visibilityTime: 1200,
  });
};

export default function TipToggleComponent() {
  const [isToggled, setToggle] = useState(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      try {
        const savedState = await CheckToggle();
        setToggle(savedState);
      } catch (error) {
        console.error("Error loading saved toggle state:", error);
      }
    })();
  }, []);

  const handleToggle = async () => {
    const newToggleState = !isToggled;
    setToggle(newToggleState);
    try {
      await SaveToggle(newToggleState);
    } catch (error) {
      console.error("Error saving new toggle state:", error);
    }
  };

  return (
    <View>
      <Pressable
        onPress={handleToggle}
        onLongPress={() => setIsHovered(true)}
        onPressOut={() => setIsHovered(false)}
      >
        <MaterialCommunityIcons
          name={isToggled ? "information" : "information-off-outline"}
          size={24}
          color="black"
        />
      </Pressable>
      {isHovered && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>Show Tip at Startup</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tooltip: {
    position: "absolute",
    top: -30,
    left: 0,
    backgroundColor: "#333",
    padding: 8,
    borderRadius: 5,
    zIndex: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    minWidth: 80,
  },
  tooltipText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
});
