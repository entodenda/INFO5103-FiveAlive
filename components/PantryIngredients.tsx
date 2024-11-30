import AsyncStorage from "@react-native-async-storage/async-storage";
import { DietTag, Ingredient } from "./Ingredient";

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

export const deleteIngredient = async (ingr: Ingredient) => {
  try {
    const ingredients = await loadPantryIngredients();
    const removedIngredientList = ingredients.filter((i) => i.id !== ingr.id);
    await savePantryIngredients(removedIngredientList);
    //console.log(`Ingredient ${ingr.name} deleted`);
  } catch (error) {
    console.log(`Unable to delete ingredient ${ingr.name}: `, error);
  }
};

//recipe filter storage
export const saveFilters = async (dietTags: DietTag[]) => {
  try {
    // Save selected tags and selected sort label
    await AsyncStorage.setItem("selectedTags", JSON.stringify(dietTags));
  } catch (error) {
    console.error("Error saving filters:", error);
  }
};

export const loadFilters = async (): Promise<DietTag[]> => {
  try {
    const jsonString = await AsyncStorage.getItem("selectedTags");
    if (!jsonString) return [];
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error loading filters:", error);
    return [];
  }
};
