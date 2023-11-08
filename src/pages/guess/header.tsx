// RN Imports
import { StyleSheet, View, Text } from "react-native";

// React Imports
import React from "react";

export function Header(props: HeaderProps) {
  // ** Props
  const { title } = props;

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // Header container
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: "#f7287b",
    justifyContent: "center",
    alignItems: "center",
  },

  // Header title
  headerTitle: {
    color: "#000",
    fontSize: 18,
  },
});

export interface HeaderProps {
  title: string;
}
