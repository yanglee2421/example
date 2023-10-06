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
  FlatList,
  ScrollView,
} from "react-native";

export function Home() {
  const [text, setText] = useState("");

  const [goals, setGoals] = useState<string[]>([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
  ]);

  const goalsEl = useMemo(() => {
    return goals.map((item, index) => {
      return (
        <View key={index} style={styles.goalsItem}>
          <Text style={styles.goalsText}>{item}</Text>
        </View>
      );
    });
  }, [goals]);

  const handleAddGoals = () => {
    setGoals((prev) => Array.from(new Set<string>([text, ...prev])));
  };

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
      {/* <View style={styles.goalsBox}>
        <FlatList
          alwaysBounceVertical={true}
          showsVerticalScrollIndicator={false}
          data={goals}
          style={styles.flatlist}
          renderItem={(item) => {
            const itemStyle: StyleProp<ViewStyle> = {
              ...styles.goalsItem,
              marginBottom: item.index === goals.length - 1 ? 0 : 8,
            };
            return (
              <View key={item.index} style={itemStyle}>
                <Text style={styles.goalsText}>{item.item}</Text>
              </View>
            );
          }}
        />
      </View> */}
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.goalsBox}>{goalsEl}</View>
      </ScrollView>
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
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    // rowGap: 16,
    borderWidth: 1,
    borderColor: "red",
    borderStyle: "dashed",
  },
  flatlist: {
    // flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
  },
  goalsItem: {
    flex: 1,
    flexBasis: "45%",
    // flexGrow: 1,
    // flexShrink: 1,
    // width: "50%",
    padding: 16,
    // margin: 8,
    // marginBottom: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalsText: {
    color: "#fff",
  },
});
