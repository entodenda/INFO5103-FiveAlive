import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ingredient } from "./Ingredient";
import { Nutrition } from "./Recipe";

interface IngredientWidgetProps {
    ingredient: Ingredient;
}

const IngredientWidget: React.FC<IngredientWidgetProps> = ({ ingredient }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.ingredientNameTxt}>
                        {ingredient.name}
                    </Text>
                </View>
                <View style={styles.column}>
                    <View style={styles.tagContainer}>
                        {!ingredient.dietTag?.includes(1) ? (
                            <Image
                                style={styles.tinyLogo}
                                source={require("../assets/images/glutenfree.png")}
                            />
                        ) : null}
                        {!ingredient.dietTag?.includes(2) ? (
                            <Image
                                style={styles.tinyLogo}
                                source={require("../assets/images/veganpro.png")}
                            />
                        ) : null}
                        {!ingredient.dietTag?.includes(4) ? (
                            <Image
                                style={styles.tinyLogo}
                                source={require("../assets/images/dairyfree.png")}
                            />
                        ) : null}
                        {!ingredient.dietTag?.includes(5) ? (
                            <Image
                                style={styles.tinyLogo}
                                source={require("../assets/images/nutfree.png")}
                            />
                        ) : null}
                    </View>
                </View>
            </View>
            <View style={styles.nutritionContainer}>
                <Text style={styles.servingTxt}>Per Serving</Text>
                <View>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.listTxt}>
                                • {ingredient.macros!.calories} Calories
                            </Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.listTxt}>
                                • {ingredient.macros!.fat}g Fat
                            </Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.listTxt}>
                                • {ingredient.macros!.protein}g Protein
                            </Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.listTxt}>
                                • {ingredient.macros!.carbs}g Carbs
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#D9D9D9",
        borderRadius: 20,
        padding: 15,
        marginBottom: 25,
        marginHorizontal: 10,
        elevation: 5, //Shadow
        height: 120,
    },
    row: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    column: {
        flex: 1,
    },
    tagContainer: {
        flexDirection: "row-reverse",
    },
    nutritionContainer: {
        position: "absolute",
        top: 40,
        left: 20,
        width: "100%",
    },
    ingredientNameTxt: {
        fontWeight: "bold",
        fontSize: 18,
    },
    servingTxt: {
        fontSize: 18,
        paddingLeft: 10,
    },
    tinyLogo: {
        width: 45,
        height: 45,
    },
    listTxt: {
        fontSize: 18,
        paddingLeft: 25,
    },
});

export default IngredientWidget;
