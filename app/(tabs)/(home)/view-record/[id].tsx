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

export default function Edit() {
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

            const data2 = await db
                .select()
                .from(expensesSchema)
                .where(eq(expensesSchema.record, Number(id)));

            setRecord(data[0]);
            setExpenses(data2);
            console.log(data2);
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

    return (
        <ScrollView>
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
                        <Text style={styles.text}>Rs.{exp.amount_spent}/</Text>
                    </View>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        backgroundColor: "#25292e",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#fff",
        fontWeight: "regular",
    },
    expenses: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 5,
    },
    error: {
        fontSize: 25,
        color: "red",
        fontWeight: 600,
        textAlign: "center",
    },
});
