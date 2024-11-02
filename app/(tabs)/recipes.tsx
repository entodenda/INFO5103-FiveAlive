import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  Platform,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState } from "react";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { RecipeImport } from "@/components/RecipeImport";
import { Recipe } from "@/components/Recipe";
import RecipeModal from "@/components/RecipeModal";

export enum DietTag {
  ContainsGluten = 1,
  NotVegan = 2,
  NotVegetarian = 3,
  ContainsDairy = 4,
  ContainsNuts = 5,
  None = 6,
}

const RecipesScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [filtersVisible, setFiltersVisible] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedTags, setSelectedTags] = useState<DietTag[]>([]);
  const recipes: Recipe[] = RecipeImport();

  const handleRecipePress = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  const filterRecipes = (recipes: Recipe[]) => {
    if (selectedTags.length === 0) return recipes; // No filter applied
    return recipes.filter((recipe) =>
      selectedTags.every((tag) => recipe.dietTag.includes(tag))
    );
  };

  const filteredRecipes = filterRecipes(recipes);

  const toggleTag = (tag: DietTag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const renderRecipeItem = ({ item }: { item: Recipe }) => (
    <TouchableOpacity
      onPress={() => handleRecipePress(item)}
      style={styles.recipeItem}
    >
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.recipeImage} />
      )}
      <ThemedText style={styles.recipeTitle}>{item.name}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => setFiltersVisible(!filtersVisible)}>
            <Ionicons
              name={filtersVisible ? "filter" : "filter-outline"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <Text style={styles.title}>~ My Recipes ~</Text>
          <View></View>
        </View>
      </View>

      {filtersVisible && (
        <View style={styles.filtersContainer}>
          <Text>Select Diet Tags:</Text>
          {(Object.values(DietTag) as DietTag[]).map((tag) => (
            <TouchableOpacity key={tag} onPress={() => toggleTag(tag)}>
              <Text
                style={
                  selectedTags.includes(tag) ? styles.selectedTag : styles.tag
                }
              >
                {DietTag[tag]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <FlatList
        data={filteredRecipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.recipeList}
      />

      <RecipeModal
        visible={modalVisible}
        recipe={selectedRecipe}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  header: {
    paddingTop: 50,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recipeItem: {
    width: Platform.OS === "web" ? "50%" : "100%",
    alignSelf: "center",
    margin: 10,
    padding: 8,
    borderRadius: 25,
    backgroundColor: "#343434",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recipeImage: {
    width: "100%",
    height: Platform.OS === "web" ? 100 : 200,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginBottom: 10,
  },
  recipeTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "300",
    marginBottom: 10,
    marginLeft: 5,
  },
  recipeList: {
    paddingBottom: 20,
  },
  filtersContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
  },
  tag: {
    fontSize: 16,
    marginVertical: 5,
    color: "black",
  },
  selectedTag: {
    fontSize: 16,
    marginVertical: 5,
    color: "blue",
  },
});

export default RecipesScreen;
