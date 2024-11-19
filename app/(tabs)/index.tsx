import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import InfoModal, { GetTip } from "@/components/InfoModal";
import ReminderWidget from "@/components/ReminderWidget";
import ReminderModal from "@/components/ReminderModal";
import {
  Reminder,
  saveReminder,
  loadReminders,
} from "@/components/ReminderFunctions";

export default function IndexScreen() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [remindersDisplay, setRemindersDisplay] = useState<Reminder[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [addMode, setIsAddMode] = useState<boolean>(false);

  const text =
    "hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!";
  const thistext = GetTip();

  useEffect(() => {
    let test = loadReminders();
    console.log(test);
  }, []);
  useEffect(() => {
    setRemindersDisplay(reminders);
  }, [reminders]);

  const handleAddClick = () => {
    setIsAddMode(true);
  };
  const handleAddReminder = (reminder: Reminder) => {
    setReminders((reminders) => [...reminders, reminder]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/chef.png")}
        />
        <Text style={styles.title}>Recipe Rhapsody</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.title}>Reminders</Text>
          <TouchableOpacity onPress={handleAddClick}>
            <Text style={styles.hyperText}>Add reminder</Text>
          </TouchableOpacity>
        </View>
        <ReminderModal
          visible={addMode}
          onCancel={() => setIsAddMode(false)}
          onAddItem={handleAddReminder}
        />
        <ScrollView>
          {remindersDisplay.map((reminder) => (
            <ReminderWidget key={reminder.title} reminder={reminder} />
          ))}
        </ScrollView>
      </View>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.title}>Top Recipes For This Week</Text>
        </View>
      </View>
      <InfoModal
        visible={isModalVisible}
        text={thistext}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
});
