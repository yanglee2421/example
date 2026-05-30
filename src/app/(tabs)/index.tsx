import { Column, Host, Row, Text } from "@expo/ui";
import { Box, Surface } from "@expo/ui/jetpack-compose";
import { fillMaxWidth, weight } from "@expo/ui/jetpack-compose/modifiers";

export default function HomeScreen() {
  return (
    <Host style={{ flex: 1 }}>
      <Surface>
        <Row spacing={8}>
          <Column spacing={8} modifiers={[weight(1)]}>
            <Box contentAlignment="center" modifiers={[fillMaxWidth()]}>
              <Text>Centered in Box</Text>
            </Box>
            <Box contentAlignment="center" modifiers={[fillMaxWidth()]}>
              <Text>Centered in Box</Text>
            </Box>
          </Column>
          <Column spacing={8} modifiers={[weight(1)]}>
            <Box contentAlignment="center" modifiers={[fillMaxWidth()]}>
              <Text>Centered in Box</Text>
            </Box>
            <Box contentAlignment="center" modifiers={[fillMaxWidth()]}>
              <Text>Centered in Box</Text>
            </Box>
          </Column>
          <Column spacing={8} modifiers={[weight(1)]}>
            <Box contentAlignment="center" modifiers={[fillMaxWidth()]}>
              <Text>Centered in Box</Text>
            </Box>
            <Box contentAlignment="center" modifiers={[fillMaxWidth()]}>
              <Text>Centered in Box</Text>
            </Box>
          </Column>
        </Row>
      </Surface>
    </Host>
  );
}
