import { Button } from "@rneui/themed";
import { Link } from "expo-router";
import { View } from "react-native";

export default function Account() {
  return (
    <View style={{ justifyContent: "center", flex: 1, padding: 12, gap: 24 }}>
      <Link href={"/23434"} asChild>
        <Button color="error">404</Button>
      </Link>
      <Link href={"/about"} asChild>
        <Button color="primary">about</Button>
      </Link>
    </View>
  );
}
