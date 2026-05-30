import { fetchCnBingImage } from "@/api/bing_com";
import { useLocaleDate } from "@/hooks/useLocaleDate";
import { useLocaleTime } from "@/hooks/useLocaleTime";
import { downloadFile } from "@/lib/expo";
import { nativeConfirm } from "@/lib/react-native";
import { Column, Host, List, RNHostView, Spacer, Text } from "@expo/ui";
import { Card, Surface } from "@expo/ui/jetpack-compose";
import {
  fillMaxWidth,
  padding,
  paddingAll,
} from "@expo/ui/jetpack-compose/modifiers";
import { useQuery } from "@tanstack/react-query";
import { ImageBackground } from "expo-image";
import { openBrowserAsync } from "expo-web-browser";
import React from "react";
import { Linking, ToastAndroid } from "react-native";
import { t } from "try";

export default function Bing() {
  const bingImgs = useQuery(fetchCnBingImage({ format: "js", idx: 0, n: 8 }));
  const date = useLocaleDate();
  const time = useLocaleTime();

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

  const renderBingImage = () => {
    if (bingImgs.isPending) {
      return <></>;
    }

    if (bingImgs.isError) {
      return <></>;
    }

    const list = bingImgs.data.data.images;

    if (list.length === 0) {
      return <></>;
    }

    return list.map((item, index) => {
      return (
        <React.Fragment key={item.url}>
          {!!index && <Spacer size={16} />}
          <RNHostView matchContents>
            <ImageBackground
              source={{ uri: `https://cn.bing.com${item.url}` }}
              style={{
                aspectRatio: 16 / 9,
              }}
            >
              <Host style={{ flex: 1 }}>
                <Column
                  spacing={8}
                  onPress={async () => {
                    const [ok] = await t(async () => {
                      await openBrowserAsync(item.copyrightlink, {
                        enableBarCollapsing: true,
                        enableDefaultShareMenuItem: true,
                        createTask: false,
                      });
                    });

                    if (ok) return;

                    Linking.openURL(item.copyrightlink);
                  }}
                  modifiers={[padding(16, 16, 16, 16)]}
                >
                  <Text textStyle={{ fontSize: 20 }}>{item.title}</Text>
                  <Text textStyle={{ fontSize: 16 }}>{item.copyright}</Text>
                </Column>
              </Host>
            </ImageBackground>
          </RNHostView>
        </React.Fragment>
      );
    });
  };

  return (
    <Host style={{ flex: 1 }}>
      <Surface>
        <List
          onRefresh={async () => {
            await bingImgs.refetch();
          }}
        >
          <Card modifiers={[fillMaxWidth()]}>
            <Column modifiers={[paddingAll(16)]} spacing={4}>
              <Text textStyle={{ fontSize: 24 }}>Bing</Text>
              <Text textStyle={{ fontSize: 20 }}>{time}</Text>
              <Text textStyle={{ fontSize: 16 }}>{date}</Text>
            </Column>
          </Card>
          <Spacer size={16} />
          {renderBingImage()}
        </List>
      </Surface>
    </Host>
  );
}
