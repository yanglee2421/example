// Expo Imports
import { StatusBar } from "expo-status-bar";

// RN Imports
import { StyleSheet, View } from "react-native";

// Page Imports
import { Home } from "@/pages/home";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
