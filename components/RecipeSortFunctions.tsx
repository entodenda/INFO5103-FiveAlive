import { Recipe, Time, Serving, RecipeIngredient, Nutrition } from "./Recipe";
import {RecipeImport} from "./RecipeImport";

const recipeIn: Recipe[] = RecipeImport();

const SortByRandom = () : Recipe[] => {
  shuffle(recipeIn);
  return recipeIn;
}
const SortByCookTimeDescending = (): Recipe[] => {
  return recipeIn.sort((r1, r2)=> (r1.time.totalTime! > r2.time.totalTime! ? -1 : 1));
}
const SortByCookTimeAscending = (): Recipe[] => {
  return recipeIn.sort((r1, r2)=> (r1.time.totalTime! < r2.time.totalTime! ? -1 : 1));
}

const SortByCaloriesAscending = (): Recipe[] => {
return recipeIn.sort((r1,r2)=> (r1.nutrition.calories! < r2.nutrition.calories! ? -1 : 1));
} 
const SortByCaloriesDescending = (): Recipe[] => {
  return recipeIn.sort((r1,r2)=> (r1.nutrition.calories! > r2.nutrition.calories! ? -1 : 1));
} 

const SortByProteinAscending = (): Recipe[] => {
  return recipeIn.sort((r1,r2)=> (r1.nutrition.protein! < r2.nutrition.protein! ? -1 : 1));
} 
const SortByProteinDescending = (): Recipe[] => {
  return recipeIn.sort((r1,r2)=> (r1.nutrition.protein! > r2.nutrition.protein! ? -1 : 1));
} 

const SortByFatsAscending = (): Recipe[] => {
  return recipeIn.sort((r1,r2)=> (r1.nutrition.fat! < r2.nutrition.fat! ? -1 : 1));
} 
const SortByFatsDescending = (): Recipe[] => {
  return recipeIn.sort((r1,r2)=> (r1.nutrition.fat! > r2.nutrition.fat! ? -1 : 1));
}

const SortByCarbsAscending = (): Recipe[] => {
  return recipeIn.sort((r1,r2)=> (r1.nutrition.carbs! < r2.nutrition.carbs! ? -1 : 1));
} 
const SortByCarbsDescending = (): Recipe[] => {
  return recipeIn.sort((r1,r2)=> (r1.nutrition.carbs! > r2.nutrition.carbs! ? -1 : 1));
} 

const SortByRatingAscending = (): Recipe[] => {
  return recipeIn.sort((r1,r2)=> (r1.rating! < r2.rating ? -1 : 1));
} 
const SortByRatingDescending = (): Recipe[] => {
  return recipeIn.sort((r1,r2)=> (r1.rating! > r2.rating ? -1 : 1));
} 

function shuffle(array:Recipe[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}
export{ SortByRandom ,SortByCookTimeDescending, SortByCookTimeAscending,SortByCaloriesAscending,SortByCaloriesDescending,
  SortByProteinAscending, SortByProteinDescending, SortByFatsAscending, SortByFatsDescending, SortByCarbsAscending, SortByCarbsDescending,
  SortByRatingAscending, SortByRatingDescending
};