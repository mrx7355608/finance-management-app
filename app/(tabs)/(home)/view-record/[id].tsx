import { useState, useEffect } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import ImageViewer from "@/components/my-components/ImageViewer";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { setupDb } from "@/db/setup-db";
import { expensesSchema, recordsSchema } from "@/db/schema";
import { eq } from "drizzle-orm";

interface IRecord {
    id: number;
    bought_price: number;
    sold_price: number | null;
    image: string;
}

interface IExpense {
    id: number;
    item: string;
    amount_spent: number;
    record: number | null;
}

export default function ViewRecord() {
    const { id } = useLocalSearchParams();
    const [record, setRecord] = useState<IRecord | undefined>(undefined);
    const [expenses, setExpenses] = useState<IExpense[]>([]);
    const navigation = useNavigation();
    const db = setupDb();

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {
            const data = await db
                .select()
                .from(recordsSchema)
                .where(eq(recordsSchema.id, Number(id)));

            if (!data[0]) {
                return;
            }

            const data2 = await db
                .select()
                .from(expensesSchema)
                .where(eq(expensesSchema.record, Number(id)));

            setRecord(data[0]);
            setExpenses(data2);
        });

        return unsubscribe;
    }, []);

    if (!record) {
        return (
            <View>
                <Text style={styles.error}>Record not found</Text>
            </View>
        );
    }

    const calculateProfit = () => {
        const totalExpenses = expenses.reduce(
            (total, exp) => total + exp.amount_spent,
            0,
        );
        const totalAmountSpent = totalExpenses + record.bought_price;
        const soldAmount = record.sold_price || 0;
        const profit = soldAmount - totalAmountSpent;
        return profit;
    };

    const calculateTotalExpense = () => {
        const totalExpenses = expenses.reduce(
            (total, exp) => total + exp.amount_spent,
            0,
        );
        const totalAmountSpent = totalExpenses + record.bought_price;
        return totalAmountSpent;
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <ImageViewer image={record.image} />
                <View style={styles.expenses}>
                    <Text style={styles.text}>Bought Price:</Text>
                    <Text style={styles.text}>Rs.{record.bought_price}/</Text>
                </View>
                <View style={styles.expenses}>
                    <Text style={styles.text}>Sold Price:</Text>
                    <Text style={styles.text}>Rs.{record.sold_price}/</Text>
                </View>
                {expenses.map((exp) => {
                    return (
                        <View key={exp.id} style={styles.expenses}>
                            <Text style={styles.text}>{exp.item}</Text>
                            <Text style={styles.text}>
                                Rs.{exp.amount_spent}/
                            </Text>
                        </View>
                    );
                })}
                <View style={styles.divider}></View>
                <View style={styles.expenses}>
                    <Text style={styles.text}>Total Expense:</Text>
                    <Text style={styles.text}>
                        Rs.{calculateTotalExpense()}/
                    </Text>
                </View>
                <View style={styles.expenses}>
                    <Text style={styles.text}>Profit:</Text>
                    <Text style={styles.text}>Rs.{calculateProfit()}/</Text>
                </View>
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
    error: {
        fontSize: 25,
        color: "red",
        fontWeight: 600,
        textAlign: "center",
    },
    divider: {
        width: "90%",
        borderBottomColor: "#3d3d3d",
        borderBottomWidth: 1,
    },
});
