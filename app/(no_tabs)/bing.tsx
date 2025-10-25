import { t } from "try";
import React from "react";
import Animated from "react-native-reanimated";
import { useQuery } from "@tanstack/react-query";
import { openBrowserAsync } from "expo-web-browser";
import {
  ImageBackground,
  Linking,
  Pressable,
  RefreshControl,
  ToastAndroid,
  View,
} from "react-native";
import { fetchCnBingImage } from "@/api/bing_com";
import { useLocaleDate } from "@/hooks/useLocaleDate";
import { useLocaleTime } from "@/hooks/useLocaleTime";
import { useTheme } from "@/hooks/useTheme";
import { OffLine } from "@/components/OffLine";
import { Text } from "@/components/Text";
import { Loading } from "@/components/Loading";
import { downloadFile } from "@/lib/expo";
import { nativeConfirm } from "@/lib/react-native";

const OfflineScreen = () => {
  return (
    <View>
      <Text variant="body1">Not connected to the internet</Text>
    </View>
  );
};

const Bing = () => {
  const bingImgs = useQuery(fetchCnBingImage({ format: "js", idx: 0, n: 8 }));
  const theme = useTheme();
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
      return <Loading />;
    }

    if (bingImgs.isError) {
      return <></>;
    }

    return (
      <>
        <Animated.FlatList
          data={bingImgs.data.data.images}
          keyExtractor={(i) => i.urlbase}
          renderItem={({ item: i }) => (
            <Pressable
              key={i.urlbase}
              onPress={async () => {
                try {
                  await openBrowserAsync(i.copyrightlink, {
                    toolbarColor: theme.palette.background.default,
                    enableBarCollapsing: true,
                    enableDefaultShareMenuItem: true,

                    createTask: false,
                  });
                } catch {
                  Linking.openURL(i.copyrightlink);
                }
              }}
              onLongPress={() => {
                const url = `https://cn.bing.com${i.url}`;
                hanldeImagePress(url);
              }}
              android_ripple={{
                borderless: false,
                foreground: true,
                color: `rgba(255,255,255,${theme.palette.action.focusOpacity})`,
              }}
              style={[theme.shape, { overflow: "hidden" }]}
            >
              <ImageBackground
                source={{ uri: `https://cn.bing.com${i.url}` }}
                style={[
                  {
                    paddingInline: theme.spacing(4),
                    paddingBlock: theme.spacing(3),

                    aspectRatio: 16 / 9,
                  },
                ]}
              >
                <View
                  style={{
                    position: "absolute",
                    inset: 0,

                    alignItems: "center",
                    justifyContent: "center",

                    backgroundColor: `rgba(0,0,0,${theme.palette.action.disabledOpacity})`,
                  }}
                >
                  <Text
                    style={[
                      theme.typography.h6,
                      {
                        color: theme.palette.common.white,
                        textAlign: "center",
                      },
                    ]}
                  >
                    {i.title}
                  </Text>
                  <Text
                    style={[
                      theme.typography.body2,
                      {
                        color: theme.palette.common.white,
                        textAlign: "center",
                      },
                    ]}
                  >
                    {i.copyright}
                  </Text>
                </View>
              </ImageBackground>
            </Pressable>
          )}
          ListEmptyComponent={<></>}
          ListHeaderComponent={
            <View
              style={[
                theme.shape,
                {
                  borderColor: theme.palette.divider,
                  borderWidth: 1,

                  paddingInline: theme.spacing(4),
                  paddingBlock: theme.spacing(3),
                },
              ]}
            >
              <Text
                style={[
                  theme.typography.h5,
                  { color: theme.palette.text.primary },
                ]}
              >
                Bing
              </Text>
              <Text
                style={[
                  theme.typography.subtitle1,
                  {
                    color: theme.palette.text.primary,
                  },
                ]}
              >
                {time}
              </Text>
              <Text
                style={[
                  theme.typography.subtitle2,
                  {
                    color: theme.palette.text.secondary,
                  },
                ]}
              >
                {date}
              </Text>
            </View>
          }
          ListFooterComponent={<></>}
          refreshControl={
            <RefreshControl
              refreshing={bingImgs.isRefetching}
              onRefresh={() => bingImgs.refetch()}
              colors={[theme.palette.primary.main]}
            />
          }
          contentContainerStyle={{
            gap: theme.spacing(4),
            padding: theme.spacing(3),
          }}
          style={{ flex: 1 }}
        />
      </>
    );
  };

  return <OffLine fallback={<OfflineScreen />}>{renderBingImage()}</OffLine>;
};

export default Bing;
