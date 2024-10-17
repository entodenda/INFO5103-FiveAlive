import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ingredient } from "./Ingredient";
import { Nutrition } from "./Recipe";

interface IngredientWidgetProps {
    name: string;
    macros: Nutrition;
}

const IngredientWidget: React.FC<IngredientWidgetProps> = ({
    name,
    macros,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.ingredientNameTxt}>{name}</Text>
            <Text style={styles.servingTxt}>Per Serving</Text>
            <View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.listTxt}>
                            • {macros.calories} Calories
                        </Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.listTxt}>• {macros.fat}g Fat</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.listTxt}>
                            • {macros.protein}g Protein
                        </Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.listTxt}>
                            • {macros.carbs}g Carbs
                        </Text>
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
    ingredientNameTxt: {
        fontWeight: "bold",
        fontSize: 18,
    },
    servingTxt: {
        fontSize: 18,
        paddingLeft: 10,
    },
    listTxt: {
        fontSize: 18,
        paddingLeft: 25,
    },
});

export default IngredientWidget;
