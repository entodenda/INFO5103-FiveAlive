import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { ConvertMinsToHours } from "./RecipeImport";
import Fraction from "fraction.js";
import { ChangeInfoScale } from "./Scale";

import { Recipe, Serving } from "./Recipe";

interface RecipeModalProps {
  visible: boolean;
  recipe: Recipe | null;
  onClose: () => void;
}

const FractionDisplay: React.FC<{ value: number }> = ({ value }) => {
  const fraction = new Fraction(value);
  return <Text>{fraction.toFraction(true)}</Text>;
};

type SectionKey =
  | "source"
  | "cookingTimes"
  | "nutrition"
  | "ingredients"
  | "instructions";

const RecipeModal: React.FC<RecipeModalProps> = ({
  visible,
  recipe,
  onClose,
}) => {
  const initialExpandedSections: Record<SectionKey, boolean> = {
    source: false,
    cookingTimes: false,
    nutrition: false,
    ingredients: false,
    instructions: true,
  };

  const [expandedSections, setExpandedSections] = useState(
    initialExpandedSections
  );

  let [servings, setServings] = useState(0);
  let [thisRecipe , setThisRecipe] = useState(recipe);

  const toggleSection = (section: SectionKey) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleClose = () => {
    setExpandedSections(initialExpandedSections);
    onClose();
  };

  const onScaleChange = (serv: any) => {
      setServings(serv);

    if (recipe != null && recipe.serving.servings) 
      {
        thisRecipe = ChangeInfoScale(recipe, (serv/+recipe.serving.servings));
        setThisRecipe(thisRecipe)
      }


  };

  if (!recipe) return null;

  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {recipe.image && (
            <Image
              source={{ uri: recipe.image }}
              style={styles.backgroundImage}
            />
          )}
          <View style={styles.translucentBackground}>
            {recipe.image && (
              <Image
                source={{ uri: recipe.image }}
                style={styles.recipeImage}
              />
            )}
            <View style={styles.headerContainer}>
              <Text style={styles.modalTitle}>{recipe.name}</Text>
              <TouchableOpacity
                onPress={handleClose}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <ScrollView
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              {/* Instructions Section */}
              <TouchableOpacity
                onPress={() => toggleSection("instructions")}
                style={styles.card}
              >
                <Text style={styles.sectionTitle}>Instructions:</Text>
                {expandedSections.instructions && (
                  <>
                    {recipe.instructions.map((step, index) => (
                      <Text key={index} style={styles.sectionText}>{`${
                        index + 1
                      }. ${step}`}</Text>
                    ))}
                  </>
                )}
              </TouchableOpacity>

              {/* Cooking Times Section */}
              <TouchableOpacity
                onPress={() => toggleSection("cookingTimes")}
                style={styles.card}
              >
                <Text style={styles.sectionTitle}>Cooking Times:</Text>
                {expandedSections.cookingTimes && (
                  <>
                    {recipe.time.bakeTime != null && (
                      <Text style={styles.sectionText}>
                        Bake time: {ConvertMinsToHours(recipe.time.bakeTime)}
                      </Text>
                    )}
                    {recipe.time.cookTime != null && (
                      <Text style={styles.sectionText}>
                        Cook time: {ConvertMinsToHours(recipe.time.cookTime)}
                      </Text>
                    )}
                    {recipe.time.prepTime != null && (
                      <Text style={styles.sectionText}>
                        Prep time: {ConvertMinsToHours(recipe.time.prepTime)}
                      </Text>
                    )}
                    {recipe.time.totalTime != null && (
                      <Text style={styles.sectionText}>
                        Total time: {ConvertMinsToHours(recipe.time.totalTime)}
                      </Text>
                    )}
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.sectionText}>Servings: </Text>
                      <TextInput
                        style={styles.sectionText}
                        keyboardType="numeric"
                        value={String(servings)}
                        onChangeText={onScaleChange}
                        placeholder={String(recipe.serving.servings)}
                      />
                    </View>
                  </>
                )}
              </TouchableOpacity>

              {/* Nutritional Information Section */}
              <TouchableOpacity
                onPress={() => toggleSection("nutrition")}
                style={styles.card}
              >
                <Text style={styles.sectionTitle}>
                  Nutritional Information:
                </Text>
                {expandedSections.nutrition && (
                  <>
                    <Text style={styles.sectionText}>
                      Calories:{" "}
                      {recipe.nutrition.calories === null
                        ? "N/A"
                        : recipe.nutrition.calories}
                    </Text>
                    <Text style={styles.sectionText}>
                      {`Carbs: ${
                        recipe.nutrition.carbs === null
                          ? "N/A"
                          : recipe.nutrition.carbs + "g"
                      }`}
                    </Text>
                    <Text style={styles.sectionText}>
                      {`Fat: ${
                        recipe.nutrition.fat === null
                          ? "N/A"
                          : recipe.nutrition.fat + "g"
                      }`}
                    </Text>
                    <Text style={styles.sectionText}>
                      {`Protein: ${
                        recipe.nutrition.protein === null
                          ? "N/A"
                          : recipe.nutrition.protein + "g"
                      }`}
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              {/* Ingredients Section */}
              <TouchableOpacity
                onPress={() => toggleSection("ingredients")}
                style={styles.card}
              >
                <Text style={styles.sectionTitle}>Ingredients:</Text>
                {expandedSections.ingredients && (
                  <>
                    {thisRecipe?.recipeIngredients.map((ing) => (
                      <Text key={ing.id} style={styles.sectionText}>
                        {ing.unit != null ? (
                          <>
                            {` • `}
                            <FractionDisplay value={ing.quantity} />
                            {` ${ing.unit} ${ing.name}`}
                          </>
                        ) : (
                          <>
                            {` • `}
                            <FractionDisplay value={ing.quantity} />
                            {` ${ing.name}`}
                          </>
                        )}
                      </Text>
                    ))}
                  </>
                )}
              </TouchableOpacity>
              {/* Source Section */}
              <TouchableOpacity
                onPress={() => toggleSection("source")}
                style={styles.card}
              >
                <Text style={styles.sectionTitle}>Source:</Text>
                {expandedSections.source && (
                  <Text style={styles.sectionText}>{recipe.url}</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  modalContainer: {
    width: Platform.OS === "web" ? "60%" : "95%",
    maxHeight: "90%",
    padding: 12,
    borderRadius: 20,
    elevation: 5,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,1)",
  },

  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: "cover",
    opacity: 0.5,
    borderRadius: 20,
  },
  recipeImage: {
    width: "100%",
    height: 200,
    borderRadius: 20,
    marginBottom: 10,
  },
  translucentBackground: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 20,
    padding: 15,
    maxHeight: "100%",
    overflow: "hidden",
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingRight: 10,
  },
  scrollViewContent: {
    width: "100%",
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 16,
    marginLeft: 10, // Indent for subtext
    marginTop: 2,
  },
});

export default RecipeModal;
