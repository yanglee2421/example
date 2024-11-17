import { makeStyles, Text } from "@rneui/themed";
import { View } from "react-native";

export function Loading() {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const useStyles = makeStyles({
  container: {
    padding: 12,
  },
  text: {
    textAlign: "center",
  },
});
