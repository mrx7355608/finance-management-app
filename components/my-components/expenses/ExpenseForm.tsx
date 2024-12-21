import { View, StyleSheet } from "react-native";
import Input from "../Input";
import { useState } from "react";
import { IUpdateExpense } from "@/utils/types";

type Props = {
    index: number;
    expense: IUpdateExpense;
    updateFunctions: {
        updateItemReference: (index: number, item: string) => void;
        updateAmountReference: (index: number, amount: number) => void;
    };
};

export default function ExpenseForm({
    index,
    expense,
    updateFunctions,
}: Props) {
    const [item, setItem] = useState(expense.item);
    const [amount, setAmount] = useState(expense.amount_spent);
    const { updateItemReference, updateAmountReference } = updateFunctions;
    console.log("renderin");

    return (
        <View style={styles.container}>
            <Input
                placeholder="Item"
                value={item}
                onChangeText={(value: string) => {
                    setItem(value);
                    updateItemReference(index, value);
                }}
            />
            <Input
                placeholder="Amount"
                value={String(amount)}
                onChangeText={(value: number) => {
                    setAmount(value);
                    updateAmountReference(index, value);
                }}
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
