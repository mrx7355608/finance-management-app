import { Dispatch, memo, SetStateAction } from "react";
import { View, StyleSheet } from "react-native";
import ExpenseForm from "./ExpenseForm";
import { IExpense } from "@/utils/types";

type Props = {
    expenses: IExpense[];
    setExpenses: Dispatch<SetStateAction<IExpense[]>>;
};

function ExpenseList({ expenses, setExpenses }: Props) {
    /*
     * Updates the "item" property of expense object using index inside
     * "expenses" array. The "expenses" array is stored in state
     * This function does not trigger re-render because it
     * mutates the array instead of replacing it with the new
     * array
     * Following traditional way of updating states caused re-render issues
     * like, when user types in something on ExpenseForm, on each keypress it was
     * doint alot of un-necessary re-renders
     * onChangeText --> triggers a re-render --> Whole expenses array is re-rendered
     * Learn more: https://react.dev/learn/updating-arrays-in-state
     */
    const updateItemReference = (index: number, item: string) => {
        setExpenses(() => {
            expenses[index].item = item;
            return expenses;
        });
    };

    /*
     * Same as above function
     */
    const updateAmountReference = (index: number, amount: number) => {
        setExpenses(() => {
            expenses[index].amount_spent = amount;
            return expenses;
        });
    };

    const updateFunctions = {
        updateItemReference,
        updateAmountReference,
    };

    return (
        <View>
            {expenses.map((exp, index) => {
                return (
                    <ExpenseForm
                        key={index}
                        index={index}
                        expense={exp}
                        updateFunctions={updateFunctions}
                    />
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        width: "90%",
        padding: 5,
        borderRadius: 6,
    },
    icon: {
        color: "white",
    },
    text: {
        color: "white",
        fontWeight: 500,
    },
});

export default memo(ExpenseList);
