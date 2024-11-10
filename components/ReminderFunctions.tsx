import AsyncStorage from "@react-native-async-storage/async-storage";

export class Reminder {
    title: string;
    date: string;

    public constructor(title: string, date: string) {
        this.title = title;
        this.date = date;
    }
}

export const saveReminder = async (reminder: Reminder[]) => {
    try {
        const jsonString = JSON.stringify(reminder);
        await AsyncStorage.setItem("reminders", jsonString);
        console.log("Reminder saved into local storage: 'reminders'");
    } catch (error) {
        console.error("Error Saving A Single Reminder: ", error);
    }
};

export const loadReminders = async () => {
    try {
        const jsonString = await AsyncStorage.getItem("reminders");
        if (!jsonString) return null;
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error loading Reminders: ", error);
        return null;
    }
};

export const deleteAllReminders = async () => {
    try {
        await AsyncStorage.removeItem("reminders");
        console.log("Reminders Deleted");
    } catch (error) {
        console.log("Unable to delete all reminders: ", error);
    }
};
