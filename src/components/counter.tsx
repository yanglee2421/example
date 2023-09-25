// React Imports
import { useState } from "react";

// RN Imports
import { Button, Text, View } from "react-native";

export function Counter() {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount((p) => p + 1);
  };

  return (
    <>
      <Text>{count}</Text>
      <View>
        <Button onPress={handleAdd} title="+1" />
      </View>
    </>
  );
}
