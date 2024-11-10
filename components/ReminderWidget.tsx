import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Reminder, deleteAllReminders } from "@/components/ReminderFunctions";
import React, { useState } from "react";

interface ReminderWidgetProps {
    reminder: Reminder;
}

const ReminderWidget: React.FC<ReminderWidgetProps> = ({ reminder }) => {
    const [isActive, setIsActive] = useState(true);

    // Function to handle toggling the active/inactive status
    const toggleStatus = () => {
        setIsActive(!isActive);
    };

    const handleDeleteReminder = () => {
        deleteAllReminders();
    };

    return (
        <View style={styles.container}>
            <View style={styles.widgetRow}>
                <Text style={styles.reminderTitle}>{reminder.title}</Text>
                <TouchableOpacity
                    style={styles.widgetButton}
                    onPress={toggleStatus}
                >
                    <Text style={styles.activeText}>
                        {isActive ? "Active" : "Inactive"}
                    </Text>
                    <Image
                        source={
                            isActive
                                ? require("../assets/images/check.png")
                                : require("../assets/images/x.png")
                        }
                        style={styles.tinyLogo}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.widgetRow}>
                <Text>{reminder.date}</Text>
                <TouchableOpacity
                    style={styles.widgetButton}
                    onPress={handleDeleteReminder}
                >
                    <Text style={styles.deleteText}>Delete</Text>
                    <Image
                        source={require("../assets/images/bin.png")}
                        style={styles.tinyLogo}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#D9D9D9",
        borderRadius: 20,
        padding: 10,
        marginBottom: 15,
        elevation: 5, // Shadow
    },
    reminderTitle: {
        fontWeight: "bold",
        fontSize: 16,
    },
    widgetRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
        width: "100%",
    },
    deleteText: {
        fontSize: 16,
        color: "#FF4747",
    },
    activeText: {
        fontSize: 16,
        textDecorationLine: "underline",
    },
    widgetButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    tinyLogo: {
        width: 20,
        height: 20,
        marginLeft: 5,
    },
});

export default ReminderWidget;
