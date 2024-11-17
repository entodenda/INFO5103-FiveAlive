import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import { ThemedText } from "./ThemedText";

interface InfoModalProps {
  visible: boolean;
  text: string;
  onClose: () => void;
}

export function GetTip(): string {
    const tempTips: string[] = [];
    const tipFile = require("../assets/tips.json");
    tipFile.forEach(
        (element: {
            tip: string;
        }) => {
            tempTips.push(element.tip.toString())
        }
    )
    return tempTips[Math.floor(Math.random() * tempTips.length)];
}


const InfoModal: React.FC<InfoModalProps> = ({
  visible,
  text,
  onClose,
}) => {

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.translucentBackground}>
            <View style={styles.headerContainer}>
              <ThemedText type="title">Tip:</ThemedText>
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
            <ThemedText type="defaultSemiBold">{text}</ThemedText>
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
  },
});

export default InfoModal;
