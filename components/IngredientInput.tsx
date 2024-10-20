import React, { useState } from "react";
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
import { FindMatchingIngredients } from "./Searches";
import IngredientWidget from "./IngredientWidget";

// done - enter ingredient name
// done - search ingredient database based on name entered
// done - show matching ingredient widgets
// todo - on click, add selected ingredient - pull existing ingredient list, add this ing, return list, call on savePantryIngredients function
// todo - toast message for ingredient added

const IngredientInput = (props: {
  onAddItem: (ingredient: Ingredient) => void;
  visible: boolean;
  onCancel: (event: GestureResponderEvent) => void;
}) => {
  const [enteredIngredientName, setIngredientName] = useState<string>("");
  // const [selectedIngredientName, setIngredientSelectionName] = useState<string>("");
  // const [selectedIngredientId, setIngredientId] = useState<number>(0);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const IngredientNameHandler = (name: string) => {
    setIngredientName(name);
    setIngredients(FindMatchingIngredients(name));
  };
  // const IngredientIdHandler = (id: number) => {
  //   setIngredientId(id);
  // };
  // const addItemHandler = (ingredient: Ingredient) => {
  //   // ingredient = {

  //   //   id: this.id,
  //   //   name: this.name
  //   // };
  //   props.onAddItem(ingredient);
  //   setIngredientName("");
  // };

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
          {ingredients.map((ingredient) => (
            <>
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
            </>
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
    textAlign: "center",
  },
  addbutton: {
    alignItems: "flex-end",
    width: "5%",
    justifyContent: "center",
    paddingHorizontal: 3,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: "#1F51FF",
  },
  addButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "95%",
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
    marginBottom: 20,
  },
});

export default IngredientInput;
