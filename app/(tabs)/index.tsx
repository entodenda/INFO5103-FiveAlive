import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  Pressable,
} from "react-native";
import TipModal, { GetTip } from "@/components/TipModal";
import ReminderWidget from "@/components/ReminderWidget";
import ReminderModal from "@/components/ReminderModal";
import {
  Reminder,
  saveReminder,
  loadReminders,
  deleteReminder,
} from "@/components/ReminderFunctions";
import { ContactFormModal } from "@/components/ContactFormModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import TipToggleComponent, {
  CheckToggle,
} from "@/components/TipToggleComponent";

export default function IndexScreen() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [remindersDisplay, setRemindersDisplay] = useState<Reminder[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addMode, setIsAddMode] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [contactModalVisible, setContactModalVisible] =
    useState<boolean>(false);

  const thistext = GetTip();

  useEffect(() => {
    loadSavedReminders();
  }, []);
  useEffect(() => {
    setRemindersDisplay(reminders);
  }, [reminders]);

  useEffect(() => {
    const initializeModalState = async () => {
      const initialModalState = await CheckToggle();
      setIsModalVisible(initialModalState);
    };
    initializeModalState();
  }, []);

  const handleAddClick = () => {
    setIsAddMode(true);
  };
  const handleAddReminder = async (reminder: Reminder) => {
    const reminderList = [...reminders, reminder];
    setReminders((reminders) => [...reminders, reminder]);
    await saveReminder(reminderList);
  };

  // load ingredients from saved pantry list
  const loadSavedReminders = () => {
    const myPromise = loadReminders();
    myPromise
      .then((value) => {
        if (value) {
          setReminders(value);
          setRemindersDisplay(value);
        }
      })
      .catch((error) => {
        console.error(
          "loadSavedReminders Promise rejected with error: " + error
        );
      });
  };

  const handleDeleteReminder = async (reminder: Reminder) => {
    await deleteReminder(reminder);
    loadSavedReminders();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <TipToggleComponent />
          </View>
          <View style={styles.titleAndLogo}>
            <Image
              style={styles.logo}
              source={require("../../assets/images/chef.png")}
            />
            <Text style={styles.title}>Recipe Rhapsody</Text>
          </View>
          <View style={styles.tooltipContainer}>
            <Pressable
              onPress={() => setContactModalVisible(true)}
              onLongPress={() => setIsHovered(true)}
              onPressOut={() => setIsHovered(false)}
            >
              <Ionicons name="mail" size={24} color="black" />
            </Pressable>
            {isHovered && (
              <View style={styles.tooltip}>
                <Text style={styles.tooltipText}>Contact Us</Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <ContactFormModal
        visible={contactModalVisible}
        onClose={() => setContactModalVisible(false)}
      ></ContactFormModal>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.title}>Reminders</Text>
          <Pressable onPress={handleAddClick}>
            <Text style={styles.hyperText}>Add reminder</Text>
          </Pressable>
        </View>
        <ReminderModal
          visible={addMode}
          onCancel={() => setIsAddMode(false)}
          onAddItem={handleAddReminder}
        />
        <ScrollView>
          {remindersDisplay.map((r) => (
            <ReminderWidget
              key={r.title}
              reminder={r}
              onDelete={() => handleDeleteReminder(r)}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.title}>Top Recipes For This Week</Text>
        </View>
      </View>
      <TipModal
        visible={isModalVisible}
        text={GetTip()}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 20,
  },
  header: {
    paddingTop: "10%",
  },
  content: {
    marginVertical: "5%",
  },
  contentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  hyperText: {
    fontSize: 16,
    color: "#3374FF",
    textDecorationLine: "underline",
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  closeButton: {
    backgroundColor: "#000",
    borderRadius: 50,
    color: "#fff",
    width: "40%",
    textAlign: "center",
    padding: 10,
  },
  modalView: {
    margin: "auto",
    width: "80%",
    minHeight: 100,
    backgroundColor: "#F00",
    borderRadius: 50,
    paddingTop: 10,
    paddingLeft: 20,
    justifyContent: "center",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleAndLogo: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  tooltip: {
    position: "absolute",
    top: -30, // Move above the icon
    right: 0, // Align to the right
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
  tooltipContainer: {
    position: "relative",
  },
});
