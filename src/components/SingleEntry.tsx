import { StyleSheet, Text, View, Image } from "react-native";

export default function SingleEntry(props: { imageSource: any }): JSX.Element {
  return <Image style={styles.image} source={props.imageSource} />;
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    //marginTop: 20,
  },
});
