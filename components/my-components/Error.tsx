import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function Error({ message }: { message: string }) {
    return (
        <View>
            <Text style={styles.error}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    error: {
        fontSize: 25,
        color: "red",
        fontWeight: 600,
        textAlign: "center",
    },
});
