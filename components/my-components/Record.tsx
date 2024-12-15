import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    id: number;
    source: string;
};

export default function Record({ id, source }: Props) {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Image source={source} style={styles.image} />

            {/* MENU */}
            <View style={styles.container2}>
                {/* VIEW BUTTON */}
                <Pressable
                    style={styles.button}
                    onPress={() => router.navigate(`/view-record/${id}`)}
                >
                    <Ionicons name="eye" size={15} style={styles.icon} />
                    <Text style={styles.text}>View</Text>
                </Pressable>

                {/* EDIT BUTTON */}
                <Pressable
                    style={styles.button}
                    onPress={() => router.navigate(`/edit-record/${id}`)}
                >
                    <Ionicons name="pencil" size={15} style={styles.icon} />
                    <Text style={styles.text}>Edit</Text>
                </Pressable>

                {/* DELETE BUTTON */}
                <Pressable style={styles.button}>
                    <Ionicons name="trash-bin" size={15} style={styles.icon} />
                    <Text style={styles.text}>Delete</Text>
                </Pressable>
            </View>
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
    container2: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        width: "90%",
        marginBottom: 35,
    },
    image: {
        width: "90%",
        height: 150,
        borderRadius: 18,
        marginBottom: 8,
    },
    button: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        margin: 3,
        padding: 4,
        borderRadius: 5,
        backgroundColor: "#2d2d2d",
        height: 35,
    },
    text: {
        textAlign: "center",
        color: "white",
        fontWeight: 500,
    },
    icon: {
        color: "white",
        paddingRight: 5,
    },
});
