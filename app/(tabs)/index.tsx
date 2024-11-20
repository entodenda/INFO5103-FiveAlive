import React, { useState, useEffect,useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import InfoModal, { GetTip } from "@/components/InfoModal";
import ReminderWidget from "@/components/ReminderWidget";
import ReminderModal from "@/components/ReminderModal";
import RecipeModal from "@/components/RecipeModal";
import {
  Reminder,
  saveReminder,
  loadReminders,
  deleteReminder,
} from "@/components/ReminderFunctions";
import { ContactFormModal } from "@/components/ContactFormModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import {GetWeeklyRecipe } from "@/components/RecipeImport";
import { Recipe } from "@/components/Recipe";
import { ThemedText } from "@/components/ThemedText";
import { StarRatingDisplay } from "react-native-star-rating-widget";

export default function IndexScreen() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [remindersDisplay, setRemindersDisplay] = useState<Reminder[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [addMode, setIsAddMode] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [contactModalVisible, setContactModalVisible] =
    useState<boolean>(false);

  const thistext = GetTip();

  useEffect(() => {
    loadSavedReminders();
    getRecipe();
  }, []);
  useEffect(() => {
    setRemindersDisplay(reminders);
  }, [reminders]);

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

  const handleRecipePress = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
};

const getRecipe = async () => {
  const tempRecipe = await GetWeeklyRecipe();
  setSelectedRecipe(tempRecipe);
};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
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
          <Text style={styles.title}>Top Recipe For This Week</Text>
          </View>
          </View>
          <TouchableOpacity
        onPress={() => handleRecipePress(selectedRecipe!)}
        style={styles.recipeItem}
    >
        {selectedRecipe?.image && (
            <Image
                source={{ uri: selectedRecipe?.image }}
                style={styles.recipeImage}
            />
        )}
        <ThemedText style={styles.recipeTitle}>{selectedRecipe?.name}</ThemedText>
        <View style={styles.recipeItemRow}>
            <StarRatingDisplay
                rating={parseFloat(selectedRecipe!?.rating)}
                color="#f7931e"
                starSize={20}
            />
            <ThemedText style={styles.recipeTitle}>
                {selectedRecipe?.rating}
            </ThemedText>
        </View>
    </TouchableOpacity>

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

      <RecipeModal
                visible={modalVisible}
                recipe={selectedRecipe}
                onClose={() => setModalVisible(false)}
            />

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
  recipeItem: {
    width: Platform.OS === "web" ? "50%" : "100%",
    alignSelf: "center",
    margin: 10,
    padding: 8,
    borderRadius: 25,
    backgroundColor: "#343434",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
},
recipeImage: {
    width: "100%",
    height: Platform.OS === "web" ? 100 : 200,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginBottom: 10,
},
recipeTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "300",
    marginBottom: 10,
    marginLeft: 5,
},
recipeItemRow: { flexDirection: "row" },
recipeList: {
  paddingBottom: 20,
},
});
