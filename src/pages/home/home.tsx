// RN Imports
import { useMemo, useState } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Text,
  StyleProp,
  ViewStyle,
  ScrollView,
} from "react-native";

export function Home() {
  const [text, setText] = useState("");
  const [goals, setGoals] = useState<string[]>([]);

  const handleAddGoals = () => {
    setGoals((prev) => Array.from(new Set<string>([text, ...prev])));
  };

  const goalsEl = useMemo(() => {
    return Array.from(new Set(goals)).map((item, idx, list) => {
      const itemStyle: StyleProp<ViewStyle> = {
        ...styles.goalsItem,
        marginBottom: idx === list.length - 1 ? 0 : 8,
      };

      return (
        <View key={item} style={itemStyle}>
          <Text style={styles.goalsText}>{item}</Text>
        </View>
      );
    });
  }, [goals]);

  return (
    <View style={styles.page}>
      <View style={styles.inputBox}>
        <TextInput
          value={text}
          onChangeText={setText}
          keyboardType="default"
          placeholder="Your course goal!"
          style={styles.textInput}
        />
        <Button onPress={handleAddGoals} title="Add Goal" />
      </View>
      <View style={styles.goalsBox}>
        <ScrollView alwaysBounceVertical={true}>{goalsEl}</ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  inputBox: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 24,
    marginBottom: 24,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  textInput: {
    flex: 1,
    padding: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  goalsBox: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: "red",
  },
  goalsItem: {
    padding: 8,
    // margin: 8,
    marginBottom: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalsText: {
    color: "#fff",
  },
});
