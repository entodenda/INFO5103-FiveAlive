import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Modal,
    Text,
    TouchableOpacity,
    Dimensions,
} from "react-native";

interface TimerModalProps {
    time: number | null;
    onCancel: () => void;
    visible: boolean;
}

const getRemaining = (time: number) => {
    const hours = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;

    return {
        hours: String(hours).padStart(2, "0"),
        mins: String(mins).padStart(2, "0"),
        secs: String(secs).padStart(2, "0"),
    };
};

const TimerModal: React.FC<TimerModalProps> = ({ time, visible, onCancel }) => {
    const [remainingSecs, setRemainingSecs] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const { hours, mins, secs } = getRemaining(remainingSecs);

    useEffect(() => {
        //Set the initial time.
        if (time) {
            setRemainingSecs(time * 60);
        }
    }, [time]);

    useEffect(() => {
        //Stop the timer if the model is cancelled.
        if (!visible) {
            setIsActive(false);
        }
    }, [visible]);

    useEffect(() => {
        // Timer logic plz do not touch if you care about my sanity.
        let interval: NodeJS.Timeout | null = null;
        console.log(remainingSecs);
        console.log(isActive);
        if (isActive) {
            interval = setInterval(() => {
                setRemainingSecs((prevSecs) => Math.max(prevSecs - 1, 0));
            }, 1000);
        } else {
            if (interval) clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, remainingSecs]);

    return (
        <Modal visible={visible}>
            <View style={styles.container}>
                <Text
                    style={styles.timeText}
                >{`${hours}:${mins}:${secs}`}</Text>

                <TouchableOpacity
                    onPress={() => setIsActive(!isActive)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        {isActive ? "Pause" : "Start"} Timer
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onCancel}
                    style={styles.cancelButton}
                >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default TimerModal;

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F0F0",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    button: {
        borderWidth: 10,
        borderColor: "#343434",
        width: width / 2,
        height: width / 2,
        borderRadius: width / 2,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 45,
        color: "#343434",
    },
    timeText: {
        fontSize: 50,
        fontWeight: "bold",
        marginBottom: 30,
    },
    cancelButton: {
        position: "absolute",
        top: 20,
        right: 20,
    },
    cancelButtonText: {
        fontSize: 16,
        color: "red",
        textDecorationLine: "underline",
    },
});
