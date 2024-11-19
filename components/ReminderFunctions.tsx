import AsyncStorage from "@react-native-async-storage/async-storage";

export class Reminder {
  title: string;
  date: string;

  public constructor(title: string, date: string) {
    this.title = title;
    this.date = date;
  }
}

export const saveReminder = async (reminders: Reminder[]) => {
  try {
    const jsonString = JSON.stringify(reminders, null, 2);
    await AsyncStorage.setItem("reminders", jsonString);
    console.log("Reminder saved: 'reminders'");
  } catch (error) {
    console.error("Error Saving A Single Reminder: ", error);
  }
};

export const loadReminders = async (): Promise<Reminder[]> => {
  try {
    const jsonString = await AsyncStorage.getItem("reminders");
    if (!jsonString) return [];
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error loading Reminders: ", error);
    return [];
  }
};

export const deleteReminder = async (reminder: Reminder) => {
  try {
    const reminders = await loadReminders();
    const removedReminderList = reminders.filter(
      (r) => r.title !== reminder.title || r.date !== reminder.date
    );
    await saveReminder(removedReminderList);
    console.log(`Reminder ${reminder.title} deleted`);
  } catch (error) {
    console.log(`Unable to delete reminder ${reminder.title}: `, error);
  }
};
