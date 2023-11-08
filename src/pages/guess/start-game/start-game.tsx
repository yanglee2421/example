// RN Imports
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

// React Imports
import React from "react";

// Components Imports
import { Card } from "@/components";

export function StartGame() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Start a New Game!</Text>
      <Card style={styles.inputContainer}>
        <Text>Select a Number</Text>
        <TextInput />
        <View style={styles.btnContainer}>
          <Button title="Reset" onPress={() => {}} />
          <Button title="Confirm" onPress={(evt) => {}} />
        </View>
      </Card>
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
  },

  // Button container
  btnContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
});
