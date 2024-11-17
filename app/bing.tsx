import { fetchCnBingImage } from "@/api/fetchBingImage";
import { makeStyles, Text, Tile, useTheme } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { RefreshControl, ScrollView, Share } from "react-native";
import { openBrowserAsync } from "expo-web-browser";
import { openURL } from "expo-linking";

export default function Bing() {
  const styles = useStyles();
  const bingImgs = useQuery(fetchCnBingImage({ format: "js", idx: 0, n: 8 }));
  const [imgWidth, setImgWidth] = React.useState(0);
  const { theme } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      onLayout={(e) => setImgWidth(e.nativeEvent.layout.width)}
      refreshControl={
        <RefreshControl
          refreshing={bingImgs.isRefetching}
          onRefresh={() => bingImgs.refetch()}
          colors={[theme.colors.primary]}
        />
      }
    >
      {bingImgs.isSuccess && bingImgs.data.data.images.map((i) => (
        <Tile
          key={i.url}
          imageSrc={{ uri: `https://cn.bing.com${i.url}` }}
          imageProps={{ resizeMode: "contain" }}
          width={imgWidth - 24}
          height={imgWidth / 16 * 9}
          title={i.title}
          caption={
            <Text
              onPress={async () => {
                try {
                  await openBrowserAsync(i.copyrightlink, {
                    toolbarColor: theme.colors.background,
                    enableBarCollapsing: true,
                    enableDefaultShareMenuItem: true,

                    createTask: false,
                  });
                } catch {
                  openURL(i.copyrightlink);
                }
              }}
              style={{
                textDecorationLine: "underline",
                color: "#fff",
              }}
            >
              {i.copyright}
            </Text>
          }
          featured
          activeOpacity={.7}
          onPress={() => Share.share({ url: `https://cn.bing.com${i.url}` })}
        />
      ))}
    </ScrollView>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingInline: 12,
    paddingBlock: 8,
  },
  time: {
    color: theme.colors.black,
  },
  date: {
    color: theme.colors.secondary,
  },
}));
