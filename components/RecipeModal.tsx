import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Pressable,
    Platform,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { ConvertMinsToHours } from "./RecipeImport";
import Fraction from "fraction.js";
import { ChangeInfoScale } from "./Scale";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { ImageSourcePropType } from "react-native";

import { Recipe, Serving } from "./Recipe";
import Toast from "react-native-toast-message";
import ShareModal from "./ShareModal";
import { saveRecipeToDevice } from "../components/DownloadAndShare";
import TimerModal from "../components/TimerModal";

interface RecipeModalProps {
    visible: boolean;
    recipe: Recipe | null;
    onClose: () => void;
}

const FractionDisplay: React.FC<{ value: number }> = ({ value }) => {
    const fraction = new Fraction(value);
    return <Text>{fraction.toFraction(true)}</Text>;
};

const iconSourceFiles: { [key: number]: ImageSourcePropType } = {
    1: require("../assets/images/glutenfree.png"),
    2: require("../assets/images/veganpro.png"),
    3: require("../assets/images/vegetarian.png"),
    4: require("../assets/images/dairyfree.png"),
    5: require("../assets/images/nutfree.png"),
};

const renderIcon = (tag: number) => {
    const imageSource = iconSourceFiles[tag];
    return <Image key={tag} style={styles.tinyLogo} source={imageSource} />;
};

