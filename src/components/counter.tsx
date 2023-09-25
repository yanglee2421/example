// React Imports
import { useState } from "react";

// RN Imports
import { Button, StyleSheet, Text, View } from "react-native";

export function Counter() {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount((p) => p + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.text}>{count}</Text>
      </View>
      <View style={styles.btnBox}>
        <Button onPress={handleAdd} title="+1" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  textBox: {
    padding: 16,
  },
  text: {
    fontSize: 32,
  },
  btnBox: {},
});
