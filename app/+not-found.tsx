import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text>Not Found</Text>
      <Link href="/" asChild>
        <Pressable>
          <Text style={{ color: "#fff" }}>
            Take me home
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    gap: 64,
  },
});
