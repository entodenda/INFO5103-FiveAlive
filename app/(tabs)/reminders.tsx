import {
    StyleSheet,
    Platform,
    View,
    Button,
    Text,
    FlatList,
    TextInput,
  } from "react-native";
  import React, { useEffect, useState, useRef } from "react";
  import {Reminder, saveReminder, loadReminders, deleteAllReminders } from "@/components/ReminderFunctions";


const ReminderScreen: React.FC = () => {
  //scrolls back to beginning when user moves to another page or sorts/filters !---------------------! Might not need !---------------------!
    const listRef = useRef<FlatList>(null);

    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [reminderTitle, setReminderTitle] = useState("");
    const [reminderDate, setReminderDate] = useState("");
    useEffect(() => {
      //load any current reminders
          getReminders();
      }, []);

      const getReminders = async () => {
        try {
          const reminderImport:[] = await loadReminders();
          setReminders(reminderImport);
        } catch (error) {
          console.error("Error fetching Reminders", error);
        }
      };

      const addNewReminder = async () => {
        //Create new object
        let reminderToAdd = {} as Reminder;
        reminderToAdd.title = reminderTitle;
        reminderToAdd.date = reminderDate;
        let test = [reminderToAdd]; 

        //Add to local storage
          try{
            if(reminders !== null){
              reminders.push(reminderToAdd);
            }
            else{
              setReminders(test);
            }

            await saveReminder(reminders);
          }catch(error){console.log("Error: ", error);}

        //Clear Forms
        setReminderTitle("");
        setReminderDate("");
      };

      //!--------------------------------------------- Debugging functions --------------------------------------------
      //For debugging. 
      const DeleteAllReminders = async () => {
        await deleteAllReminders();
        await getReminders();
      }
      //For debugging. 
      const Reload = async () => {
        const reminderImport: Reminder[] | null = await loadReminders();
        console.log("SavedData: " ,reminderImport);
        console.log("useStateData: " , reminders);
      };
      //--------------------------------------------- End Of Debugging functions --------------------------------------------!
    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <Text>Reminder Page</Text>
            <Button title="Add New Reminder" onPress={addNewReminder}/>
            <Text>Title:</Text>
            <TextInput  onChangeText={setReminderTitle} value={reminderTitle}/>
            <Text>Date:</Text>
            <TextInput onChangeText={setReminderDate} value={reminderDate}/>
            <Button title="Delete All Reminders" onPress={DeleteAllReminders}/>
            <Button title="Reload Reminders" onPress={Reload}/>
            </View>
                {
                    //Intentional empty space
                }
            <View style={styles.container}>
                <View style={styles.recipeItem}>

                </View>
            </View>
         </View>
     );
};
/*
                <FlatList
                ref={listRef}
                data={reminders}
                renderItem={Item}
                keyExtractor={(item) => item.date}
                contentContainerStyle={styles.recipeList}
                />
*/

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F0F0F0",
      padding: 10,
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
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "black",
    },
    header: {
      paddingTop: 50,
      marginBottom: 20,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
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
    recipeList: {
      paddingBottom: 20,
    },
    filtersContainer: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      backgroundColor: "#fff",
      borderRadius: 10,
      marginBottom: 20,
    },
    tag: {
      fontSize: 16,
      marginVertical: 5,
      color: "black",
    },
    selectedTag: {
      fontSize: 16,
      marginVertical: 5,
      color: "blue",
    },
    sortContainer: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      backgroundColor: "#fff",
      borderRadius: 10,
      marginBottom: 20,
    },
    sortOptionsContainer: {
      paddingBottom: 20,
    },
  
    sortOption: {
      fontSize: 16,
      marginVertical: 5,
      color: "black",
    },
    selectedSortOption: {
      color: "blue",
      fontWeight: "bold",
    },
    scroll: {
      height: 158,
    },
    loadBtn: {
      padding: 10,
      backgroundColor: "#007BFF",
      borderRadius: 5,
      alignItems: "center",
      marginTop: 5,
      marginBottom: 40,
    },
    loadRecipes: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    paginationContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
  });

export default ReminderScreen;