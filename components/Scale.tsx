import { Recipe } from "./Recipe";

// This function generate a json file from a list of pantry infredients
export function ChangeInfoScale(recipe: Recipe, scale: number): Recipe {
  let result: Recipe = {
    ...recipe,
    recipeIngredients: recipe.recipeIngredients.map((ingrad) => ({
      ...ingrad,
      quantity: ingrad.quantity * scale,
    })),
  };

  return result;
}

export function ChangeNumberScale(info: number, scale: number): number {
  return info * scale;
}
