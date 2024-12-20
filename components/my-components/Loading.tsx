import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Loading() {
    return (
        <View style={styles.container}>
            <Text style={styles.loading}>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    loading: {
        fontSize: 25,
        textAlign: "center",
        color: "white",
    },
    container: {
        display: "flex",
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
        width: "100%",
        padding: 5,
    },
});
