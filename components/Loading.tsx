import { StyleSheet, Text, View } from "react-native";

export function Loading() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  text: {
    textAlign: "center",
  },
});
