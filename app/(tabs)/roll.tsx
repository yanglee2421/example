// RN Imports
import { View, StyleSheet, Button, Text } from "react-native";

// React Imports
import React from "react";

// Utils Imports
import { AnimateController, timeout } from "@/utils";

export default function RollScreen() {
  const [number, setNumber] = React.useState(0);
  const controllerRef = React.useRef(
    new AnimateController(() => {
      React.startTransition(() => {
        setNumber(Math.floor(Math.random() * 100) + 1);
      });
    }),
  );

  const handleRoll = async () => {
    controllerRef.current.play();
    await timeout(1000);
    controllerRef.current.pause();
  };

  return (
    <View style={styles.container}>
      <View style={styles.NumberBox}>
        <Text style={styles.number}>{number}</Text>
      </View>
      <View style={styles.buttonBox}>
        <Button onPress={handleRoll} title="Roll"></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
  },
  NumberBox: {
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",

    padding: 16,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 64,
    clip: "",
  },
  number: {
    fontSize: 64,
  },
  buttonBox: {
    width: 96,
  },
});
