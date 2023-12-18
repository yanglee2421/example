// RN Imports
import { StyleSheet, View, Text, Button, Alert } from "react-native";

// React Imports
import React from "react";

// Components Imports
import { NumberContainer, Card } from "@/pages/guess/components";

export function Game(props: GameProps) {
  // ** Props
  const { userChoice, onGameOver, ...restProps } = props;

  const [currentGuess, setCurrentGuess] = React.useState(() => {
    return generateRandomBetween(1, 100, userChoice);
  });

  const currentLowRef = React.useRef(0);
  const currentHighRef = React.useRef(100);
  const [rounds, setRounds] = React.useState(0);

  const handleNextGuess = (direction: string) => {
    switch (direction) {
      case "lower":
        if (currentGuess > userChoice) {
          currentHighRef.current = currentGuess;
          break;
        }
      case "greater":
        if (currentGuess < userChoice) {
          currentLowRef.current = currentGuess;
          break;
        }
      default:
        Alert.alert("Dont`t lie!", "You know that is wrong...", [
          { text: "Sorry!", style: "cancel" },
        ]);
        return;
    }

    const nextNumber = generateRandomBetween(
      currentLowRef.current,
      currentHighRef.current,
      currentGuess
    );

    if (nextNumber === userChoice) {
      onGameOver(rounds + 1);
      return;
    }

    setCurrentGuess(nextNumber);
    setRounds((p) => p + 1);
  };

  return (
    <View style={styles.screen} {...restProps}>
      <Text>Opponent`s Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.btnContainer}>
        <Button title="LOWER" onPress={handleNextGuess.bind(null, "lower")} />
        <Button
          title="GREATER"
          onPress={handleNextGuess.bind(null, "greater")}
        />
      </Card>
      <Text>Rounds: {rounds}</Text>
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
  onGameOver(rounds: number): void;
}
