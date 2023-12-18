// RN Imports
import { TextInput, StyleSheet, TextInputProps } from "react-native";

export function Input(props: TextInputProps) {
  // ** Props
  const { style, ...restProps } = props;

  return (
    <>
      <TextInput
        style={Object.assign({}, styles.input, style)}
        {...restProps}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
