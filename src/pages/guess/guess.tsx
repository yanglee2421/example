// Components Imports
import { Header } from "./header";
import { StartGame } from "./start-game";
import { Game } from "./game";

// RN Imports
import { View, StyleSheet } from "react-native";

// React Imports
import React from "react";

export function Guess() {
  const [usrNumber, setUsrNumber] = React.useState(0);

  const handleStart = (selectedNumber: number) => {
    setUsrNumber(selectedNumber);
  };

  const contentNode = React.useMemo(() => {
    if (usrNumber) {
      return <Game userChoice={usrNumber} />;
    }

    return <StartGame onStartGame={handleStart} />;
  }, [usrNumber]);

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {contentNode}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
