import { currencyFormat } from "@/utils/convert-currency";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function ExpenseItem({
    item,
    amount,
}: {
    item: string;
    amount: number;
}) {
    return (
        <View style={styles.expense}>
            <Text style={styles.text}>{item}</Text>
            <Text style={styles.text}>{currencyFormat(amount)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    expense: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "90%",
    },
    text: {
        color: "#fff",
        fontWeight: "regular",
        marginTop: 5,
        marginBottom: 5,
    },
});
