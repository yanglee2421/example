// RN Imports
import { Button, StyleSheet, TextInput, View, Text } from "react-native";

export function Home() {
  return (
    <View style={styles.page}>
      <View style={styles.inputBox}>
        <TextInput
          keyboardType="default"
          placeholder="Your course goal!"
          style={styles.textInput}
        />
        <Button title="Add Goal" />
      </View>
      <View style={styles.goalsBox}>
        <Text>List of goals...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  inputBox: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 24,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  textInput: {
    flex: 1,
    padding: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  goalsBox: {
    flex: 1,
  },
});
