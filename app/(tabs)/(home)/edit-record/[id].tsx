import { eq } from "drizzle-orm";
import { setRefetch } from "@/refetch";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { RecordsData } from "@/db/RecordsData";
import { IRecord, IExpenseInputData } from "@/utils/types";
import { ExpenseForm } from "@/components/my-components/expenses";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { Text, View, ScrollView, StyleSheet, Pressable } from "react-native";
import {
    ImageViewer,
    ImagePickerButton,
    Button,
    Input,
    Error,
    Loading,
} from "@/components/my-components";
import { ExpenseData } from "@/db/ExpenseData";

const recordsDB = new RecordsData();
const expensesDB = new ExpenseData();

export default function EditRecord() {
    const navigation = useNavigation();
    const { id } = useLocalSearchParams();
    const [record, setRecord] = useState<IRecord | undefined>(undefined);
    const [loading, setLoading] = useState<Boolean>(true);
    const [expenseUI, setExpenseUI] = useState<string[]>([]);
    const [expenses, setExpenses] = useState<IExpenseInputData[]>([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {
            const data = await recordsDB.getOne(Number(id));
            setRecord(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (!record) {
        return <Error message="Record not found" />;
    }

    const setImage = (newImage: string) => {
        setRecord({ ...record, image: newImage });
    };
    const setBoughtPrice = (newPrice: number) => {
        setRecord({ ...record, bought_price: newPrice });
    };
    const setSoldPrice = (newPrice: number) => {
        setRecord({ ...record, sold_price: newPrice });
    };

    const addExpenseUI = () => {
        setExpenseUI([...expenseUI, ""]);
        const newExpense = {
            item: "",
            amount_spent: 0,
            record: record.id,
        };
        setExpenses([...expenses, newExpense]);
    };

    const updateRecordAsync = async () => {
        try {
            console.log("updating...");

            // FIXME: fix ``as any`` here
            await recordsDB.update(record.id, record as any);
            setRefetch(true);

            if (expenses.length > 0) {
                await expensesDB.insert(expenses);
            }
            alert("Updated successfully");
        } catch (err) {
            console.log(err);
            alert("ERROR, cannot update record");
        }
    };

    const logExpenses = () => console.log({ expenses });

    const registerExpense = (index: number, item: string, amount: number) => {
        setExpenses(() => {
            expenses[index].item = item;
            expenses[index].amount_spent = amount;
            return expenses;
        });
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {record.image && <ImageViewer image={record.image} />}
                <ImagePickerButton setImage={setImage} />
                <Input
                    placeholder="Bought price"
                    onChangeText={(price: number) => setBoughtPrice(price)}
                    value={String(record.bought_price)}
                />
                <Input
                    placeholder="Sold price"
                    onChangeText={(price: number) => setSoldPrice(price)}
                    value={String(record.sold_price)}
                />
                <Text style={styles.heading}>Add Expenses</Text>
                {expenseUI.map((_x, index) => {
                    return (
                        <ExpenseForm
                            key={index}
                            idx={index}
                            registerExpense={registerExpense}
                        />
                    );
                })}
                <Pressable style={styles.button} onPress={addExpenseUI}>
                    <Ionicons name="add-circle" size={20} style={styles.icon} />
                    <Text style={styles.text}>Add</Text>
                </Pressable>
                <Button label="Update" onPress={updateRecordAsync} />
                <Button label="Test" onPress={logExpenses} />
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
    error: {
        fontSize: 25,
        color: "red",
        fontWeight: 600,
        textAlign: "center",
    },
    heading: {
        fontWeight: 500,
        width: "100%",
        textAlign: "left",
        fontSize: 20,
        marginTop: 10,
        marginBottom: 5,
        color: "white",
    },
    button: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        width: "90%",
        padding: 5,
        borderRadius: 6,
    },
    text: {
        color: "white",
        fontWeight: 500,
    },
    icon: {
        color: "white",
    },
});
