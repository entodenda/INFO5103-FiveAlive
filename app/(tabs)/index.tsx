import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    ScrollView,
    Image,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import ReminderWidget from "@/components/ReminderWidget";

export default function IndexScreen() {
    //TODO: Add Reminder funtion needs to be implemented here.
    // I'd imagine you'd want to have a list of reminder objects stored here that are loaded from local storage (Similar to pantry page)

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
                    <TouchableOpacity>
                        <Text style={styles.hyperText}>Add reminder</Text>
                    </TouchableOpacity>
                </View>
                <ReminderWidget></ReminderWidget>
                <ReminderWidget></ReminderWidget>
            </View>
            <View style={styles.content}>
                <View style={styles.contentHeader}>
                    <Text style={styles.title}>Top Recipes For This Week</Text>
                </View>
            </View>
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
});
