import { Text, Button } from "@rneui/themed";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text h1>not found</Text>
      <Link href="/" asChild>
        <Button title={"take me home"} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
