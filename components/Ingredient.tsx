import { Nutrition } from "./Recipe";

export class Ingredient {
  id: number;
  name: string;
  dietTag?: DietTag[]; // ? allows us to import just the name and id
  macros?: Nutrition; // ? allows us to import just the name and id

  public constructor(
    id: number,
    name: string,
    dietTag?: DietTag[],
    macros?: Nutrition
  ) {
    this.id = id;
    this.name = name;
    this.dietTag = dietTag;
    this.macros = macros;
  }
}

export enum DietTag {
  ContainsGluten = 1,
  NotVegan = 2,
  NotVegetarian = 3,
  ContainsDairy = 4,
  ContainsNuts = 5,
  None = 6,
}
