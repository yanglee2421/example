// RN Imports
import { StyleSheet, View, Text } from "react-native";

// Constants Imports
import { Colors } from "@/pages/guess/constants";

export function NumberContainer(props: React.PropsWithChildren) {
  // ** Props
  const { children } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.number}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.accent,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  number: {
    color: Colors.accent,
    fontSize: 22,
  },
});
