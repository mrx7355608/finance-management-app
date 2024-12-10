import React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";

type Props = {
    source: string;
};

export default function Record({ source }: Props) {
    return (
        <View style={styles.container}>
            <Image source={source} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
    },
    image: {
        width: "90%",
        height: 150,
        borderRadius: 18,
        marginBottom: 20,
    },
});
