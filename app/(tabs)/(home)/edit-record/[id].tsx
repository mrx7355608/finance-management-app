import { setRefetch } from "@/refetch";
import { useState, useEffect, useCallback } from "react";
import { RecordsData } from "@/db/RecordsData";
import {
    IRecord,
    IExpense,
    IUpdateExpense,
    IExpenseInputData,
} from "@/utils/types";
import { ExpenseList } from "@/components/my-components/expenses";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { Text, View, ScrollView, StyleSheet, Pressable } from "react-native";
import { ExpenseData } from "@/db/ExpenseData";
import { Ionicons } from "@expo/vector-icons";
import {
    ImageViewer,
    ImagePickerButton,
    Button,
    Input,
    Error,
    Loading,
} from "@/components/my-components";

const recordsDB = new RecordsData();
const expensesDB = new ExpenseData();

export default function EditRecord() {
    const navigation = useNavigation();
    const { id } = useLocalSearchParams();
    const [record, setRecord] = useState<IRecord | undefined>(undefined);
    const [loading, setLoading] = useState<Boolean>(true);
    const [expenses, setExpenses] = useState<IUpdateExpense[]>([]);

    const setMemoizedExpenses = useCallback(setExpenses, [expenses]);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {
            const data = await recordsDB.getOne(Number(id));
            let data2 = await expensesDB.getAll(Number(id));
            setRecord(data);

            data2 = data2.map((exp) => ({ ...exp, edited: false }));
            setExpenses(data2 as any);
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

    const logExpenses = () => {
        const expensesToInsert = expenses.filter((exp) => exp.id == undefined);
        let expensesToEdit = expenses.filter((exp) => exp.edited == true);
        expensesToEdit = expensesToEdit.map((exp) => {
            delete exp.edited;
            return exp;
        });
        console.log({ expensesToInsert });
        console.log({ expensesToEdit });
        return { expensesToEdit, expensesToInsert };
    };

    // FIXME: fix ``as any`` here
    const updateRecordAsync = async () => {
        try {
            const { expensesToInsert, expensesToEdit } = logExpenses();

            await recordsDB.update(record.id, record as any);
            if (expensesToEdit.length > 0) {
                expensesToEdit.forEach(async (exp) => {
                    await expensesDB.update(exp.id!, exp);
                });
            }
            if (expensesToInsert.length > 0) {
                await expensesDB.insert(
                    expensesToInsert as IExpenseInputData[],
                );
            }
            setRefetch(true);
            alert("Updated successfully");
        } catch (err) {
            console.log(err);
            alert("ERROR, cannot update record");
        }
    };

    const addExpenseUI = () => {
        const newExpense = {
            item: "",
            amount_spent: 0,
            record: Number(id),
        };
        setExpenses([...expenses, newExpense]);
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
                {/* //FIXME: fix types */}
                <ExpenseList
                    expenses={expenses as any}
                    setExpenses={setMemoizedExpenses as any}
                />
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
