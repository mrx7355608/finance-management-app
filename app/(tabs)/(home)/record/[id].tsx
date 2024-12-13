import { useState, useEffect } from "react";
import {
    TextInput,
    Pressable,
    Text,
    View,
    ScrollView,
    StyleSheet,
} from "react-native";
import ImageViewer from "@/components/my-components/ImageViewer";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { setupDb } from "@/db/setup-db";
import { expensesSchema, recordsSchema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Ionicons } from "@expo/vector-icons";

interface IRecord {
    id: number;
    bought_price: number;
    sold_price: number | null;
    image: string;
}

interface IExpense {
    item: string;
    amount_spent: number;
    record: number;
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
                .where(eq(recordsSchema.id, id as any));

            setRecord(data[0]);
        });

        return unsubscribe;
    }, []);

    if (!record) {
        return (
            <View>
                <Text style={styles.heading}>Record not found</Text>
            </View>
        );
    }

    const initializeNewExpense = () => {
        const newExpense = {
            item: "",
            amount_spent: 0,
            record: record.id,
        };
        setExpenses([...expenses, newExpense]);
    };

    const createExpense = async () => {
        try {
            await db.insert(expensesSchema).values(expenses);
            alert("Expenses added");
        } catch (err) {
            alert("ERROR, expense not created");
        }
    };

    return (
        <ScrollView>
            <ImageViewer image={record.image} />
            <Text style={styles.bold}>
                Bought Price:{" "}
                <Text style={styles.text}>{record.bought_price}</Text>
            </Text>
            <Text style={styles.bold}>
                Sold Price: <Text style={styles.text}>{record.sold_price}</Text>
            </Text>
            <Text style={styles.heading}>Add expenses</Text>
            {expenses.map(() => {
                return (
                    <View style={styles.expenseContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Item"
                            placeholderTextColor={"#fff"}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Amount spent"
                            placeholderTextColor={"#fff"}
                        />
                        <Pressable
                            style={styles.addExpenseButton}
                            onPress={createExpense}
                        >
                            <Ionicons
                                name="checkmark"
                                size={24}
                                style={styles.icon}
                            />
                        </Pressable>
                    </View>
                );
            })}

            <Pressable
                style={styles.outlineButton}
                onPress={initializeNewExpense}
            >
                <Text style={styles.btnText}>Add</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    outlineButton: {
        borderColor: "#fab387",
        borderWidth: 2,
        borderRadius: 8,
        padding: 12,
        width: "90%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    btnText: {
        color: "#fab387",
        textAlign: "center",
    },
    icon: {
        backgroundColor: "#fab387",
        color: "#fff",
    },
    container: {
        flex: 1,
        backgroundColor: "#25292e",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#fff",
        textAlign: "left",
        fontWeight: "regular",
    },
    bold: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "left",
        width: "90%",
        backgroundColor: "#11111b",
        padding: 12,
        borderRadius: 8,
        marginBottom: 4,
    },
    heading: {
        fontSize: 25,
        fontWeight: 500,
        color: "#fff",
        textAlign: "center",
        marginTop: 15,
    },
    input: {
        backgroundColor: "#181825",
        padding: 15,
        width: "35%",
        color: "white",
        borderRadius: 8,
        marginBottom: 8,
        marginRight: 8,
    },
    expenseContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
    },
    addExpenseButton: {
        width: "10%",
        color: "#fab387",
        borderRadius: 8,
        height: 50,
    },
});
