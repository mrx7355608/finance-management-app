import { StyleSheet } from "react-native";
import { Image } from "expo-image";

type Props = {
    selectedImage: string;
};

export default function ImageViewer({ selectedImage }: Props) {
    return <Image source={selectedImage} style={styles.image} />;
}

const styles = StyleSheet.create({
    image: {
        width: "90%",
        height: 200,
        borderRadius: 18,
        marginBottom: 20,
    },
});
