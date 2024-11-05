import { Recipe } from "./Recipe";

const SortByRandom = (recipeIn: Recipe[]): Recipe[] => {
  shuffle(recipeIn);
  return recipeIn;
};
const SortByCookTimeDescending = (recipeIn: Recipe[]): Recipe[] => {
  return recipeIn.sort((r1, r2) =>
    r1.time.totalTime! > r2.time.totalTime! ? -1 : 1
  );
};
const SortByCookTimeAscending = (recipeIn: Recipe[]): Recipe[] => {
  return recipeIn.sort((r1, r2) =>
    r1.time.totalTime! < r2.time.totalTime! ? -1 : 1
  );
};

const SortByCaloriesAscending = (recipeIn: Recipe[]): Recipe[] => {
  return recipeIn.sort((r1, r2) =>
    r1.nutrition.calories! < r2.nutrition.calories! ? -1 : 1
  );
};
const SortByCaloriesDescending = (recipeIn: Recipe[]): Recipe[] => {
  return recipeIn.sort((r1, r2) =>
    r1.nutrition.calories! > r2.nutrition.calories! ? -1 : 1
  );
};

const SortByProteinAscending = (recipeIn: Recipe[]): Recipe[] => {
  return recipeIn.sort((r1, r2) =>
    r1.nutrition.protein! < r2.nutrition.protein! ? -1 : 1
  );
};
const SortByProteinDescending = (recipeIn: Recipe[]): Recipe[] => {
  return recipeIn.sort((r1, r2) =>
    r1.nutrition.protein! > r2.nutrition.protein! ? -1 : 1
  );
};

const SortByFatsAscending = (recipeIn: Recipe[]): Recipe[] => {
  return recipeIn.sort((r1, r2) =>
    r1.nutrition.fat! < r2.nutrition.fat! ? -1 : 1
  );
};
const SortByFatsDescending = (recipeIn: Recipe[]): Recipe[] => {
  return recipeIn.sort((r1, r2) =>
    r1.nutrition.fat! > r2.nutrition.fat! ? -1 : 1
  );
};

const SortByCarbsAscending = (recipeIn: Recipe[]): Recipe[] => {
  return recipeIn.sort((r1, r2) =>
    r1.nutrition.carbs! < r2.nutrition.carbs! ? -1 : 1
  );
};
const SortByCarbsDescending = (recipeIn: Recipe[]): Recipe[] => {
  return recipeIn.sort((r1, r2) =>
    r1.nutrition.carbs! > r2.nutrition.carbs! ? -1 : 1
  );
};

const SortByRatingAscending = (recipeIn: Recipe[]): Recipe[] => {
  return recipeIn.sort((r1, r2) => (r1.rating! < r2.rating ? -1 : 1));
};
const SortByRatingDescending = (recipeIn: Recipe[]): Recipe[] => {
  return recipeIn.sort((r1, r2) => (r1.rating! > r2.rating ? -1 : 1));
};

function shuffle(array: Recipe[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}
export {
  SortByRandom,
  SortByCookTimeDescending,
  SortByCookTimeAscending,
  SortByCaloriesAscending,
  SortByCaloriesDescending,
  SortByProteinAscending,
  SortByProteinDescending,
  SortByFatsAscending,
  SortByFatsDescending,
  SortByCarbsAscending,
  SortByCarbsDescending,
  SortByRatingAscending,
  SortByRatingDescending,
};
