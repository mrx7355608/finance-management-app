import { View, StyleSheet } from "react-native";
import Input from "../Input";
import { useEffect } from "react";

type Props = {
    idx: number;
    setItem: (index: number, item: string) => void;
    setAmount: (index: number, amount: number) => void;
    item: string;
    amount: number;
};

export default function ExpenseForm({
    idx,
    item,
    amount,
    setItem,
    setAmount,
}: Props) {
    return (
        <View style={styles.container}>
            <Input
                placeholder="Item"
                onChangeText={(itm: string) => setItem(idx, itm)}
                value={item}
            />
            <Input
                placeholder="Amount"
                onChangeText={(amnt: number) => setAmount(idx, amnt)}
                value={String(amount)}
            />
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
