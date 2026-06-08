import { fetchCnBingImage } from "@/api/bing_com";
import { AppHeader } from "@/components/app-header";
import { useLocaleDate } from "@/hooks/useLocaleDate";
import { useLocaleTime } from "@/hooks/useLocaleTime";
import { downloadFile } from "@/lib/expo";
import { nativeConfirm } from "@/lib/react-native";
import { Column, Host, List, RNHostView, Row, Spacer, Text } from "@expo/ui";
import {
  Card,
  CircularProgressIndicator,
  Surface,
} from "@expo/ui/jetpack-compose";
import {
  fillMaxWidth,
  padding,
  paddingAll,
} from "@expo/ui/jetpack-compose/modifiers";
import { useQuery } from "@tanstack/react-query";
import { ImageBackground } from "expo-image";
import { openBrowserAsync } from "expo-web-browser";
import React from "react";
import { Linking, View } from "react-native";
import { t } from "try";

export default function Bing() {
  const query = useQuery(fetchCnBingImage({ format: "js", idx: 0, n: 8 }));
  const date = useLocaleDate();
  const time = useLocaleTime();

  const hanldeImagePress = async (url: string) => {
    const [] = await t(async () => {
      await downloadFile(url);
      await nativeConfirm("Download ?", "Download image");
    });
  };

  const renderBingImage = () => {
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

    const list = query.data.data.images;

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

    return list.map((item) => {
      return (
        <React.Fragment key={item.url}>
          <Spacer size={12} />
          <RNHostView matchContents>
            <View
              style={{
                aspectRatio: 16 / 9,
                paddingInline: 12,
              }}
            >
              <View style={{ borderRadius: 12, overflow: "hidden" }}>
                <ImageBackground
                  source={{ uri: `https://cn.bing.com${item.url}` }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Host style={{ flex: 1 }}>
                    <Row
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
                    >
                      <Column spacing={8} style={{ padding: 16 }}>
                        <Text textStyle={{ fontSize: 20 }}>{item.title}</Text>
                        <Text textStyle={{ fontSize: 16 }}>
                          {item.copyright}
                        </Text>
                      </Column>
                    </Row>
                  </Host>
                </ImageBackground>
              </View>
            </View>
          </RNHostView>
        </React.Fragment>
      );
    });
  };

  return (
    <Host style={{ flex: 1 }}>
      <Surface>
        <Column>
          <AppHeader pageName="Bing" />
          <List
            onRefresh={async () => {
              await query.refetch();
            }}
          >
            <Card modifiers={[fillMaxWidth(), padding(12, 12, 12, 0)]}>
              <Column modifiers={[paddingAll(16)]} spacing={4}>
                <Text textStyle={{ fontSize: 20 }}>{time}</Text>
                <Text textStyle={{ fontSize: 16 }}>{date}</Text>
              </Column>
            </Card>
            {renderBingImage()}
          </List>
        </Column>
      </Surface>
    </Host>
  );
}
