import React from "react";
import { TextInput, StyleSheet } from "react-native";

type Props = {
  placeholder: string;
  onChangeText: (data: any) => void;
};

export default function Input({ placeholder, onChangeText }: Props) {
  return (
    <TextInput
      placeholderTextColor={"grey"}
      style={styles.input}
      placeholder={placeholder}
      onChangeText={onChangeText}
    ></TextInput>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#181825",
    padding: 15,
    width: "90%",
    color: "white",
    borderRadius: 8,
    marginBottom: 8,
  },
});
