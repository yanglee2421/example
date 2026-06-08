import { fetchFengjing } from "@/api/qqlykm_cn";
import { AppHeader } from "@/components/app-header";
import { useStorageStore } from "@/hooks/useStorageStore";
import { downloadFile } from "@/lib/expo";
import { nativeConfirm } from "@/lib/react-native";
import { Button, Column, Host, List, RNHostView, Spacer, Text } from "@expo/ui";
import {
  Box,
  Card,
  CircularProgressIndicator,
  SnackbarHost,
  SnackbarHostRef,
  Surface,
} from "@expo/ui/jetpack-compose";
import {
  fillMaxWidth,
  paddingAll,
  weight,
} from "@expo/ui/jetpack-compose/modifiers";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { ImageBackground } from "expo-image";
import React from "react";
import { View } from "react-native";
import { t } from "try";

const fetcher = fetchFengjing();

export default function Page() {
  const snackbarRef = React.useRef<SnackbarHostRef>(null);

  const apikey = useStorageStore((s) => s.qqlykmKey);
  const query = useInfiniteQuery({ ...fetcher, enabled: !!apikey });
  const queryClient = useQueryClient();

  const hanldeImagePress = async (url: string) => {
    const [ok] = await t(async () => {
      await downloadFile(url);
      await nativeConfirm("Download ?", "Download image");
    });

    if (!ok) {
      snackbarRef.current?.showSnackbar({ message: "Cancel" });
    }
  };

  const renderQuery = () => {
    if (query.isPending) {
      return (
        <Column alignment="center" modifiers={[fillMaxWidth(), paddingAll(32)]}>
          <CircularProgressIndicator />
        </Column>
      );
    }

    if (query.isError) {
      return (
        <Card modifiers={[fillMaxWidth(), paddingAll(12)]}>
          <Column style={{ padding: 12 }}>
            <Text textStyle={{ fontSize: 20 }}>Error</Text>
            <Text textStyle={{ fontSize: 14 }}>{query.error?.message}</Text>
          </Column>
        </Card>
      );
    }

    const list = query.data.pages;

    if (list.length === 0) {
      return (
        <Card modifiers={[fillMaxWidth(), paddingAll(12)]}>
          <Column style={{ padding: 12 }}>
            <Text textStyle={{ fontSize: 20 }}>Empty</Text>
            <Text textStyle={{ fontSize: 14 }}>No Data Found</Text>
          </Column>
        </Card>
      );
    }

    return list.map((item) => (
      <RNHostView matchContents key={item.data.data.cover}>
        <View style={{ paddingInline: 12, paddingTop: 12 }}>
          <View
            style={{
              borderRadius: 12,
              overflow: "hidden",
              aspectRatio: 16 / 9,
            }}
          >
            <ImageBackground
              source={{ uri: item.data.data.cover }}
              style={[{ width: "100%", height: "100%" }]}
            >
              <Host style={{ flex: 1 }}>
                <Column
                  onPress={() => {
                    const url = item.data.data.cover;
                    hanldeImagePress(url);
                  }}
                  alignment="center"
                >
                  <Spacer flexible />
                  <Text>{item.data.data.tag}</Text>
                  <Spacer flexible />
                </Column>
              </Host>
            </ImageBackground>
          </View>
        </View>
      </RNHostView>
    ));
  };

  return (
    <Host style={{ flex: 1 }}>
      <Surface>
        <Column>
          <AppHeader pageName="Landscape" />
          <Box modifiers={[weight(1)]}>
            <List
              onRefresh={async () => {
                queryClient.removeQueries({ queryKey: fetcher.queryKey });
                await query.refetch();
              }}
            >
              {renderQuery()}
              <Column style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
                <Button
                  onPress={() => query.fetchNextPage()}
                  disabled={query.isFetchingNextPage}
                  label="Load more"
                  modifiers={[fillMaxWidth()]}
                />
              </Column>
            </List>
          </Box>
          <Box modifiers={[fillMaxWidth()]}>
            <SnackbarHost ref={snackbarRef} />
          </Box>
        </Column>
      </Surface>
    </Host>
  );
}
