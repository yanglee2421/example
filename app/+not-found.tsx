import { Button, Text, useTheme } from "@rneui/themed";
import { Link } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

export default function NotFound() {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text h1>Not Found</Text>
      <Link href="/" asChild>
        <Pressable>
          <Button
            disabled
            disabledStyle={{ backgroundColor: theme.colors.primary }}
          >
            <Text style={{ color: "#fff" }}>
              Take me home
            </Text>
          </Button>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    gap: 64,
  },
});
