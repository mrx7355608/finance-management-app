import { Dispatch, memo, SetStateAction } from "react";
import { View, StyleSheet } from "react-native";
import ExpenseForm from "./ExpenseForm";
import { IUpdateExpense } from "@/utils/types";

type Props = {
    expenses: IUpdateExpense[];
    setExpenses: Dispatch<SetStateAction<IUpdateExpense[]>>;
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
            if (expenses[index].edited !== undefined) {
                expenses[index].edited = true;
            }
            return expenses;
        });
    };

    /*
     * Same as above function
     */
    const updateAmountReference = (index: number, amount: number) => {
        setExpenses(() => {
            expenses[index].amount_spent = amount;
            if (expenses[index].edited !== undefined) {
                expenses[index].edited = true;
            }
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

export default memo(ExpenseList);
