import { AppHeader } from "@/components/app-header";
import { Button, Column, Host, Text } from "@expo/ui";
import {
  Box,
  Card,
  CircularProgressIndicator,
  Surface,
} from "@expo/ui/jetpack-compose";
import {
  align,
  fillMaxWidth,
  paddingAll,
  weight,
} from "@expo/ui/jetpack-compose/modifiers";
import { useQuery } from "@tanstack/react-query";
import { Query, usePermissions } from "expo-media-library";

const GalleryContent = () => {
  const query = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const result = await new Query();
    },
  });
};

export default function GalleryPage() {
  const [permissionResponse, requestPermission] = usePermissions({
    granularPermissions: ["photo"],
  });

  const renderContent = () => {
    if (!permissionResponse) {
      return (
        <Column alignment="center" modifiers={[fillMaxWidth(), paddingAll(32)]}>
          <CircularProgressIndicator />
        </Column>
      );
    }

    if (!permissionResponse?.granted) {
      return (
        <Box modifiers={[weight(1)]}>
          <Card modifiers={[fillMaxWidth(), paddingAll(12), align("center")]}>
            <Column spacing={4} style={{ padding: 16 }}>
              <Text>message</Text>
              <Text>message</Text>
              <Button
                label="dxxx"
                modifiers={[fillMaxWidth()]}
                onPress={requestPermission}
              />
            </Column>
          </Card>
        </Box>
      );
    }

    return <Text>4399</Text>;
  };

  return (
    <Host style={{ flex: 1 }}>
      <Surface>
        <Column>
          <AppHeader pageName="Gallery" />
          {renderContent()}
        </Column>
      </Surface>
    </Host>
  );
}
