import React from "react";
import {
  ImageBackground,
  Linking,
  Pressable,
  RefreshControl,
  ScrollView,
  Share,
  Text,
} from "react-native";
import { openBrowserAsync } from "expo-web-browser";
import { useQuery } from "@tanstack/react-query";
import { fetchCnBingImage } from "@/api/fetchBingImage";

export default function Bing() {
  const bingImgs = useQuery(fetchCnBingImage({ format: "js", idx: 0, n: 8 }));
  const [imgWidth, setImgWidth] = React.useState(0);

  return (
    <ScrollView
      onLayout={(e) => setImgWidth(e.nativeEvent.layout.width)}
      refreshControl={
        <RefreshControl
          refreshing={bingImgs.isRefetching}
          onRefresh={() => bingImgs.refetch()}
          colors={["#000"]}
        />
      }
    >
      {bingImgs.isSuccess &&
        bingImgs.data.data.images.map((i) => (
          <Pressable
            key={i.urlbase}
            onLongPress={async () =>
              Share.share({ message: `https://cn.bing.com${i.url}` })}
            android_ripple={{
              foreground: true,
              borderless: false,
              color: "#000",
              radius: imgWidth,
            }}
          >
            <ImageBackground source={{ uri: `https://cn.bing.com${i.url}` }}>
              <Text>{i.title}</Text>
              <Text
                onPress={async () => {
                  try {
                    await openBrowserAsync(i.copyrightlink, {
                      toolbarColor: "#000",
                      enableBarCollapsing: true,
                      enableDefaultShareMenuItem: true,

                      createTask: false,
                    });
                  } catch {
                    Linking.openURL(i.copyrightlink);
                  }
                }}
              >
                {i.copyright}
              </Text>
            </ImageBackground>
          </Pressable>
        ))}
    </ScrollView>
  );
}
