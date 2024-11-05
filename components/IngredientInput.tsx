import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Modal,
  Text,
  GestureResponderEvent,
  ScrollView,
  Pressable,
} from "react-native";
import { Ingredient } from "@/components/Ingredient";
import { AllIngredientsImport } from "./IngredientImport";
import { FindMatchingIngredients } from "./Searches";
import IngredientWidget from "./IngredientWidget";
import { ListItem } from "react-native-elements";

// todo - reset search string on modal re-open

const IngredientInput = (props: {
  onAddItem: (ingredient: Ingredient) => void;
  visible: boolean;
  onCancel: (event: GestureResponderEvent) => void;
}) => {
  const [enteredIngredientName, setIngredientName] = useState<string>("");
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
  const [matchedIngredients, setMatchedIngredients] = useState<Ingredient[]>(
    []
  );

  // to ensure app functionality while loading
  useEffect(() => {
    const getIngredients = async () => {
      try {
        const ingredImport: Ingredient[] = await AllIngredientsImport();
        setAllIngredients(ingredImport);
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };
    getIngredients();
  }, []);

  // speeds up ingred search
  useEffect(() => {
    const delay = setTimeout(() => {
      if (enteredIngredientName) {
        setMatchedIngredients(
          FindMatchingIngredients(enteredIngredientName, allIngredients)
        );
      } else {
        setMatchedIngredients([]);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [enteredIngredientName, allIngredients]);

  const IngredientNameHandler = (name: string) => {
    setIngredientName(name);
    //setMatchedIngredients(FindMatchingIngredients(name, allIngredients));
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.head}>~ Add Ingredients ~</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={props.onCancel}>
            <Text style={styles.cancelText}>Return to Pantry</Text>
          </Pressable>
        </View>
        <TextInput
          placeholder="Ingredient Name"
          style={styles.input}
          onChangeText={IngredientNameHandler}
          value={enteredIngredientName}
        />

        <ScrollView>
          {matchedIngredients.map((ingredient) => (
            <ListItem key={ingredient.id}>
              <View style={styles.widgetContainer}>
                <IngredientWidget key={ingredient.id} ingredient={ingredient} />
                <View style={styles.addButtonContainer}>
                  <Pressable
                    style={styles.addbutton}
                    onPress={props.onAddItem.bind(this, ingredient)}
                  >
                    <Text style={styles.addtext}>+</Text>
                  </Pressable>
                </View>
              </View>
            </ListItem>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "95%",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#D9D9D9",
    padding: 3,
    borderRadius: 20,
    textAlign: "center",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "Black",
    textAlign: "center",
  },
  addtext: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  addbutton: {
    alignItems: "flex-end",
    width: 30,
    height: 30,
    justifyContent: "center",
    paddingHorizontal: 9,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: "#1F51FF",
  },
  addButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: -50,
  },
  head: {
    marginTop: 30,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  widgetContainer: {
    marginBottom: 10,
    paddingBottom: 10,
  },
});

export default IngredientInput;
