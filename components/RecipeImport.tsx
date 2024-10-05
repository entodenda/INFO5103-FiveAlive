import { Recipe, Time, Serving, Ingredient, Nutrition } from "./Recipe";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";

export function RecipeImport(): string[] {
  const recipes: Recipe[] = [];
  const recipeNames: string[] = [];
  //let teststring: string = "test";
  let recNum: number = 0;

  //todo - try Object.assign from https://www.geeksforgeeks.org/how-to-cast-a-json-object-inside-of-typescript-class/
  //or code from here https://www.geeksforgeeks.org/how-to-initialize-a-typescript-object-with-a-json-object/?ref=oin_asr3
  let recipefile = require("../assets/first100recipes.json");
  //const recObj = JSON.parse(recipefile);
  recipefile.forEach(
    (element: {
      id: number;
      name: string;
      cook_time: string;
      bake_time: string;
      prep_time: string;
      total_time: string;
      //meta: string;
    }) => {
      //recipeNames.push(element.name + "\n");
      ++recNum;

      let time: Time = new Time(
        element.bake_time,
        element.cook_time,
        element.prep_time,
        element.total_time
      );
      recipes.push(new Recipe(recNum, element.name, time));
    }
  );
  recipes.forEach((recipe: { id: number; name: string; time: Time }) => {
    recipeNames.push(
      recipe.id.toString() +
        ": " +
        recipe.name +
        "\n" +
        "\tBake time: " +
        recipe.time.bakeTime +
        "\n\tCook time: " +
        recipe.time.cookTime +
        "\n\tPrep time: " +
        recipe.time.prepTime +
        "\n\tTotal time: " +
        recipe.time.totalTime +
        "\n"
    );
  });
  //teststring = recipefile[0].name;

  //return recipes;
  return recipeNames;
  //return teststring;
}
