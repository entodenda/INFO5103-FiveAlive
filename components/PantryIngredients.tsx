import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ingredient } from "./Ingredient";

// This function generate a json file from a list of pantry infredients
export const savePantryIngredients = async (ingredients: Ingredient[]) => {
  try {
    const jsonString = JSON.stringify(ingredients, null, 2);
    await AsyncStorage.setItem("pantryIngredients", jsonString);
    console.log("Ingredients saved successfully.");
  } catch (error) {
    console.error("Error saving ingredients:", error);
  }
};

// This function returns an object list of pantryIngredients from the json
export const loadPantryIngredients = async (): Promise<Ingredient[]> => {
  try {
    const jsonString = await AsyncStorage.getItem("pantryIngredients");
    if (!jsonString) return [];
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error loading ingredients:", error);
    return [];
  }
};
