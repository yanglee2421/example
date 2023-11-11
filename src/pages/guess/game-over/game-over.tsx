// RN Imports
import { StyleSheet, View, Text, Button } from "react-native";

export function GameOver(props: GameOverProps) {
  // ** Props
  const { rounds, usrNumber, onNewGame, ...restProps } = props;

  return (
    <View style={styles.screen} {...restProps}>
      <Text>The Game is Over!</Text>
      <Text>Number of rounds: {rounds}</Text>
      <Text>Number was: {usrNumber}</Text>
      <Button title="NEW GAME" onPress={onNewGame} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export interface GameOverProps {
  rounds: number;
  usrNumber: number;
  onNewGame(): void;
}
