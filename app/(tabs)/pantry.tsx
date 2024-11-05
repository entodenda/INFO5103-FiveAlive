import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import { AllIngredientsImport } from "@/components/IngredientImport";
import { Ingredient } from "@/components/Ingredient";
import { Nutrition } from "@/components/Recipe";
import IngredientWidget from "@/components/IngredientWidget";
import IngredientInput from "@/components/IngredientInput";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { CheckBox } from "react-native-elements";
import {
  loadPantryIngredients,
  savePantryIngredients,
} from "@/components/PantryIngredients";

// Problems
// on page refresh (ie saved code change) - last item saved to pantry ingredients list seems to get dropped
// checking if ingredient is already there doesn't seem to be working

// todo - make second ingredient list - one for all in pantry, one for list to show

export default function PantryScreen() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [filtersVisible, setFiltersVisible] = useState<boolean>(false);
  const [glutenFreeFilter, setGFFilter] = useState<boolean>(false);
  const [nutFreeFilter, setNutFilter] = useState<boolean>(false);
  const [dairyFreeFilter, setDfFilter] = useState<boolean>(false);
  const [veganFilter, setVeganFilter] = useState<boolean>(false);
  const [isAddMode, setIsAddMode] = useState<boolean>(false);

  //Temp for shorter load time.
  const testIngredients = [
    new Ingredient(
      2,
      "all-purpose flour",
      [1],
      new Nutrition("364.0", "71.42", "2.49", "12.08")
    ),
    new Ingredient(
      3,
      "almonds",
      [5],
      new Nutrition("598.0", "21.01", "52.54", "20.96")
    ),
    new Ingredient(
      4,
      "amber ale",
      [1],
      new Nutrition("43.0", "3.55", "0.0", "0.46")
    ),
    new Ingredient(
      5,
      "angel food cake",
      [1, 2],
      new Nutrition("258.0", "57.8", "0.8", "5.9")
    ),
  ];

  useEffect(() => {
    //use this to create pantry json if not exists, or to reset if problems
    //savePantryIngredients(testIngredients);

    loadIngredients;
  }, []);
  useEffect(() => {
    filterList();
  }, [glutenFreeFilter, nutFreeFilter, dairyFreeFilter, veganFilter]);

  // load ingredients from saved pantry list
  const loadIngredients = () => {
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

  const filterList = () => {
    // load all ingredients in saved file
    loadIngredients;
    let unFilteredIngredients = ingredients;

    //let unFilteredIngredients = AllIngredientsImport();
    let filteredIngredients = new Array<Ingredient>();

    unFilteredIngredients.forEach((ingredient) => {
      const glutenFreePass = glutenFreeFilter
        ? !ingredient.dietTag?.includes(1)
        : true;
      const veganPass = veganFilter ? !ingredient.dietTag?.includes(2) : true;
      const dairyFreePass = dairyFreeFilter
        ? !ingredient.dietTag?.includes(4)
        : true;
      const nutFreePass = nutFreeFilter
        ? !ingredient.dietTag?.includes(5)
        : true;
      console.log();
      console.log("Filters for " + ingredient.name);
      console.log("_______________________________");
      console.log("glutenFreePass: " + glutenFreePass);
      console.log("veganPass: " + veganPass);
      console.log("dairyFreePass: " + dairyFreePass);
      console.log("nutFreePass: " + nutFreePass);

      if (glutenFreePass && veganPass && dairyFreePass && nutFreePass) {
        console.log("ingredient should appear");
        filteredIngredients.push(ingredient);
      } else {
        console.log("ingredient should not appear");
      }
    });
    console.log();
    console.log("AFTER FILTER");
    console.log("_____________");
    console.log(filteredIngredients);

    setIngredients(filteredIngredients); // Return the filtered list
  };
  useEffect(() => {
    console.log();
    console.log("AFTER SET (Ingredients)");
    console.log("_____________");
    console.log(ingredients);
    console.log(ingredients.length);
  }, [ingredients]);

  const addIngredientHandler = async (ingredient: Ingredient) => {
    // check if already on list
    //loadIngredients;
    if (ingredients.includes(ingredient, 0)) {
      console.log("Ingredient already in pantry.");
    } else {
      setIngredients((ingredients) => [...ingredients, ingredient]);
    }
    // save ingredients list to json
    await savePantryIngredients(ingredients);
    const toastString: string = ingredient.name + " added";
    Toast.show({
      type: "info",
      text1: toastString,
      position: "bottom",
    });

    //apply any filters still checked
    filterList;
    // close add ingredient modal
    setIsAddMode(false);
  };

  const handleAddClick = () => {
    // call add ingredient modal
    setIsAddMode(true);
  };

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
          <Text style={styles.title}>~ My Pantry ~</Text>
          <TouchableOpacity onPress={handleAddClick}>
            <Ionicons name="add" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {filtersVisible && (
          <View>
            <View style={styles.checkBoxRow}>
              <CheckBox
                title="Gluten Free"
                checked={glutenFreeFilter}
                onPress={() => setGFFilter(!glutenFreeFilter)}
                containerStyle={styles.checkBox}
              />
              <CheckBox
                title="Vegan"
                checked={veganFilter}
                onPress={() => setVeganFilter(!veganFilter)}
                containerStyle={styles.checkBox}
              />
              <CheckBox title="Vegetarian" containerStyle={styles.checkBox} />
            </View>
            <View style={styles.checkBoxRow}>
              <CheckBox
                title="Nut Free"
                checked={nutFreeFilter}
                onPress={() => setNutFilter(!nutFreeFilter)}
                containerStyle={styles.checkBox}
              />
              <CheckBox
                title="Dairy Free"
                checked={dairyFreeFilter}
                onPress={() => setDfFilter(!dairyFreeFilter)}
                containerStyle={styles.checkBox}
              />
            </View>
          </View>
        )}
      </View>
      <IngredientInput
        visible={isAddMode}
        onCancel={() => setIsAddMode(false)}
        onAddItem={addIngredientHandler}
      />

      <ScrollView>
        {ingredients.map((ingredient) => (
          <IngredientWidget key={ingredient.id} ingredient={ingredient} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 10,
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
  checkBoxRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  checkBox: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
});
