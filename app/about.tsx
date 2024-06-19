import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <Text>about</Text>
      <Button
        onPress={() => {
          router.navigate("/");
        }}
        title="take me home"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
