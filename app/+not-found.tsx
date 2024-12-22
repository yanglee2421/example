import { useThemeStore } from "@/hooks/useThemeStore";
import { android_ripple } from "@/lib/utils";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Page() {
  const theme = useThemeStore((s) => s.theme);

  return (
    <View style={styles.container}>
      <Text
        style={[theme.typography.h1, { color: theme.palette.text.primary }]}
      >
        404
      </Text>
      <Text
        style={[theme.typography.h2, { color: theme.palette.text.primary }]}
      >
        Not Found
      </Text>
      <Link href="/" asChild>
        <Pressable
          style={{
            paddingInline: theme.spacing(3),
            paddingBlock: theme.spacing(2),
            borderRadius: theme.shape.borderRadius,
          }}
          android_ripple={android_ripple(theme.palette.action.focus)}
        >
          <Text
            style={[
              theme.typography.body1,
              { color: theme.palette.primary.main },
            ]}
          >
            Take Me Home
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",

    flex: 1,
  },
});
