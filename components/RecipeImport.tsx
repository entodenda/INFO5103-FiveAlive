import { Recipe, Time, Serving, RecipeIngredient, Nutrition } from "./Recipe";
import { DietTag } from "./Ingredient";

export async function RecipeImport(): Promise<Recipe[]> {
  const recipes: Recipe[] = [];
  let recNum: number = 0;

  const recipefile = require("../assets/recipesUpdated.json");
  recipefile.forEach(
    (element: {
      id: number;
      name: string;
      rating: string;
      meta: {
        cook_time: number;
        bake_time: number;
        prep_time: number;
        total_time: number;
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
      ingredTag: number[];
      dietTag: DietTag[];
    }) => {
      ++recNum;

      let time: Time = new Time(
        element.meta.bake_time,
        element.meta.cook_time,
        element.meta.prep_time,
        element.meta.total_time
      );
      let servings: Serving = new Serving(
        +element.meta.servings
        // element.meta.yield
      );
      let nutrition: Nutrition = new Nutrition(
        element.nutrition_facts.calories,
        element.nutrition_facts.carbs,
        element.nutrition_facts.fat,
        element.nutrition_facts.protein
      );
      let recipeIngredients: RecipeIngredient[] = [];
      let numIng: number = 0;
      //let ingjson: string[] = JSON.parse(element.ingredients);
      element.ingredients.forEach(
        (ing: { name: string; quantity: number; unit: string }) => {
          ++numIng;
          let recipeIngredient: RecipeIngredient = new RecipeIngredient(
            numIng,
            ing.name,
            ing.quantity,
            ing.unit
          );
          recipeIngredients.push(recipeIngredient);
        }
      );
      recipes.push(
        new Recipe(
          recNum,
          element.name,
          element.rating,
          time,
          servings,
          recipeIngredients,
          nutrition,
          element.steps,
          element.url,
          element.picture_url,
          element.ingredTag,
          element.dietTag
        )
      );
    }
  );

  return recipes;
}

export function ConvertMinsToHours(time: number): string {
  let mins = time;
  let hour = 0;
  let hrString = "";
  while (mins > 60) {
    mins -= 60;
    hour++;
  }
  let formatedTime = "";
  if (hour === 0) {
    formatedTime = `${mins} mins`;
  } else {
    hour > 1 ? (hrString = "hrs") : (hrString = "hr");
    formatedTime = `${hour} ${hrString} ${mins} mins`;
  }
  return formatedTime;
}

export function AllRecipesToStringSorted(recipes: Recipe[]): string[] {
  // const recipes: Recipe[] = RecipeImport();
  const recipeString: string[] = [];

  recipes.forEach(
    (recipe: {
      id: number;
      name: string;
      rating: string;
      time: Time;
      serving: Serving;
      recipeIngredients: RecipeIngredient[];
      nutrition: Nutrition;
      instructions: string[];
      url: string;
      image: string | null;
      ingredTag: number[];
      dietTag: DietTag[];
    }) => {
      let ingstring: string[] = [];
      recipe.recipeIngredients.forEach((ing: RecipeIngredient) => {
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
          "\n\tRating: " +
          recipe.rating +
          "\n\tSource: " +
          recipe.url +
          "\n\tImage: " +
          recipe.image +
          "\n\tBake time: " +
          ConvertMinsToHours(recipe.time.bakeTime ?? 0) +
          "\n\tCook time: " +
          ConvertMinsToHours(recipe.time.cookTime ?? 0) +
          "\n\tPrep time: " +
          ConvertMinsToHours(recipe.time.prepTime ?? 0) +
          "\n\tTotal time: " +
          ConvertMinsToHours(recipe.time.totalTime ?? 0) +
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
          "\n\nIngredient Tags: \n" +
          recipe.ingredTag +
          "\n\nDiet Tags: \n" +
          recipe.dietTag +
          "\n"
      );
    }
  );
  return recipeString;
}

export async function AllRecipesToString(): Promise<string[]> {
  const recipes: Recipe[] = await RecipeImport();
  const recipeString: string[] = [];

  recipes.forEach(
    (recipe: {
      id: number;
      name: string;
      rating: string;
      time: Time;
      serving: Serving;
      recipeIngredients: RecipeIngredient[];
      nutrition: Nutrition;
      instructions: string[];
      url: string;
      image: string | null;
      ingredTag: number[];
      dietTag: DietTag[];
    }) => {
      let ingstring: string[] = [];
      recipe.recipeIngredients.forEach((ing: RecipeIngredient) => {
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
          "\n\tRating: " +
          recipe.rating +
          "\n\tSource: " +
          recipe.url +
          "\n\tImage: " +
          recipe.image +
          "\n\tBake time: " +
          ConvertMinsToHours(recipe.time.bakeTime ?? 0) +
          "\n\tCook time: " +
          ConvertMinsToHours(recipe.time.cookTime ?? 0) +
          "\n\tPrep time: " +
          ConvertMinsToHours(recipe.time.prepTime ?? 0) +
          "\n\tTotal time: " +
          ConvertMinsToHours(recipe.time.totalTime ?? 0) +
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
          "\n\nIngredient Tags: \n" +
          recipe.ingredTag +
          "\n\nDiet Tags: \n" +
          recipe.dietTag +
          "\n"
      );
    }
  );
  return recipeString;
}
