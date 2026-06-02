import { AppHeader } from "@/components/app-header";
import { Button, Column, Host, RNHostView, Row } from "@expo/ui";
import { Surface } from "@expo/ui/jetpack-compose";
import { fillMaxWidth, weight } from "@expo/ui/jetpack-compose/modifiers";
import { View } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

export default function HomeScreen() {
  const width = useSharedValue(100);

  const handlePress = () => {
    width.value = withSpring(Math.random() * 200 + 50);
  };

  return (
    <Host style={{ flex: 1 }}>
      <Surface>
        <Column>
          <AppHeader pageName="Home" showBack={false} />
          <Row modifiers={[weight(1)]}>
            <RNHostView>
              <View
                style={{
                  alignItems: "center",
                  padding: 16,
                  flex: 1,
                }}
              >
                <Animated.View
                  style={{
                    width,
                    height: 100,
                    backgroundColor: "violet",
                  }}
                />
              </View>
            </RNHostView>
          </Row>
          <Row style={{ padding: 12 }}>
            <Button
              onPress={handlePress}
              label="Click me"
              modifiers={[fillMaxWidth()]}
            />
          </Row>
        </Column>
      </Surface>
    </Host>
  );
}
