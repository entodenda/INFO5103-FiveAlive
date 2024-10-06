import { Recipe, Time, Serving, Ingredient, Nutrition } from "./Recipe";

export function RecipeImport(): Recipe[] {
  const recipes: Recipe[] = [];
  let recNum: number = 0;

  let recipefile = require("../assets/first100recipes.json");
  recipefile.forEach(
    (element: {
      //id: number;
      name: string;
      meta: {
        cook_time: string;
        bake_time: string;
        prep_time: string;
        total_time: string;
        servings: string;
        //yield: string;
      };
      ingredients: [{ name: string; quantity: number; unit: string }];
      nutrition_facts: {
        calories: string;
        carbs: string;
        fat: string;
        protein: string;
      };
      steps: string[];
      url: string;
      picture_url: string;
    }) => {
      ++recNum;

      let time: Time = new Time(
        element.meta.bake_time,
        element.meta.cook_time,
        element.meta.prep_time,
        element.meta.total_time
      );
      let servings: Serving = new Serving(
        element.meta.servings
        // element.meta.yield
      );
      let nutrition: Nutrition = new Nutrition(
        element.nutrition_facts.calories,
        element.nutrition_facts.carbs,
        element.nutrition_facts.fat,
        element.nutrition_facts.protein
      );
      let ingredients: Ingredient[] = [];
      let numIng: number = 0;
      //let ingjson: string[] = JSON.parse(element.ingredients);
      element.ingredients.forEach(
        (ing: { name: string; quantity: number; unit: string }) => {
          ++numIng;
          let ingredient: Ingredient = new Ingredient(
            numIng,
            ing.name,
            ing.quantity,
            ing.unit
          );
          ingredients.push(ingredient);
        }
      );
      recipes.push(
        new Recipe(
          recNum,
          element.name,
          time,
          servings,
          ingredients,
          nutrition,
          element.steps,
          element.url,
          element.picture_url
        )
      );
    }
  );

  return recipes;
}

export function AllRecipesToString(): string[] {
  const recipes: Recipe[] = RecipeImport();
  const recipeString: string[] = [];

  recipes.forEach(
    (recipe: {
      id: number;
      name: string;
      time: Time;
      serving: Serving;
      ingredients: Ingredient[];
      nutrition: Nutrition;
      instructions: string[];
      url: string;
      image: string | null;
    }) => {
      let ingstring: string[] = [];
      recipe.ingredients.forEach((ing: Ingredient) => {
        ingstring.push(
          "\n\t\t" +
            ing.id +
            ": \t" +
            ing.quantity +
            " " +
            ing.unit +
            " " +
            ing.name
        );
      });

      recipeString.push(
        "\n" +
          recipe.id.toString() +
          ": " +
          recipe.name +
          "\n" +
          "\n\tSource: " +
          recipe.url +
          "\n\tImage: " +
          recipe.image +
          "\n\tBake time: " +
          recipe.time.bakeTime +
          "\n\tCook time: " +
          recipe.time.cookTime +
          "\n\tPrep time: " +
          recipe.time.prepTime +
          "\n\tTotal time: " +
          recipe.time.totalTime +
          "\n\tServings: " +
          recipe.serving.servings +
          "\n\tNutritional Information: " +
          "\n\t\tCalories: " +
          recipe.nutrition.calories +
          "\n\t\tCarbs: " +
          recipe.nutrition.carbs +
          "\n\t\tFat: " +
          recipe.nutrition.fat +
          "\n\t\tProtein: " +
          recipe.nutrition.protein +
          //   "\n\tYield: " +
          //   recipe.serving.ryield +
          "\n\n\tIngredients: " +
          ingstring +
          "\n\n\tInstructions: \n" +
          recipe.instructions +
          "\n"
      );
    }
  );

  return recipeString;
}
