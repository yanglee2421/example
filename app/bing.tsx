import React from "react";
import { Linking, RefreshControl, Share } from "react-native";
import { openBrowserAsync } from "expo-web-browser";
import { useQuery } from "@tanstack/react-query";
import { fetchCnBingImage } from "@/api/fetchBingImage";
import { Card, H5, Image, ScrollView, Text } from "tamagui";

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
      contentContainerStyle={{ gap: "$4", padding: "$3" }}
    >
      {bingImgs.isSuccess &&
        bingImgs.data.data.images.map((i) => (
          <Card
            key={i.urlbase}
            onLongPress={async () =>
              Share.share({ message: `https://cn.bing.com${i.url}` })}
            padded
          >
            <Card.Header padded>
              <H5>{i.title}</H5>
            </Card.Header>
            <Card.Background>
              <Image
                source={{ uri: `https://cn.bing.com${i.url}` }}
                objectFit="contain"
                width={imgWidth}
                height={imgWidth / 16 * 9}
              />
            </Card.Background>
            <Card.Footer padded>
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
            </Card.Footer>
          </Card>
        ))}
    </ScrollView>
  );
}
