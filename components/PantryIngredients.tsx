import AsyncStorage from "@react-native-async-storage/async-storage";
import { Nutrition } from "./Recipe";

// For now created a different class for ingredients in the pantry to decide whether we want to have
// two classes or change the json ingredents objects
export class PantryIngredient {
  name: string;
  tags: Number[];
  macros: Nutrition;

  public constructor(name: string, tags: Number[], macros: Nutrition) {
    this.name = name;
    this.tags = tags;
    this.macros = macros;
  }
}

// This function generate a json file from a list of pantry infredients
export const savePantryIngredients = async (ingredients: PantryIngredient[]) => {
	try {
	  const jsonString = JSON.stringify(ingredients, null, 2); 
	  await AsyncStorage.setItem('pantryIngredients', jsonString);
	  console.log('Ingredients saved successfully.');
	} catch (error) {
	  console.error('Error saving ingredients:', error);
	}
};

// This function returns an object list of pantryIngredients from the json
export const loadPantryIngredients = async (): Promise<PantryIngredient[] | null> => {
	try {
	  const jsonString = await AsyncStorage.getItem('pantryIngredients');
	  if (!jsonString) return null; 
	  return JSON.parse(jsonString); 
	} catch (error) {
	  console.error('Error loading ingredients:', error);
	  return null;
	}
  };