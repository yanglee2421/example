import { Home } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { Button, H3, View } from "tamagui";

export default function NotFound() {
  return (
    <View
      justifyContent="center"
      gap="$8"
      flex={1}
      padding="$3"
      theme={"dark_Button"}
    >
      <H3 textAlign="center">Not Found</H3>
      <Link href="/" asChild>
        <Button
          icon={<Home />}
          color="$color"
          backgroundColor={"$primary"}
        >
          Take me home
        </Button>
      </Link>
    </View>
  );
}
