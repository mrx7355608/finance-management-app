import { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Input from "../Input";
import { Ionicons } from "@expo/vector-icons";

export default function ExpenseForm({
    idx,
    registerExpense,
}: {
    idx: number;
    registerExpense: (index: number, item: string, amount: number) => void;
}) {
    const [item, setItem] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);

    return (
        <View style={styles.container}>
            <Input
                placeholder="Item"
                onChangeText={(itm: string) => setItem(itm)}
                value={item}
            />
            <Input
                placeholder="Amount"
                onChangeText={(amnt: number) => setAmount(amnt)}
                value={amount}
            />
            <Pressable
                style={{ backgroundColor: "blue" }}
                onPress={() => registerExpense(idx, item, amount)}
            >
                <Ionicons
                    name="checkmark"
                    size={15}
                    style={{ color: "white" }}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        width: "100%",
        rowGap: 4,
    },
});
