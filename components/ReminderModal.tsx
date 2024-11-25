import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Modal,
  Text,
  Platform,
  Pressable,
  Image,
} from "react-native";
import { Reminder } from "@/components/ReminderFunctions";
import DateTimePicker from "@react-native-community/datetimepicker";

type AndroidMode = any;

const ReminderModal = (props: {
  onAddItem: (reminder: Reminder) => void;
  visible: boolean;
  onCancel: () => void;
}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<AndroidMode>("date");
  const [show, setShow] = useState<boolean>(false);
  const [titleInput, setTitleInput] = useState<string>("");

  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios" ? true : false);
    setDate(currentDate);
  };

  const showMode = (currentMode: "date" | "time") => {
    setShow(true);
    setMode(currentMode);
  };
  const handleOnClick = () => {
    const reminder = new Reminder(
      titleInput,
      date.toLocaleDateString() + " " + date.toLocaleTimeString()
    );
    props.onAddItem(reminder);
    props.onCancel();
    setTitleInput(""); // Clear input fields
    setDate(new Date());
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.contentHeader}>
        <Text style={styles.title}>Add New Reminder</Text>
        <Pressable onPress={props.onCancel}>
          <Text style={styles.hyperText}>Cancel</Text>
        </Pressable>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          value={titleInput}
          onChangeText={(value) => setTitleInput(value)}
        />
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </Text>
          <View style={styles.iconContainer}>
            <Pressable onPress={() => showMode("date")}>
              <Image
                source={require("@/assets/images/calendar.png")}
                style={styles.icon}
              />
            </Pressable>
            <Pressable onPress={() => showMode("time")}>
              <Image
                source={require("@/assets/images/clock.png")}
                style={styles.icon}
              />
            </Pressable>
          </View>
        </View>

        {show && (
          <DateTimePicker
            value={date}
            mode={mode} // No idea why this is throwing an error, it works
            display="default"
            onChange={onChange}
          />
        )}

        <Pressable style={styles.addButton} onPress={handleOnClick}>
          <Text style={styles.addButtonText}>Add Reminder</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  hyperText: {
    color: "#007BFF",
    fontSize: 16,
  },
  content: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
  },
  inputText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ReminderModal;
