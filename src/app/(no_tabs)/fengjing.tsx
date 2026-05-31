import { fetchFengjing } from "@/api/qqlykm_cn";
import { AppHeader } from "@/components/app-header";
import { useStorageStore } from "@/hooks/useStorageStore";
import { downloadFile } from "@/lib/expo";
import { nativeConfirm } from "@/lib/react-native";
import { Button, Column, Host, List, RNHostView, Spacer, Text } from "@expo/ui";
import { Surface } from "@expo/ui/jetpack-compose";
import { fillMaxWidth } from "@expo/ui/jetpack-compose/modifiers";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { ImageBackground } from "expo-image";
import React from "react";
import { ToastAndroid, View } from "react-native";
import { t } from "try";

const fetcher = fetchFengjing();

export default function Page() {
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const fengjing = useInfiniteQuery({ ...fetcher, enabled: !!apikey });
  const queryClient = useQueryClient();

  const hanldeImagePress = async (url: string) => {
    const [ok, error] = await t(async () => {
      await downloadFile(url);
      await nativeConfirm("Download ?", "Download image");
    });
    if (ok) {
      ToastAndroid.show("Cancel", 1000 * 2);
    } else {
      const message = error instanceof Error ? error.message : String(error);

      ToastAndroid.show(message, 1000 * 2);
      console.error(error);
    }
  };

  const renderQuery = () => {
    if (fengjing.isPending) {
      return null;
    }

    if (fengjing.isError) {
      return null;
    }

    const list = fengjing.data.pages;

    if (list.length === 0) {
      return null;
    }

    return list.map((item, index) => (
      <React.Fragment key={item.data.data.cover}>
        <Spacer size={12} />
        <RNHostView matchContents>
          <View style={{ paddingInline: 12 }}>
            <ImageBackground
              source={{ uri: item.data.data.cover }}
              style={[{ aspectRatio: 16 / 9, overflow: "hidden" }]}
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
        </RNHostView>
        {Object.is(index + 1, fengjing.data.pages.length) && (
          <Column style={{ padding: 12 }}>
            <Button
              onPress={() => fengjing.fetchNextPage()}
              disabled={fengjing.isFetchingNextPage}
              label="Click to fetch more"
              modifiers={[fillMaxWidth()]}
            />
          </Column>
        )}
      </React.Fragment>
    ));
  };

  return (
    <Host style={{ flex: 1 }}>
      <Surface>
        <Column>
          <AppHeader pageName="Landscape" />
          <List
            onRefresh={async () => {
              queryClient.removeQueries({ queryKey: fetcher.queryKey });
              await fengjing.refetch();
            }}
          >
            {renderQuery()}
          </List>
        </Column>
      </Surface>
    </Host>
  );
}
