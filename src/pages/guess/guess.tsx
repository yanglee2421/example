// Components Imports
import { Header } from "./header";
import { StartGame } from "./start-game";

// RN Imports
import { View, StyleSheet } from "react-native";

export function Guess() {
  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      <StartGame />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});