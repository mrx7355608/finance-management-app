import { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useEffect } from "react";
import { recordsSchema } from "@/db/schema";
import Record from "@/components/my-components/RecordItem";
import { useNavigation } from "expo-router";
import { needRefetch, setRefetch } from "@/refetch";
import { setupDb } from "@/db/setup-db";

const db = setupDb();

interface IRecord {
    id: number;
    image: string;
    bought_price: number;
    sold_price: number | null;
}

export default function HomeScreen() {
    const [records, setRecords] = useState<IRecord[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {
            if (needRefetch()) {
                const data = await db.select().from(recordsSchema);
                setRecords(data);
                setRefetch(false);
            }
        });

        return unsubscribe; // cleanup function
    }, []);

    return (
        <ScrollView>
            {records.length > 0 ? (
                records.map((rec) => (
                    <Record key={rec.id} id={rec.id} source={rec.image} />
                ))
            ) : (
                <Text style={styles.text}>No records available</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 100,
    },
    text: {
        color: "#fff",
    },
});
