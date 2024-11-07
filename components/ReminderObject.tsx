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

  const ReminderObject: React.FC= () => {

    return (
        <View>
            <View>
                <Text>This is a new reminder</Text>
                <Button title={"Active"} style={styles.loadBtn}/>
            </View>
            <View>
                <Text>This is the reminders set time</Text>
                <Button title={"Delete"}/>
            </View>
            </View>
     );
};

const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.85)",
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      marginBottom: 10,
    },
    modalContainer: {
      width: Platform.OS === "web" ? "60%" : "95%",
      maxHeight: "90%",
      padding: 12,
      borderRadius: 20,
      elevation: 5,
      position: "relative",
      overflow: "hidden",
      backgroundColor: "rgba(0,0,0,1)",
    },
  
    backgroundImage: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      resizeMode: "cover",
      opacity: 0.5,
      borderRadius: 20,
    },
    recipeImage: {
      width: "100%",
      height: 200,
      borderRadius: 20,
      marginBottom: 10,
    },
    translucentBackground: {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      borderRadius: 20,
      padding: 15,
      maxHeight: "100%",
      overflow: "hidden",
    },
    closeButton: {
      alignSelf: "flex-end",
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: "bold",
      paddingRight: 10,
    },
    scrollViewContent: {
      width: "100%",
      paddingBottom: 20,
    },
    card: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 12,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
    },
    sectionText: {
      fontSize: 16,
      marginLeft: 10, // Indent for subtext
      marginTop: 2,
    },
    loadBtn: {
        padding: 10,
        backgroundColor: "#007BFF",
        borderRadius: 5,
        alignItems: "center",
        marginTop: 5,
        marginBottom: 40,
      },
  });

export default ReminderObject;