// RN Imports
import React from "react";
import { View, StyleSheet, Button, Text, useColorScheme } from "react-native";

// React Imports

// Utils Imports
import { AnimateController, timeout } from "@/utils";

export default function RollScreen() {
  const [number, setNumber] = React.useState(0);
  const [rolling, setRolling] = React.useState(false);

  const colorScheme = useColorScheme();

  const controllerRef = React.useRef(
    new AnimateController(() => {
      React.startTransition(() => {
        setNumber(Math.floor(Math.random() * 100) + 1);
      });
    }),
  );

  const handleRoll = async () => {
    setRolling(true);
    controllerRef.current.play();
    await timeout(1000);
    setRolling(false);
    controllerRef.current.pause();
  };

  return (
    <View style={styles.container}>
      <View style={styles.NumberBox}>
        <Text
          style={[
            styles.number,
            { color: colorScheme === "light" ? "black" : "white" },
          ]}
        >
          {number}
        </Text>
      </View>
      <View style={styles.buttonBox}>
        <Button onPress={handleRoll} disabled={rolling} title="Roll" />
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
    position: "fixed",
    left: 0,

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
