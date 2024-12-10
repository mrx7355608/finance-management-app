import { View, StyleSheet } from "react-native";
import ImageViewer from "../../components/my-components/ImageViewer";
import Button from "../../components/my-components/Button";
import { useState } from "react";
import Input from "@/components/my-components/Input";
import ImagePickerButton from "@/components/my-components/ImagePickerButton";
import * as SqliteDriver from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { recordsSchema } from "@/db/schema";
import { setRefetch } from "@/refetch";

const expo = SqliteDriver.openDatabaseSync("mydb.db");
const db = drizzle(expo);

export default function AddRecord() {
    // States for creating new records
    const [boughtPrice, setBoughtPrice] = useState<number>(0);
    const [soldPrice, setSoldPrice] = useState<number>(0);
    const [image, setImage] = useState<string | undefined>(undefined);

    const resetStates = () => {
        setBoughtPrice(0);
        setSoldPrice(0);
        setImage(undefined);
    };

    const createNewRecordAsync = async () => {
        if (!image) {
            alert("Please select an image");
            return;
        }
        try {
            await db.insert(recordsSchema).values({
                bought_price: boughtPrice,
                sold_price: soldPrice,
                image: image,
            });
            setRefetch(true);
            resetStates();
            alert("Record has been creaed successfully");
        } catch (err) {
            console.log("ERROR", err);
            alert("There was an error");
        }
    };

    return (
        <View style={styles.container}>
            {image && <ImageViewer image={image} />}
            <ImagePickerButton setImage={setImage} />
            <Input
                placeholder="Bought price"
                onChangeText={(price: number) => setBoughtPrice(price)}
                value={boughtPrice}
            />
            <Input
                placeholder="Sold price"
                onChangeText={(price: number) => setSoldPrice(price)}
                value={soldPrice}
            />
            <Button label="Create Record" onPress={createNewRecordAsync} />
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
});
