import { useState, useEffect } from "react";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { View, ScrollView, StyleSheet } from "react-native";
import { Error, ImageViewer } from "@/components/my-components";
import { ExpenseItem } from "@/components/my-components/expenses";
import { RecordsData } from "@/db/RecordsData";
import { calculateProfit, calculateTotalExpense } from "@/utils/stats";
import { IRecord, IExpense } from "@/utils/types";
import { ExpenseData } from "@/db/ExpenseData";

const recordsDB = new RecordsData();
const expensesDB = new ExpenseData();

export default function ViewRecord() {
    const { id: recordID } = useLocalSearchParams();
    const [record, setRecord] = useState<IRecord | undefined>(undefined);
    const [expenses, setExpenses] = useState<IExpense[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {
            const data = await recordsDB.getOne(Number(recordID));
            setRecord(data);
            const data2 = await expensesDB.getAll(Number(recordID));
            setExpenses(data2 as any);
        });

        return () => unsubscribe();
    }, []);

    if (!record) {
        return <Error message="Record not found" />;
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <ImageViewer image={record.image} />
                <ExpenseItem
                    item="Bought Price:"
                    amount={record.bought_price}
                />
                {expenses.map((exp) => {
                    return (
                        <ExpenseItem
                            key={exp.id}
                            item={exp.item}
                            amount={exp.amount_spent}
                        />
                    );
                })}
                <View style={styles.divider}></View>
                <ExpenseItem
                    item="Total Expenses: "
                    amount={calculateTotalExpense(expenses, record)}
                />
                <ExpenseItem
                    item="Sold Price:"
                    amount={record.sold_price || 0}
                />
                <View style={styles.divider}></View>
                <ExpenseItem
                    item="Proft: "
                    amount={calculateProfit(expenses, record)}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
        width: "100%",
        padding: 5,
    },
    text: {
        color: "#fff",
        fontWeight: "regular",
        marginTop: 5,
        marginBottom: 5,
    },
    expenses: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "90%",
    },
    divider: {
        width: "90%",
        borderBottomColor: "#3d3d3d",
        borderBottomWidth: 1,
    },
});
