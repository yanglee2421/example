import { AppHeader } from "@/components/app-header";
import { Button, Column, Host, List, RNHostView, Text } from "@expo/ui";
import {
  Box,
  Card,
  CircularProgressIndicator,
  Surface,
} from "@expo/ui/jetpack-compose";
import {
  align,
  fillMaxWidth,
  onSizeChanged,
  paddingAll,
  weight,
} from "@expo/ui/jetpack-compose/modifiers";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Album, usePermissions } from "expo-media-library";
import React from "react";

interface AlbumItemProps {
  album: Album;
}

const AlbumItem = (props: AlbumItemProps) => {
  const [width, setWidth] = React.useState(0);

  const query = useQuery({
    queryKey: ["gallery", "album", props.album.id],
    queryFn: async () => {
      const title = await props.album.getTitle();
      const assets = await props.album.getAssets();
      const images = await Promise.all(assets.map((item) => item.getUri()));

      return { title, assets: images };
    },
  });

  if (query.isPending) {
    return <></>;
  }

  if (query.isError) {
    return <></>;
  }

  return (
    <Box
      modifiers={[
        onSizeChanged((s) => {
          setWidth(s.width);
        }),
        fillMaxWidth(),
      ]}
    >
      <Column>
        <Text>{query.data.title}</Text>
        {query.data.assets.map((i) => (
          <RNHostView matchContents key={i}>
            <Image
              source={i}
              style={{
                width,
                height: 400,
              }}
            />
          </RNHostView>
        ))}
      </Column>
    </Box>
  );
};

const GalleryContent = () => {
  const query = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const result = await Album.getAll();

      return result;
    },
  });

  return (
    <List
      onRefresh={async () => {
        await query.refetch();
      }}
    >
      {query.data?.map((item) => {
        return <AlbumItem key={item.id} album={item} />;
      })}
    </List>
  );
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
            <Column spacing={6} style={{ padding: 16 }}>
              <Text textStyle={{ fontSize: 18 }}>
                Access to Photos Required
              </Text>
              <Text>
                This app needs access to your photos to display the gallery.
                Please grant access to continue.
              </Text>
              <Button
                label="Allow Photo Access"
                modifiers={[fillMaxWidth()]}
                onPress={requestPermission}
              />
            </Column>
          </Card>
        </Box>
      );
    }

    return <GalleryContent />;
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
