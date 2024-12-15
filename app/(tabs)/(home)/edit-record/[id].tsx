import { useState, useEffect } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { useNavigation, useLocalSearchParams } from "expo-router";
import ImageViewer from "@/components/my-components/ImageViewer";
import ImagePickerButton from "@/components/my-components/ImagePickerButton";
import Input from "@/components/my-components/Input";
import Button from "@/components/my-components/Button";
import { recordsSchema, expensesSchema } from "@/db/schema";
import { setupDb } from "@/db/setup-db";
import { eq } from "drizzle-orm";
import { setRefetch } from "@/refetch";

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

export default function EditRecord() {
    const db = setupDb();
    const navigation = useNavigation();
    const { id } = useLocalSearchParams();
    const [record, setRecord] = useState<IRecord | undefined>(undefined);
    const [loading, setLoading] = useState<Boolean>(true);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {
            const data = await db
                .select()
                .from(recordsSchema)
                .where(eq(recordsSchema.id, Number(id)));

            if (!data[0]) {
                return;
            }
            setRecord(data[0]);
            setLoading(false);

            // const data2 = await db
            //     .select()
            //     .from(expensesSchema)
            //     .where(eq(expensesSchema.record, Number(id)));
            //
            // setExpenses(data2);
        });

        return unsubscribe;
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>Loading...</Text>
            </View>
        );
    }

    if (!record) {
        return (
            <View>
                <Text style={styles.error}>Record not found</Text>
            </View>
        );
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
    const updateRecordAsync = async () => {
        try {
            console.log("updating...");
            await db
                .update(recordsSchema)
                .set(record)
                .where(eq(recordsSchema.id, record.id));
            setRefetch(true);
            alert("Updated successfully");
        } catch (err) {
            console.log(err);
            alert("ERROR, cannot update record");
        }
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
                <Button label="Update" onPress={updateRecordAsync} />
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
});
