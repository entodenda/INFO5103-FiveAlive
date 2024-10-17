import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import { AllIngredientsImport } from "@/components/IngredientImport";
import { Ingredient } from "@/components/Ingredient";
import IngredientWidget from "@/components/IngredientWidget";
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { CheckBox } from "react-native-elements";

export default function PantryScreen() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [filtersVisible, setFiltersVisible] = useState<boolean>(false);

    useEffect(() => {
        const fetchIngredients = AllIngredientsImport();
        setIngredients(fetchIngredients);
    }, []);

    const handleAddClick = () => {
        Toast.show({
            type: "info",
            text1: "Add button clicked!",
            position: "bottom",
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerRow}>
                    <TouchableOpacity
                        onPress={() => setFiltersVisible(!filtersVisible)}
                    >
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
                                containerStyle={styles.checkBox}
                            />
                            <CheckBox
                                title="Vegan"
                                containerStyle={styles.checkBox}
                            />
                            <CheckBox
                                title="Vegetarian"
                                containerStyle={styles.checkBox}
                            />
                        </View>
                        <View style={styles.checkBoxRow}>
                            <CheckBox
                                title="Nut Free"
                                containerStyle={styles.checkBox}
                            />
                            <CheckBox
                                title="Dairy Free"
                                containerStyle={styles.checkBox}
                            />
                        </View>
                    </View>
                )}
            </View>
            <ScrollView>
                {ingredients.map((ingredient) => (
                    <IngredientWidget
                        key={ingredient.id}
                        name={ingredient.name}
                        macros={ingredient.macros!}
                    />
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
