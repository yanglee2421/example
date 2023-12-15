// Components Imports
import { Header } from "./header";
import { StartGame } from "./start-game";
import { Game } from "./game";
import { GameOver } from "./game-over";

// RN Imports
import { StyleSheet, ScrollView, RefreshControl } from "react-native";

// React Imports
import React from "react";
import { timeout } from "@/utils";

export function Guess() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [usrNumber, setUsrNumber] = React.useState(0);
  const [guessRounds, setGuessRounds] = React.useState(0);

  const handleStart = React.useCallback(
    (selectedNumber: number) => {
      setUsrNumber(selectedNumber);
      setGuessRounds(0);
    },
    [setUsrNumber, setGuessRounds]
  );

  const handleGameOver = React.useCallback(
    (rounds: number) => {
      setGuessRounds(rounds);
    },
    [setGuessRounds]
  );

  const handleNewGame = React.useCallback(() => {
    setUsrNumber(0);
    setGuessRounds(0);
  }, [setUsrNumber, setGuessRounds]);

  const contentNode = React.useMemo(() => {
    if (guessRounds > 0) {
      return (
        <GameOver
          rounds={guessRounds}
          usrNumber={usrNumber}
          onNewGame={handleNewGame}
        />
      );
    }

    if (usrNumber) {
      return <Game userChoice={usrNumber} onGameOver={handleGameOver} />;
    }

    return <StartGame onStartGame={handleStart} />;
  }, [guessRounds, usrNumber, handleNewGame, handleGameOver, handleStart]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true);
            await timeout(1000 * 2);
            setRefreshing(false);
          }}
        />
      }
      style={styles.screen}
    >
      <Header title="Guess a Number" />
      {contentNode}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
