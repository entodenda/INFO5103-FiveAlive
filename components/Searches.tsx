import { Ingredient, DietTag } from "./Ingredient";
import { Nutrition } from "./Recipe";

//get enum name from tag
export function GetDietTagName(num: number): string {
  return DietTag[num];
}

//get list of enum names from list of tags
export function GetListDietTagNames(nums: number[]): string[] {
  return nums
    .map((num) => DietTag[num])
    .filter((name) => name !== undefined) as string[];
}

//put enum list into readable format
export function DisplayDietNames(dietTags: string[]): string[] {
  return dietTags.map((tag) => tag.replace(/([A-Z])/g, " $1").trim());
}

//if we don't want to use preset ingredient options this will match the user's input to ingredients
export function FindMatchingIngredients(name: string): Ingredient[] {
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
      if (ingred.name.toLowerCase().includes(name.toLowerCase())) {
        ingredients.push(
          new Ingredient(ingred.id, ingred.name, ingred.dietTag, nutrition)
        );
      }
    }
  );
  return ingredients;
}

// if we want preset ingredient options we can use something like autocomplete to display the ingredients
// in this case we would only need to grab the name and ids from the ingredient file
// then find the selected ingredient's id in the ingredient set to return all ingredient information
export function FindMatchingIngredIds(
  selectedIngredient: Ingredient
): Ingredient {
  let ingredient: Ingredient = {
    id: 0,
    name: "",
  };

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
      if (ingred.id === selectedIngredient.id) {
        ingredient = new Ingredient(
          ingred.id,
          ingred.name,
          ingred.dietTag,
          nutrition
        );
      }
    }
  );
  return ingredient;
}
