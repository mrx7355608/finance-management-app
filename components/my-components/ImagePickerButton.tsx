import React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  setSelectedImage: (uri: string) => void;
};

export default function ImagePickerButton({ setSelectedImage }: Props) {
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={pickImageAsync}>
        <Ionicons name="camera-sharp" size={20} style={styles.buttonIcon} />
        <Text style={styles.buttonLabel}>Select an image</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "90%",
    height: 200,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    width: "100%",
    height: "100%",
    backgroundColor: "#11111b",
    marginBottom: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIcon: {
    color: "white",
    paddingRight: 20,
  },
  buttonLabel: {
    color: "white",
  },
});
