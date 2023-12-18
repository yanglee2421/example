// RN Imports
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Alert,
} from "react-native";

// React Imports
import React, { useState } from "react";

// Components Imports
import { Card, Input, NumberContainer } from "@/pages/guess/components";

// Constants Imports
import { Colors } from "@/pages/guess/constants";

export function StartGame(props: StartGameProps) {
  // ** Props
  const { onStartGame } = props;

  const [enteredValue, setEnteredValue] = React.useState("");
  const [confirmed, setConfirmed] = React.useState(false);
  const [selectedNumber, setSelectedNumber] = useState(NaN);

  const handleInput = (text: string) => {
    setEnteredValue(text.replace(/[^\d]/g, ""));
  };

  const handlePress = () => {
    Keyboard.dismiss();
  };

  const handleReset = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const showAlert = () => {
    Alert.alert(
      "Invalid number! NaN",
      "Number has to be a number between 1 and 99",
      [
        {
          text: "Okay",
          style: "destructive",
          onPress() {
            handleReset();
          },
        },
      ]
    );
  };

  const handleConfirm = () => {
    const chosenNumber = Number.parseInt(enteredValue);
    if (Number.isNaN(chosenNumber)) {
      showAlert();
      return;
    }

    if (chosenNumber <= 0) {
      showAlert();
      return;
    }

    if (chosenNumber > 99) {
      showAlert();
      return;
    }

    setEnteredValue("");
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    Keyboard.dismiss();
  };

  // Confirm output node
  const confirmedNode = React.useMemo(() => {
    if (confirmed) {
      const handleStart = () => {
        onStartGame(selectedNumber);
      };

      return (
        <Card style={styles.summaryContainer}>
          <Text>You selected</Text>
          <NumberContainer>{selectedNumber}</NumberContainer>
          <Button title="START GAME" onPress={handleStart} />
        </Card>
      );
    }

    return null;
  }, [confirmed, selectedNumber, onStartGame]);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            value={enteredValue}
            onChangeText={handleInput}
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
          />
          <View style={styles.btnContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={handleReset}
                color={Colors.accent}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={handleConfirm}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedNode}
      </View>
    </TouchableWithoutFeedback>
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

  // Summary container
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export interface StartGameProps {
  onStartGame(usrNum: number): void;
}
