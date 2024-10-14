export class Recipe {
  id: number;
  name: string;
  time: Time;
  serving: Serving;
  ingredients: Ingredient[];
  nutrition: Nutrition;
  instructions: string[];
  url: string;
  image: string | null; //(base64)

  public constructor(
    id: number,
    name: string,
    time: Time,
    serving: Serving,
    ingredients: Ingredient[],
    nutrition: Nutrition,
    instructions: string[],
    url: string,
    image: string | null
  ) {
    this.id = id;
    this.name = name;
    this.time = time;
    this.serving = serving;
    this.ingredients = ingredients;
    this.nutrition = nutrition;
    this.instructions = instructions;
    this.url = url;
    this.image = image;
  } // Recipe ctor
} //Recipe class

export class Time {
  bakeTime: string | null;
  cookTime: string | null;
  prepTime: string | null;
  totalTime: string | null;

  public constructor(
    bakeTime: string | null,
    cookTime: string | null,
    prepTime: string | null,
    totalTime: string | null
  ) {
    this.bakeTime = bakeTime;
    this.cookTime = cookTime;
    this.prepTime = prepTime;
    this.totalTime = totalTime;
  } // Time ctor
} // Time class

export class Serving {
  servings: string | null;
  //ryield: string | null;

  public constructor(
    servings: string | null
    //ryield: string | null
  ) {
    this.servings = servings;
    //this.ryield = ryield;
  }
} // Serving class

export class Ingredient {
  id: number;
  name: string | null;
  quantity: number;
  unit: string | null;

  public constructor(
    id: number,
    name: string | null,
    quantity: number,
    unit: string | null,
  ) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.unit = unit;
  }
} // Ingredient class

export class Nutrition {
  calories: string | null;
  carbs: string | null;
  fat: string | null;
  protein: string | null;

  public constructor(
    calories: string | null,
    carbs: string | null,
    fat: string | null,
    protein: string | null
  ) {
    this.calories = calories;
    this.carbs = carbs;
    this.fat = fat;
    this.protein = protein;
  }
} // Nutrition class
