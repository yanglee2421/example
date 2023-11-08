// RN Imports
import { StyleSheet, View, Text, Button } from "react-native";

// React Imports
import React from "react";

// Components Imports
import { NumberContainer, Card } from "@/components";

export function Game(props: GameProps) {
  // ** Props
  const { userChoice } = props;

  const [currentGuess, setCurrentGuess] = React.useState(() => {
    return generateRandomBetween(1, 100, userChoice);
  });

  return (
    <View style={styles.screen}>
      <Text>Opponent`s Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.btnContainer}>
        <Button title="LOWER" />
        <Button title="GREATER" />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },

  // Button container
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

function generateRandomBetween(min: number, max: number, exclude: number) {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (maxValue - minValue) + minValue);

  if (Object.is(rndNum, exclude)) {
    return generateRandomBetween(min, max, exclude);
  }

  return rndNum;
}

export interface GameProps {
  userChoice: number;
}
