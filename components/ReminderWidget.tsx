import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Image,
    ScrollView,
} from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";

const ReminderWidget: React.FC = () => {
    //TODO: Functions for Deleting/setting inactive reminders should be added here.
    // Reminder widget should also * Take in a Reminder object * to then populate the title, dates, status, etc.

    return (
        <View style={styles.container}>
            <View style={styles.widgetRow}>
                <Text style={styles.reminderTitle}>Dinner time!</Text>
                <TouchableOpacity style={styles.widgetButton}>
                    <Text style={styles.activeText}>Active</Text>
                    <Image
                        source={require("../assets/images/check.png")}
                        style={styles.tinyLogo}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.widgetRow}>
                <Text>7pm Everyday</Text>
                <TouchableOpacity style={styles.widgetButton}>
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
        elevation: 5, //Shadow
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
