// RN Imports
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

// React Imports
import React from "react";

// Components Imports
import { Card, Input } from "@/components";

// Constants Imports
import { Colors } from "@/constants";

export function StartGame() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Start a New Game!</Text>
      <Card style={styles.inputContainer}>
        <Text>Select a Number</Text>
        <Input
          style={styles.input}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          maxLength={2}
        />
        <View style={styles.btnContainer}>
          <View style={styles.button}>
            <Button title="Reset" onPress={() => {}} color={Colors.accent} />
          </View>
          <View style={styles.button}>
            <Button
              title="Confirm"
              onPress={(evt) => {}}
              color={Colors.primary}
            />
          </View>
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

  // Button
  button: {
    width: 100,
  },

  // Input
  input: {
    width: 50,
    textAlign: "center",
  },
});
