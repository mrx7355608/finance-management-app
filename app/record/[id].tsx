import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import ImageViewer from "@/components/my-components/ImageViewer";
import { setupDb } from "@/db/setup-db";
import { recordsSchema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { useNavigation, useLocalSearchParams } from "expo-router";

interface IRecord {
    id: number;
    bought_price: number;
    sold_price: number | null;
    image: string;
}

export default function Edit() {
    const { id } = useLocalSearchParams();
    const [record, setRecord] = useState<IRecord | undefined>(undefined);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {
            const db = setupDb();
            const data = await db
                .select()
                .from(recordsSchema)
                .where(eq(recordsSchema.id, id as any));

            console.log(data[0]);
            setRecord(data[0]);
        });

        return unsubscribe;
    }, []);

    return (
        <View style={styles.container}>
            {!record ? (
                <Text style={styles.text}>Record not found</Text>
            ) : (
                <ImageViewer image={record.image} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#25292e",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#fff",
    },
    heading: {
        fontSize: 25,
        fontWeight: 500,
        color: "#fff",
        textAlign: "center",
        margin: 10,
    },
});
