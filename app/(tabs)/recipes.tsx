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
import React, { useEffect, useState, useRef } from "react";
import { StarRatingDisplay } from "react-native-star-rating-widget";

import { ThemedText } from "@/components/ThemedText";
import { RecipeImport } from "@/components/RecipeImport";
import { Recipe } from "@/components/Recipe";
import RecipeModal from "@/components/RecipeModal";
import { DietTag } from "@/components/Ingredient";
import { DisplayDietNames, FindMatchingRecipe } from "@/components/Searches";
import * as sort from "@/components/RecipeSortFunctions";
import { ScrollView } from "react-native";
import { Ingredient } from "@/components/Ingredient";
import {
  loadFilters,
  loadPantryIngredients,
  saveFilters,
} from "@/components/PantryIngredients";

const RecipesScreen: React.FC = () => {
  const sortByMostMatchingIngredients = (recipes: Recipe[]): Recipe[] => {
    if (ingredients.length < 1) {
      return recipes;
    }
    const ingredientIds = ingredients?.map((ingred) => ingred.id);

    // Sort recipes by the count of matching ingredients
    return [...recipes].sort((a, b) => {
      const aMatches = a.ingredTag.filter((id) =>
        ingredientIds?.includes(id)
      ).length;
      const bMatches = b.ingredTag.filter((id) =>
        ingredientIds?.includes(id)
      ).length;

      return bMatches - aMatches; // Descending order
    });
  };

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [filtersVisible, setFiltersVisible] = useState<boolean>(false);
  const [sortVisible, setSortVisible] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedTags, setSelectedTags] = useState<DietTag[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedSort, setSelectedSort] = useState<
    (recipes: Recipe[]) => Recipe[]
  >(sortByMostMatchingIngredients);
  const [selectedSortLabel, setSelectedSortLabel] = useState<string>(
    "Ingredient Match, High to Low"
  );
  const [filteredAndSortedRecipes, setfilteredAndSortedRecipes] = useState<
    Recipe[]
  >([]);
  const [paginatedRecipes, setpaginatedRecipes] = useState<Recipe[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  //faster loading/sorting
  const recipesPerPage = 20;

  //scrolls back to beginning when user moves to another page or sorts/filters
  const listRef = useRef<FlatList>(null);

  const sortOptions = [
    {
      label: "Ingredient Match, High to Low",
      sortFunc: sortByMostMatchingIngredients,
    },
    { label: "Random", sortFunc: sort.SortByRandom },
    {
      label: "Cook Time, Low to High",
      sortFunc: sort.SortByCookTimeAscending,
    },
    {
      label: "Cook Time, High to Low",
      sortFunc: sort.SortByCookTimeDescending,
    },
    {
      label: "Calories, Low to High",
      sortFunc: sort.SortByCaloriesAscending,
    },
    {
      label: "Calories, High to Low",
      sortFunc: sort.SortByCaloriesDescending,
    },
    {
      label: "Protein, Low to High",
      sortFunc: sort.SortByProteinAscending,
    },
    {
      label: "Protein, High to Low",
      sortFunc: sort.SortByProteinDescending,
    },
    { label: "Fats, Low to High", sortFunc: sort.SortByFatsAscending },
    { label: "Fats, High to Low", sortFunc: sort.SortByFatsDescending },
    { label: "Carbs, Low to High", sortFunc: sort.SortByCarbsAscending },
    { label: "Carbs, High to Low", sortFunc: sort.SortByCarbsDescending },
    { label: "Rating, Low to High", sortFunc: sort.SortByRatingAscending },
    { label: "Rating, High to Low", sortFunc: sort.SortByRatingDescending },
  ];

  const handleSort = (
    label: string,
    sortFunc: (recipes: Recipe[]) => Recipe[]
  ) => {
    setSelectedSort(() => sortFunc);
    setSelectedSortLabel(label);
    setSortVisible(false);
    setCurrentPage(1);
  };

  const dietTagArray = Object.values(DietTag).filter(
    (value) => typeof value === "number"
  ) as DietTag[];
  const dietTagFormatted = DisplayDietNames(dietTagArray);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const recipeImport: Recipe[] = await RecipeImport();
        setRecipes(recipeImport);
        await loadIngredients();
        await loadFiltersAsync();
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };
    getRecipes();
  }, []);

  const loadFiltersAsync = async () => {
    const myPromise = loadFilters();
    myPromise
      .then((value) => {
        if (value) {
          setSelectedTags(value);
        }
      })
      .catch((error) => {
        console.error("loadFiltersAsync Promise rejected with error: " + error);
      });
  };

  const handleRecipePress = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  const filterRecipes = (recipes: Recipe[]) => {
    if (selectedTags.length === 0) return recipes; // No filter applied
    return recipes.filter((recipe) =>
      selectedTags.every((tag) => !recipe.dietTag.includes(tag))
    );
  };

  useEffect(() => {
    const res: Recipe[] = filteredAndSortedRecipes.slice(
      (currentPage - 1) * recipesPerPage,
      currentPage * recipesPerPage
    );
    setpaginatedRecipes(res);
  }, [filteredAndSortedRecipes, currentPage]);

  const toggleTag = (tag: DietTag) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
    const saveFiltersAsync = async () => {
      try {
        await saveFilters(updatedTags);
        console.log("saved filter");
      } catch (error) {
        console.error("Error saving tags", error);
      }
    };
    saveFiltersAsync();
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
      <View style={styles.recipeItemRow}>
        <StarRatingDisplay
          rating={parseFloat(item.rating)}
          color="#f7931e"
          starSize={20}
        />
        <ThemedText style={styles.recipeTitle}>{item.rating}</ThemedText>
      </View>
    </TouchableOpacity>
  );

  const next = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const loadIngredients = async () => {
    const myPromise = loadPantryIngredients();
    myPromise
      .then((value) => {
        if (value) {
          setIngredients(value);
        }
      })
      .catch((error) => {
        console.error(
          "loadPantryIngredients Promise rejected with error: " + error
        );
      });
  };

  useEffect(() => {
    const updateRecipes = async () => {
      if (ingredients.length !== 0) {
        try {
          const ids = ingredients.map((ingred) => ingred.id);
          let res: Recipe[] | null = await FindMatchingRecipe([], ids, recipes); // TODO: Diet tags go here
          if (!res || res.length === 0) {
            res = recipes;
          }

          // Filter and sort the recipes
          const filter = filterRecipes(res);
          const sortedAndFiltered = (selectedSort ?? ((recipes) => recipes))(
            filter
          );

          setfilteredAndSortedRecipes(sortedAndFiltered);
          setTotalPages(Math.ceil(sortedAndFiltered.length / recipesPerPage));
        } catch (error) {
          console.error("Error updating recipes:", error);
        }
      }
    };
    updateRecipes();
  }, [ingredients, selectedSortLabel, selectedTags]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => {
              setFiltersVisible(!filtersVisible);
              setSortVisible(false);
            }}
          >
            <Ionicons
              name={filtersVisible ? "filter" : "filter-outline"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <Text style={styles.title}>~ My Recipes ~</Text>
          <TouchableOpacity
            onPress={() => {
              setSortVisible(!sortVisible);
              setFiltersVisible(false);
              setCurrentPage(1);
            }}
          >
            <Ionicons
              name={sortVisible ? "options" : "options-outline"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>

      {filtersVisible && (
        <View style={styles.filtersContainer}>
          <Text>Filter By:</Text>
          {dietTagFormatted.map((tagName, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleTag(dietTagArray[index])}
            >
              <Text
                style={
                  selectedTags.includes(dietTagArray[index])
                    ? styles.selectedTag
                    : styles.tag
                }
              >
                {tagName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {sortVisible && (
        <View style={styles.sortContainer}>
          <Text>Sort By:</Text>
          <ScrollView
            contentContainerStyle={styles.sortOptionsContainer}
            style={styles.scroll}
          >
            {sortOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSort(option.label, option.sortFunc)}
              >
                <Text
                  style={[
                    styles.sortOption,
                    selectedSortLabel === option.label &&
                      styles.selectedSortOption,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <TouchableOpacity onPress={loadIngredients} style={styles.refreshBtn}>
        <Text style={styles.refreshBtnTxt}>{"Refresh"}</Text>
      </TouchableOpacity>

      <FlatList
        ref={listRef}
        data={paginatedRecipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.recipeList}
      />

      <View style={styles.paginationContainer}>
        {currentPage > 1 && (
          <TouchableOpacity onPress={prev} style={styles.loadBtn}>
            <Text style={styles.loadRecipes}>{"Previous Page"}</Text>
          </TouchableOpacity>
        )}
        {currentPage < totalPages && (
          <TouchableOpacity
            onPress={next}
            style={[styles.loadBtn, { marginLeft: currentPage > 1 ? 50 : 0 }]}
          >
            <Text style={styles.loadRecipes}>{"Next Page"}</Text>
          </TouchableOpacity>
        )}
      </View>

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
    marginBottom: 10,
  },
  recipeItemRow: { flexDirection: "row" },
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
    paddingBottom: 100,
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
  sortContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
  },
  sortOptionsContainer: {
    paddingBottom: 20,
  },

  sortOption: {
    fontSize: 16,
    marginVertical: 5,
    color: "black",
  },
  selectedSortOption: {
    color: "blue",
    fontWeight: "bold",
  },
  scroll: {
    height: 140,
  },
  loadBtn: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
    width: 200,
    marginTop: 5,
    marginBottom: 40,
  },
  refreshBtn: {
    position: "absolute",
    top: 95,
    right: 15,
  },
  refreshBtnTxt: {
    fontSize: 16,
    color: "#3374FF",
    textDecorationLine: "underline",
  },
  loadRecipes: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  paginationContainer: {
    position: "absolute",
    bottom: 20,
    left: "27%",
  },
});

export default RecipesScreen;
