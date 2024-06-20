import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Translation } from "react-i18next";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Home } from "@/views/Home/Home";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.buttonGroup}>
        <Pressable android_ripple={{ borderless: false }} style={styles.button}>
          <Translation ns="button">
            {(t) => {
              return <Text style={styles.buttonText}>{t("logout")}</Text>;
            }}
          </Translation>
        </Pressable>
        <Pressable android_ripple={{ borderless: false }} style={styles.button}>
          <Translation ns="MenuItemPrimary">
            {(t) => <Text style={styles.buttonText}>{t("system")}</Text>}
          </Translation>
        </Pressable>
        <Pressable
          onPress={() => {
            router.navigate("/about");
          }}
          android_ripple={{ borderless: false }}
          style={styles.button}
        >
          <Translation ns="MenuItemPrimary">
            {(t) => <Text style={styles.buttonText}>{t("about")}</Text>}
          </Translation>
        </Pressable>
        <Pressable
          onPress={() => {
            router.navigate("/123");
          }}
          android_ripple={{ borderless: false }}
          style={styles.button}
        >
          <Translation ns="MenuItemPrimary">
            {(t) => <Text style={styles.buttonText}>{t("404")}</Text>}
          </Translation>
        </Pressable>
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
    padding: 12,
  },
  text: {
    fontFamily: "SpaceMono",
  },
  button: {
    backgroundColor: "#6777ef",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