type SectionKey =
    | "source"
    | "cookingTimes"
    | "nutrition"
    | "ingredients"
    | "instructions"
    | "primaryInfo";

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
        instructions: false,
        primaryInfo: true,
    };

    const [expandedSections, setExpandedSections] = useState(
        initialExpandedSections
    );

    let [servings, setServings] = useState(
        recipe ? recipe?.serving.servings : 4
    );
    let [thisRecipe, setThisRecipe] = useState(recipe);
    const [shareModal, setShareModal] = useState<boolean>(false);
    const [showTimer, setShowTimer] = useState<boolean>(false);
    const [timerMinutes, setTimerMinutes] = useState<number | null>(0);

    useEffect(() => {
        if (recipe) {
            setServings(recipe.serving.servings);
            setThisRecipe(recipe);
        }
    }, [recipe]);
    useEffect(() => {
        if (timerMinutes !== 0) {
            setShowTimer(true);
        }
    }, [timerMinutes]);

    const toggleSection = (section: SectionKey) => {
        setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const handleClose = () => {
        setExpandedSections(initialExpandedSections);
        onClose();
    };

    const onScaleChange = (serv: any) => {
        if (recipe != null && recipe.serving.servings) {
            setServings(serv);

            if (!serv) {
                serv = recipe.serving.servings;
            }
            thisRecipe = ChangeInfoScale(
                recipe,
                serv / +recipe.serving.servings
            );
            setThisRecipe(thisRecipe);
        }
    };

    const downloadRecipe = async () => {
        await saveRecipeToDevice(thisRecipe!);
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
                            <Pressable
                                onPress={handleClose}
                                style={styles.closeButton}
                            >
                                <Ionicons
                                    name="close"
                                    size={24}
                                    color="black"
                                />
                            </Pressable>
                        </View>
                        <View style={styles.headerContainer}>
                            <StarRatingDisplay
                                rating={parseFloat(recipe.rating)}
                                color="#f7931e"
                                starSize={20}
                            />
                            <Text style={styles.ratingText}>
                                {recipe.rating}
                            </Text>
                            <View style={styles.tagContainer}>
                                {Object.entries(iconSourceFiles).map(
                                    ([key]) => {
                                        const tag = Number(key);
                                        return !recipe.dietTag?.includes(tag)
                                            ? renderIcon(tag)
                                            : null;
                                    }
                                )}
                            </View>
                        </View>
                        <ScrollView
                            contentContainerStyle={styles.scrollViewContent}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        >
                            {/* Primary Info Section */}
                            <Pressable
                                // onPress={() => toggleSection("primaryInfo")}
                                style={styles.card}
                            >
                                {expandedSections.primaryInfo && (
                                    <>
                                        <View>
                                            <View style={styles.row}>
                                                <View style={styles.column}>
                                                    {recipe.time.bakeTime !=
                                                        null && (
                                                        <View
                                                            style={styles.row}
                                                        >
                                                            <Text
                                                                style={
                                                                    styles.sectionText
                                                                }
                                                            >
                                                                Bake Time:{" "}
                                                                {ConvertMinsToHours(
                                                                    recipe.time
                                                                        .bakeTime
                                                                )}
                                                            </Text>
                                                        </View>
                                                    )}

                                                    {recipe.time.cookTime !=
                                                        null && (
                                                        <View
                                                            style={styles.row}
                                                        >
                                                            <TouchableOpacity
                                                                onPress={() =>
                                                                    setTimerMinutes(
                                                                        recipe
                                                                            .time
                                                                            .cookTime
                                                                    )
                                                                }
                                                            >
                                                                <Text
                                                                    style={
                                                                        styles.sectionText
                                                                    }
                                                                >
                                                                    Cook Time:{" "}
                                                                    {ConvertMinsToHours(
                                                                        recipe
                                                                            .time
                                                                            .cookTime
                                                                    )}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    )}
                                                    {recipe.time.prepTime !=
                                                        null && (
                                                        <View
                                                            style={styles.row}
                                                        >
                                                            <TouchableOpacity
                                                                onPress={() =>
                                                                    setTimerMinutes(
                                                                        recipe
                                                                            .time
                                                                            .prepTime
                                                                    )
                                                                }
                                                            >
                                                                <Text
                                                                    style={
                                                                        styles.sectionText
                                                                    }
                                                                >
                                                                    Prep Time:{" "}
                                                                    {ConvertMinsToHours(
                                                                        recipe
                                                                            .time
                                                                            .prepTime
                                                                    )}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    )}
                                                    {recipe.time.totalTime !=
                                                        null && (
                                                        <View
                                                            style={styles.row}
                                                        >
                                                            <TouchableOpacity
                                                                onPress={() =>
                                                                    setTimerMinutes(
                                                                        recipe
                                                                            .time
                                                                            .totalTime
                                                                    )
                                                                }
                                                            >
                                                                <Text
                                                                    style={
                                                                        styles.sectionText
                                                                    }
                                                                >
                                                                    Total Time:{" "}
                                                                    {ConvertMinsToHours(
                                                                        recipe
                                                                            .time
                                                                            .totalTime
                                                                    )}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    )}
                                                    <View style={styles.row}>
                                                        <Text
                                                            style={
                                                                styles.sectionText
                                                            }
                                                        >
                                                            Serves:{" "}
                                                        </Text>
                                                        <TextInput
                                                            style={
                                                                styles.inputText
                                                            }
                                                            keyboardType="numeric"
                                                            value={String(
                                                                servings
                                                            )}
                                                            onChangeText={
                                                                onScaleChange
                                                            }
                                                            placeholder={String(
                                                                recipe.serving
                                                                    .servings
                                                            )}
                                                        />
                                                    </View>

                                                    <View
                                                        style={
                                                            styles.nutritionContainer
                                                        }
                                                    >
                                                        <View
                                                            style={styles.row}
                                                        >
                                                            <View
                                                                style={
                                                                    styles.column
                                                                }
                                                            >
                                                                <Text
                                                                    style={
                                                                        styles.servingTxt
                                                                    }
                                                                >
                                                                    Per Serving:
                                                                </Text>
                                                                <View>
                                                                    <View
                                                                        style={
                                                                            styles.row
                                                                        }
                                                                    >
                                                                        <View
                                                                            style={
                                                                                styles.column
                                                                            }
                                                                        >
                                                                            <Text
                                                                                style={
                                                                                    styles.listTxt
                                                                                }
                                                                            >
                                                                                •{" "}
                                                                                {recipe
                                                                                    .nutrition
                                                                                    .calories ===
                                                                                null
                                                                                    ? "N/A"
                                                                                    : recipe
                                                                                          .nutrition
                                                                                          .calories}{" "}
                                                                                Calories
                                                                            </Text>
                                                                        </View>
                                                                        <View
                                                                            style={
                                                                                styles.column
                                                                            }
                                                                        >
                                                                            <Text
                                                                                style={
                                                                                    styles.listTxt
                                                                                }
                                                                            >
                                                                                •{" "}
                                                                                {recipe
                                                                                    .nutrition
                                                                                    .fat ===
                                                                                null
                                                                                    ? "N/A"
                                                                                    : recipe
                                                                                          .nutrition
                                                                                          .fat}

                                                                                g
                                                                                Fat
                                                                            </Text>
                                                                        </View>
                                                                    </View>
                                                                    <View
                                                                        style={
                                                                            styles.row
                                                                        }
                                                                    >
                                                                        <View
                                                                            style={
                                                                                styles.column
                                                                            }
                                                                        >
                                                                            <Text
                                                                                style={
                                                                                    styles.listTxt
                                                                                }
                                                                            >
                                                                                •{" "}
                                                                                {recipe
                                                                                    .nutrition
                                                                                    .protein ===
                                                                                null
                                                                                    ? "N/A"
                                                                                    : recipe
                                                                                          .nutrition
                                                                                          .protein}

                                                                                g
                                                                                Protein
                                                                            </Text>
                                                                        </View>
                                                                        <View
                                                                            style={
                                                                                styles.column
                                                                            }
                                                                        >
                                                                            <Text
                                                                                style={
                                                                                    styles.listTxt
                                                                                }
                                                                            >
                                                                                •{" "}
                                                                                {recipe
                                                                                    .nutrition
                                                                                    .carbs ===
                                                                                null
                                                                                    ? "N/A"
                                                                                    : recipe
                                                                                          .nutrition
                                                                                          .carbs}

                                                                                g
                                                                                Carbs
                                                                            </Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </>
                                )}
                            </Pressable>

                            {/* Ingredients Section */}
                            <Pressable
                                onPress={() => toggleSection("ingredients")}
                                style={styles.card}
                            >
                                <Text style={styles.sectionTitle}>
                                    Ingredients:
                                </Text>
                                {expandedSections.ingredients && (
                                    <>
                                        {thisRecipe?.recipeIngredients.map(
                                            (ing) => (
                                                <Text
                                                    key={ing.id}
                                                    style={styles.sectionText}
                                                >
                                                    {ing.unit != null ? (
                                                        <>
                                                            {` • `}
                                                            <FractionDisplay
                                                                value={
                                                                    ing.quantity
                                                                }
                                                            />
                                                            {` ${ing.unit} ${ing.name}`}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {` • `}
                                                            <FractionDisplay
                                                                value={
                                                                    ing.quantity
                                                                }
                                                            />
                                                            {` ${ing.name}`}
                                                        </>
                                                    )}
                                                </Text>
                                            )
                                        )}
                                    </>
                                )}
                            </Pressable>

                            {/* Instructions Section */}
                            <Pressable
                                onPress={() => toggleSection("instructions")}
                                style={styles.card}
                            >
                                <Text style={styles.sectionTitle}>
                                    Instructions:
                                </Text>
                                {expandedSections.instructions && (
                                    <>
                                        {recipe.instructions.map(
                                            (step, index) => (
                                                <Text
                                                    key={index}
                                                    style={styles.sectionText}
                                                >{`${index + 1}. ${step}`}</Text>
                                            )
                                        )}
                                    </>
                                )}
                            </Pressable>

                            {/* Source Section */}
                            <Pressable
                                onPress={() => toggleSection("source")}
                                style={styles.card}
                            >
                                <Text style={styles.sectionTitle}>Source:</Text>
                                {expandedSections.source && (
                                    <Text style={styles.sectionText}>
                                        {recipe.url}
                                    </Text>
                                )}
                            </Pressable>
                        </ScrollView>
                        {/* Bottom Buttons */}
                        <ShareModal
                            visible={shareModal}
                            recipe={thisRecipe!}
                            onClose={() => setShareModal(false)}
                        />

                        <View style={styles.bottomButtonContainer}>
                            {/* Share Button */}
                            <Pressable onPress={() => setShareModal(true)}>
                                <Ionicons
                                    name={"share"}
                                    size={24}
                                    color="black"
                                />
                            </Pressable>
                            {/* Download Button */}

                            <Pressable
                                onPress={() => downloadRecipe()}
                                // todo - find download function and call it here
                                // onPress={() => }
                            >
                                <Ionicons
                                    name={"download"}
                                    size={24}
                                    color="black"
                                />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
            <TimerModal
                visible={showTimer}
                time={timerMinutes}
                onCancel={() => {
                    setShowTimer(false);
                    setTimerMinutes(0);
                }}
            />
            <Toast />
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
        fontSize: 30,
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
    ratingText: {
        fontSize: 16,
        marginLeft: 10, // Indent for subtext
        //alignSelf: "flex-start",
        //textAlign: "left",
    },
    inputText: {
        fontSize: 16,
        marginLeft: 10, // Indent for subtext
        // marginTop: 2,
        // padding: 3,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
    },
    tinyLogo: {
        width: 35,
        height: 35,
    },
    tagContainer: {
        flexDirection: "row-reverse",
    },
    row: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    column: {
        flex: 1,
    },
    bottomButtonContainer: {
        flexDirection: "row",

        alignSelf: "flex-end",
    },
    nutritionContainer: {
        //position: "absolute",
        //top: 40,
        //left: 20,
        width: "100%",
    },
    servingTxt: {
        fontSize: 16,
        paddingLeft: 10,
    },
    listTxt: {
        fontSize: 16,
        paddingLeft: 25,
    },
});

export default RecipeModal;
