import { useState, useCallback } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import * as Sqlite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useEffect } from "react";
import { recordsSchema } from "@/db/schema";
import Record from "@/components/my-components/Record";
import { useNavigation } from "expo-router";

const expo = Sqlite.openDatabaseSync("mydb.db");
const db = drizzle(expo);

expo.execSync(
    "CREATE TABLE IF NOT EXISTS records (id integer PRIMARY KEY AUTOINCREMENT NOT NULL, image text NOT NULL, bought_price INTEGER NOT NULL, sold_price INTEGER DEFAULT 0);",
);

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
            const data = await db.select().from(recordsSchema);
            setRecords(data);
        });

        return unsubscribe; // cleanup function
    }, []);

    return (
        <ScrollView>
            {records.length > 0 ? (
                records.map((rec) => <Record key={rec.id} source={rec.image} />)
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
