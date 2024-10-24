import { Ingredient, DietTag } from "./Ingredient";
import { Nutrition , Recipe } from "./Recipe";

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
 

// Recipes Search Functions 

// This Function retrun list of recipes that have the same name as the search string
export function FindMatchingRecipeByName(name:string): Recipe[]
{
  const recipesFile: Recipe[] = require("../assets/recipesUpdated.json");

  return recipesFile.filter((recipe) =>
    recipe.name.toLowerCase().includes(name.toLowerCase())
  );
}


// This function returns list of recipes based on the diet tags and ingredient list
export function FindMatchingRecipe(
  excludedDietTags: number[],
  ingredientIds: number[]
) : Recipe[]
{
  const recipesFile: Recipe[] = require("../assets/recipesUpdated.json"); 

  // getting all the recipes that does not have dietry tags
  const filteredRecipes = recipesFile.filter((recipe) =>
    recipe.dietTag.every((tag) => !excludedDietTags.includes(tag))
  );

  // getting all the recipes based on the ingredients passed on to the function 
  const sortedRecipes = filteredRecipes
  .map((recipe) => ({
    recipe,
    matchCount: recipe.ingredTag.filter((id) =>
      ingredientIds.includes(id)
    ).length,
  }))
  .filter(({ matchCount }) => matchCount > 0) 
  .sort((a, b) => b.matchCount - a.matchCount) 
  .map(({ recipe }) => recipe); 


  return sortedRecipes;
}
