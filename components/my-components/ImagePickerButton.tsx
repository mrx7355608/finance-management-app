import React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    setImage: (uri: string) => void;
};

export default function ImagePickerButton({ setImage }: Props) {
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        } else {
            alert("You did not select any image.");
        }
    };

    return (
        <Pressable style={styles.button} onPress={pickImageAsync}>
            <Ionicons name="camera-sharp" size={20} style={styles.buttonIcon} />
            <Text style={styles.buttonLabel}>Select an image</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "90%",
        height: 50,
        backgroundColor: "#11111b",
        marginBottom: 15,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    buttonIcon: {
        color: "white",
        paddingRight: 20,
    },
    buttonLabel: {
        color: "white",
    },
});
