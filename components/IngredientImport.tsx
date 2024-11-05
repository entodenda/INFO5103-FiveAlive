import { Ingredient, DietTag } from "./Ingredient";
import { Nutrition } from "./Recipe";

//to import all ingredients
export async function AllIngredientsImport(): Promise<Ingredient[]> {
  try {
    const ingredients: Ingredient[] = [];

    let ingredfile = require("../assets/ingredientsUpdated.json");
    ingredfile.forEach(
      (ingred: {
        id: number;
        name: string;
        dietTag: DietTag[];
        macros: Nutrition;
      }) => {
        let nutrition: Nutrition = new Nutrition(
          ingred.macros.calories,
          ingred.macros.carbs,
          ingred.macros.fat,
          ingred.macros.protein
        );
        ingredients.push(
          new Ingredient(ingred.id, ingred.name, ingred.dietTag, nutrition)
        );
      }
    );

    return ingredients;
  } catch (error) {
    console.error("Error loading ingredients:", error);
    return [];
  }
}

//to import just name and ids if we want this for ingredient autocomplete
export async function IngredientNamesImport(): Promise<Ingredient[]> {
  try {
    const ingredients: Ingredient[] = [];

    let ingredfile = require("../assets/ingredientsUpdated.json");
    ingredfile.forEach(
      (ingred: {
        id: number;
        name: string;
        dietTag?: DietTag[];
        macros?: Nutrition;
      }) => {
        ingredients.push(new Ingredient(ingred.id, ingred.name));
      }
    );

    return ingredients;
  } catch (error) {
    console.error("Error loading ingredients:", error);
    return [];
  }
}

//for testing
/*
export function AllIngredsToString(): string[] {
  const ingredients: Ingredient[] = IngredientImport();
  const ingredString: string[] = [];

  ingredients.forEach(
    (ingred: {
      id: number;
      name: string;
      dietTag: DietTag[];
      macros: Nutrition;
    }) => {
      ingredString.push(
        "\nID: " +
          ingred.id.toString() +
          "\nName: " +
          ingred.name +
          "\n" +
          "\n\tCalories: " +
          ingred.macros.calories +
          "\n\tCarbs: " +
          ingred.macros.carbs +
          "\n\tFat: " +
          ingred.macros.fat +
          "\n\tProtein: " +
          ingred.macros.protein +
          "\n\nDiet Tags: " +
          ingred.dietTag +
          "\n\n"
      );
    }
  );
  console.log(ingredString);
  return ingredString;
}
*/
