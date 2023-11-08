// RN Imports
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

// React Imports
import React from "react";

export function StartGame() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Start a New Game!</Text>
      <View style={styles.inputContainer}>
        <Text>Select a Number</Text>
        <TextInput />
        <View style={styles.btnContainer}>
          <Button title="Reset" onPress={() => {}} />
          <Button title="Confirm" onPress={(evt) => {}} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  // Title
  title: {
    fontSize: 20,
    marginVertical: 10,
  },

  // Input container
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
  },

  // Button container
  btnContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
});
