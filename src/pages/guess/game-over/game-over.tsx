// RN Imports
import { StyleSheet, View, Text } from "react-native";

export function GameOver(props: GameOverProps) {
  // ** Props
  const { rounds, ...restProps } = props;

  return (
    <View style={styles.screen} {...restProps}>
      <Text>The Game is Over!</Text>
      <Text>Number of rounds: {}</Text>
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
}
