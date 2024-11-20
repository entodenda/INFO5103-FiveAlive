import * as MailComposer from "expo-mail-composer";
import Toast from "react-native-toast-message";
import { Recipe } from "./Recipe";
import { ConvertMinsToHours } from "./RecipeImport";

const getRecipeInfo = async (recipe: Recipe): Promise<string> => {
  try {
    const info =
      `Instructions:\n` +
      `${recipe.instructions.map((ing) => `• ${ing}\n`).join("")}\n` +
      `Cooking Times:\n` +
      `Bake Time: ${
        recipe.time.bakeTime != null
          ? ConvertMinsToHours(recipe.time.bakeTime!)
          : 0
      }\n` +
      `Cook Time: ${
        recipe.time.cookTime != null
          ? ConvertMinsToHours(recipe.time.cookTime!)
          : 0
      }\n` +
      `Prep Time: ${
        recipe.time.prepTime != null
          ? ConvertMinsToHours(recipe.time.prepTime!)
          : 0
      }\n` +
      `Total Time: ${
        recipe.time.bakeTime != null
          ? ConvertMinsToHours(recipe.time.totalTime!)
          : 0
      }\n` +
      `Servings: ${recipe.serving.servings}\n` +
      `Nutrition:\n` +
      `Calories: ${
        recipe.nutrition.calories === null ? "N/A" : recipe.nutrition.calories
      }\n` +
      `Carbs: ${
        recipe.nutrition.carbs === null ? "N/A" : recipe.nutrition.carbs + "g"
      }\n` +
      `Fat: ${
        recipe.nutrition.fat === null ? "N/A" : recipe.nutrition.fat + "g"
      }\n` +
      `Protein: ${
        recipe.nutrition.protein === null
          ? "N/A"
          : recipe.nutrition.protein + "g"
      }\n` +
      `Ingredients:\n` +
      `${recipe.recipeIngredients
        .map((ing) =>
          ing.unit != null ? ` • ${ing.unit} ${ing.name}\n` : ` • ${ing.name}\n`
        )
        .join("")}\n\n` +
      `Source:\n` +
      `${recipe.url}`;
    return info;
  } catch (error) {
    console.error("Error obtaining recipe: ", error);
    return "";
  }
};

const sendMessageWithEmail = async (recipe: Recipe, email: string) => {
  const isAvailable = await MailComposer.isAvailableAsync();

  if (isAvailable) {
    const emailBody = await getRecipeInfo(recipe);

    const options = {
      recipients: [email],
      subject: recipe.name,
      body: emailBody,
    };

    MailComposer.composeAsync(options)
      .then((result) => {
        console.log(result.status);
        Toast.show({
          type: "info",
          text1: "Success! Your email has been sent!",
          position: "bottom",
        });
      })
      .catch((error) => {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Failed to send email. Please try again.",
          position: "bottom",
        });
      });
  } else {
    console.log("Email is not available on this device");
  }
};

const sendFeedbackEmail = async (
  name: string,
  feedback: string,
  email: string
) => {
  const isAvailable = await MailComposer.isAvailableAsync();

  if (isAvailable) {
    const options = {
      recipients: ["reciperhapsody@outlook.com"],
      subject: name + "'s Feedback",
      body:
        "Feedback:\n" + feedback + "\n\n" + "Preferred contact email: " + email,
    };

    MailComposer.composeAsync(options)
      .then((result) => {
        console.log(result.status);
        Toast.show({
          type: "info",
          text1: "Success! Your email has been sent!",
          position: "bottom",
        });
      })
      .catch((error) => {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Failed to send email. Please try again.",
          position: "bottom",
        });
      });
  } else {
    console.log("Email is not available on this device");
  }
};

export { sendMessageWithEmail, sendFeedbackEmail };
