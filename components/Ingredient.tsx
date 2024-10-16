import { Nutrition } from "./Recipe";

export class Ingredient {
  id: number;
  name: string;
  dietTag: number[];
  macros: Nutrition;

  public constructor(
    id: number,
    name: string,
    dietTag: number[],
    macros: Nutrition
  ) {
    this.id = id;
    this.name = name;
    this.dietTag = dietTag;
    this.macros = macros;
  }
}
