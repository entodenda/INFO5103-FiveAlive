import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ingredient } from "./Ingredient";
import { ImageSourcePropType } from "react-native";
import { Nutrition } from "./Recipe";

interface IngredientWidgetProps {
    ingredient: Ingredient;
}

const IngredientWidget: React.FC<IngredientWidgetProps> = ({ ingredient }) => {
    let iconCount = 0;
    const iconSourceFiles: { [key: number]: ImageSourcePropType } = {
        1: require("../assets/images/glutenfree.png"),
        2: require("../assets/images/veganpro.png"),
        3: require("../assets/images/vegetarian.png"),
        4: require("../assets/images/dairyfree.png"),
        5: require("../assets/images/nutfree.png"),
    };

    const renderIcon = (tag: number) => {
        const imageSource = iconSourceFiles[tag];
        return <Image style={styles.tinyLogo} source={imageSource} />;
    };

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
                        {Object.entries(iconSourceFiles).map(([key]) => {
                            const tag = Number(key);
                            return !ingredient.dietTag?.includes(tag)
                                ? renderIcon(tag)
                                : null;
                        })}
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
        width: 35,
        height: 35,
    },
    listTxt: {
        fontSize: 18,
        paddingLeft: 25,
    },
});

export default IngredientWidget;
