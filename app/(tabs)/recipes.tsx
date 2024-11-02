import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, TouchableOpacity } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {AllRecipesToStringSorted ,AllRecipesToString} from "@/components/RecipeImport";
import * as recipeSorter from "@/components/RecipeSortFunctions";
import { useState , useEffect} from 'react';
import { Recipe, } from "../../components/Recipe";

export default function RecipesScreen() {
const [recipesSorted , setRecipes] = useState([""]);

useEffect(() => {
  setRecipes(AllRecipesToString());
},[]);
const SortByRandomOnClick = () => {
  setRecipes(AllRecipesToStringSorted(recipeSorter.SortByRandom()));
}

const timeAscendingOnClick = () => {
  setRecipes(AllRecipesToStringSorted(recipeSorter.SortByCookTimeAscending()));
}
const timeDescendingOnClick = () => {
  setRecipes(AllRecipesToStringSorted(recipeSorter.SortByCookTimeDescending()));
}
const calroiesAscendingOnClick = () => {
  setRecipes(AllRecipesToStringSorted(recipeSorter.SortByCaloriesAscending()));
}
const calroiesDescendingOnClick = () => {
  setRecipes(AllRecipesToStringSorted(recipeSorter.SortByCaloriesDescending()));
}
const ratingAscendingOnClick = () => {
  setRecipes(AllRecipesToStringSorted(recipeSorter.SortByRatingAscending()));
}
const ratingDescendingOnClick = () => {
  setRecipes(AllRecipesToStringSorted(recipeSorter.SortByRatingDescending()));
}

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={200} name="book-outline" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Recipes</ThemedText>
      </ThemedView>
      <ThemedText>This is to test recipe import functionality</ThemedText>
      <TouchableOpacity style={styles.button} onPress={ratingAscendingOnClick}><ThemedText>Rating Ascending</ThemedText></TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={ratingDescendingOnClick}><ThemedText>Rating Descending</ThemedText></TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={SortByRandomOnClick}><ThemedText>Sort Randomly</ThemedText></TouchableOpacity>
      <ThemedText>
        {recipesSorted}
      </ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#A42",
    bottom: -30,
    left: -25,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});
