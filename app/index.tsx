import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, View, Text } from "react-native";
import { Home } from "@/views/Home/Home";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>hello</Text>
      <StatusBar style="auto" />
      <View style={styles.buttonGroup}>
        <Button
          onPress={() => {
            router.navigate("/about");
          }}
          title={"about"}
        />
        <Button
          onPress={() => {
            router.navigate("/123");
          }}
          title="404"
        />
      </View>
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonGroup: {
    gap: 12,
    flexDirection: "row",
  },
  text: {
    fontFamily: "SpaceMono",
  },
});
