import React from "react";
import { View, StyleSheet } from "react-native";
import ImageViewer from "./ImageViewer";

type Props = {
    source: string;
};

export default function Record({ source }: Props) {
    return (
        <View style={styles.container}>
            <ImageViewer selectedImage={source} />
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
});
