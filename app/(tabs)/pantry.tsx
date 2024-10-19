import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import { AllIngredientsImport } from "@/components/IngredientImport";
import { Ingredient } from "@/components/Ingredient";
import { Nutrition } from "@/components/Recipe";
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
    const [glutenFreeFilter, setGFFilter] = useState<boolean>(false);
    const [nutFreeFilter, setNutFilter] = useState<boolean>(false);
    const [dairyFreeFilter, setDfFilter] = useState<boolean>(false);
    const [veganFilter, setVeganFilter] = useState<boolean>(false);

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
        //const fetchIngredients = AllIngredientsImport();
        setIngredients(testIngredients);
    }, []);
    useEffect(() => {
        console.log(nutFreeFilter);
        filterList();
    }, [glutenFreeFilter, nutFreeFilter, dairyFreeFilter, veganFilter]);

    const filterList = () => {
        //let unFilteredIngredients = testIngredients;
        let unFilteredIngredients = AllIngredientsImport();
        let filteredIngredients = new Array<Ingredient>();

        unFilteredIngredients.forEach((ingredient) => {
            const glutenFreePass = glutenFreeFilter
                ? !ingredient.dietTag?.includes(1)
                : true;
            const veganPass = veganFilter
                ? !ingredient.dietTag?.includes(2)
                : true;
            const dairyFreePass = dairyFreeFilter
                ? !ingredient.dietTag?.includes(4)
                : true;
            const nutFreePass = nutFreeFilter
                ? !ingredient.dietTag?.includes(5)
                : true;

            if (glutenFreePass && veganPass && dairyFreePass && nutFreePass) {
                filteredIngredients.push(ingredient);
            }
        });

        setIngredients(filteredIngredients); // Return the filtered list
    };

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
                            <CheckBox
                                title="Vegetarian"
                                containerStyle={styles.checkBox}
                            />
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
            <ScrollView>
                {ingredients.map((ingredient) => (
                    <IngredientWidget
                        key={ingredient.id}
                        ingredient={ingredient}
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
