import { makeStyles, Text } from "@rneui/themed";
import { Translation } from "react-i18next";
import { View } from "react-native";

export function Loading() {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Translation>
        {(t) => <Text style={styles.text}>{t("Loading...")}</Text>}
      </Translation>
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
