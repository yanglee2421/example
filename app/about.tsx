import { SocialIcon } from "@rneui/themed";
import { ScrollView, StyleSheet, View } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <SocialIcon type="github" iconType="font-awesome" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
