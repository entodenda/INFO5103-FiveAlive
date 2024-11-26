import { useState } from "react";

import {
	Modal,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { ThemedText } from "./ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Recipe } from "./Recipe";
import { sendMessageWithEmail } from "./DownloadAndShare";

interface ShareModalProps {
	visible: boolean;
	recipe: Recipe;
	onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({
	visible,
	recipe,
	onClose,
}) => {
	const [shareEmail, setshareEmail] = useState<string>();

	const handleClose = () => {
		onClose();
	};
	const EmailHandler = (value: string) => {
		setshareEmail(value);
	};
	const onPressShare = (rec: Recipe) => {
		// call sharing function
		sendMessageWithEmail(rec, shareEmail!);
		setshareEmail("");
		onClose();
	};

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={visible}
		>
			<View style={styles.modalBackground}>
				<View style={styles.modalContainer}>
					<View style={styles.translucentBackground}>
						<View style={styles.headerContainer}>
							<ThemedText
								type="title"
								style={styles.headerText}
							>
								Share to email
							</ThemedText>
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
						<View>
							<TextInput
								placeholder="Email"
								style={styles.input}
								onChangeText={EmailHandler}
								value={shareEmail}
							></TextInput>
							<Pressable
								onPress={() => onPressShare(recipe)}
								style={[styles.btnContainer]}
							>
								<Text style={styles.btnText}>{"Share"}</Text>
							</Pressable>
						</View>
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
	translucentBackground: {
		backgroundColor: "rgba(255, 255, 255, 1)",
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
		marginLeft: 10,
		marginTop: 2,
		color: "black",
	},
	headerText: {
		color: "black",
	},
	btnContainer: {
		padding: 10,
		backgroundColor: "#007BFF",
		borderRadius: 5,
		alignItems: "center",
		alignSelf: "center",
		marginTop: 5,
		marginBottom: 40,
		//marginHorizontal: 50,
		width: "30%",
	},
	btnText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	input: {
		width: "80%",
		borderColor: "black",
		alignSelf: "center",
		borderWidth: 1,
		padding: 10,
		margin: 10,
	},
});

export default ShareModal;
