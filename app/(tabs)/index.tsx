import { fetchCnBingImage } from "@/api/fetchCnBingImage";
import { useLocaleDate } from "@/hooks/useLocaleDate";
import { useLocaleTime } from "@/hooks/useLocaleTime";
import { Card, makeStyles, Text, Tile, useTheme } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import { useLocales } from "expo-localization";
import React from "react";
import { RefreshControl, ScrollView } from "react-native";
import { openBrowserAsync } from "expo-web-browser";
import { openURL } from "expo-linking";

export default function Home() {
  const [{ languageTag }] = useLocales();
  const date = useLocaleDate(languageTag);
  const time = useLocaleTime(languageTag);
  const styles = useStyles();
  const bingImgs = useQuery(fetchCnBingImage({ format: "js", idx: 0, n: 8 }));
  const [imgWidth, setImgWidth] = React.useState(0);
  const { theme } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      onLayout={(e) => {
        setImgWidth(e.nativeEvent.layout.width);
      }}
      refreshControl={
        <RefreshControl
          refreshing={bingImgs.isRefetching}
          onRefresh={() => bingImgs.refetch()}
          progressBackgroundColor={theme.colors.black}
          colors={[theme.colors.primary]}
        />
      }
    >
      <Card
        containerStyle={{ margin: 0 }}
      >
        <Card.Title>Clock</Card.Title>
        <Card.FeaturedTitle style={styles.time}>{time}</Card.FeaturedTitle>
        <Card.FeaturedSubtitle style={styles.date}>
          {date}
        </Card.FeaturedSubtitle>
      </Card>

      {bingImgs.isSuccess && bingImgs.data.data.images.map((i) => (
        <Tile
          key={i.url}
          imageSrc={{ uri: `https://cn.bing.com${i.url}` }}
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
          width={imgWidth - 24}
        />
      ))}
    </ScrollView>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    gap: 12,
    padding: 12,
  },
  time: {
    color: theme.colors.black,
  },
  date: {
    color: theme.colors.secondary,
  },
}));
