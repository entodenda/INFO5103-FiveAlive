import * as MailComposer from "expo-mail-composer";
import Toast from "react-native-toast-message";
import { Recipe } from "./Recipe";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { sendFeedbackEmail } from "./DownloadAndShare";

interface ContactFormModalProps {
  visible: boolean;
  onClose: () => void;
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({
  visible,
  onClose,
}) => {
  const [nameInput, setNameInput] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [feedbackInput, setFeedbackInput] = useState<string>("");
  const [feedbackError, setFeedbackError] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(true);
  const [sentText, setSentText] = useState<boolean>(false);

  useEffect(() => {
    if (!nameInput) {
      setNameError("Name is required");
      setIsError(true);
    } else {
      setNameError("");
      setIsError(false);
    }

    if (!emailInput) {
      setEmailError("Email is required");
      setIsError(true);
    } else if (!/\S+@\S+\.\S+/.test(emailInput)) {
      setEmailError("Invalid email");
      setIsError(true);
    } else {
      setEmailError("");
      setIsError(false);
    }

    if (!feedbackInput) {
      setFeedbackError("Feedback is required");
      setIsError(true);
    } else {
      setFeedbackError("");
      setIsError(false);
    }
  }, [nameInput, emailInput, feedbackInput]);

  const handleOnSendEmail = async () => {
    await sendFeedbackEmail(nameInput, feedbackInput, emailInput);
    setSentText(true);
    setNameInput("");
    setEmailInput("");
    setFeedbackInput("");
  };

  return (
    <Modal visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.title}>Contact Form</Text>
            <Pressable
              onPress={() => {
                setSentText(false);
                onClose();
              }}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="black" />
            </Pressable>
          </View>
          {!sentText ? (
            <>
              <View style={styles.section}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="enter name"
                  value={nameInput}
                  onChangeText={(value) => setNameInput(value)}
                />
                <Text style={styles.error}>{nameError}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="enter email"
                  value={emailInput}
                  onChangeText={(value) => setEmailInput(value)}
                />
                <Text style={styles.error}>{emailError}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.label}>Feedback:</Text>
                <TextInput
                  style={styles.feedbackInput}
                  placeholder="enter detailed information"
                  numberOfLines={8}
                  multiline
                  maxLength={250}
                  value={feedbackInput}
                  onChangeText={(value) => setFeedbackInput(value)}
                />
                <Text style={styles.error}>{feedbackError}</Text>
              </View>
              <Pressable
                disabled={isError}
                onPress={() => handleOnSendEmail()}
                style={styles.send}
              >
                <Text style={styles.sendTitle}>Send</Text>
                <Ionicons name="send" size={24} color="white" />
              </Pressable>
            </>
          ) : (
            <Text style={styles.emailSent}>Thank you for your feedback!</Text>
          )}
        </View>
      </View>
      <Toast />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
  closeButton: {
    position: "absolute",
    top: 2,
    right: 2,
    padding: 3,
  },
  section: {
    marginTop: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#f9f9f9",
    marginBottom: 5,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#f9f9f9",
    marginBottom: 5,
    verticalAlign: "top",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
  },
  send: {
    backgroundColor: "black",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "35%",
    alignSelf: "center",
  },
  sendTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  emailSent: {
    fontSize: 18,
    textAlign: "center",
    color: "#5cb85c",
    marginTop: 20,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export { ContactFormModal };
