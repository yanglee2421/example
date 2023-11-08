// RN Imports
import { View, StyleSheet, ViewProps } from "react-native";

export function Card(props: ViewProps) {
  // ** Props
  const { children, style, ...restProps } = props;

  return (
    <View style={Object.assign({}, styles.card, style)} {...restProps}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
  },
});
