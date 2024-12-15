import { StyleSheet } from "react-native";
import { Image } from "expo-image";

type Props = {
    image: string;
};

export default function ImageViewer({ image }: Props) {
    return <Image source={image} style={styles.image} />;
}

const styles = StyleSheet.create({
    image: {
        width: "90%",
        height: 200,
        borderRadius: 18,
        marginBottom: 20,
    },
});
