import { useQuery } from "@tanstack/react-query";
import { openBrowserAsync } from "expo-web-browser";
import React from "react";
import {
  ImageBackground,
  Linking,
  Pressable,
  RefreshControl,
  ScrollView,
  Share,
  Text,
  View,
} from "react-native";
import { fetchCnBingImage } from "@/api/fetchBingImage";
import { useLocaleDate } from "@/hooks/useLocaleDate";
import { useLocaleTime } from "@/hooks/useLocaleTime";
import { useTheme } from "@/hooks/useTheme";

export default function Bing() {
  const bingImgs = useQuery(fetchCnBingImage({ format: "js", idx: 0, n: 8 }));
  const theme = useTheme();
  const date = useLocaleDate();
  const time = useLocaleTime();

  return (
    <ScrollView
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
      style={{ borderWidth: 1, borderColor: "red", flex: 1 }}
    >
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
          style={[theme.typography.h5, { color: theme.palette.text.primary }]}
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
      {bingImgs.isSuccess &&
        bingImgs.data.data.images.map((i) => (
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
            onLongPress={async () =>
              Share.share({ message: `https://cn.bing.com${i.url}` })
            }
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
        ))}
    </ScrollView>
  );
}
