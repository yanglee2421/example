import { fetchHistoryGet } from "@/api/fetchHistoryGet";
import { useLocaleDate } from "@/hooks/useLocaleDate";
import { useLocaleTime } from "@/hooks/useLocaleTime";
import { Card, makeStyles, Text, useTheme } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import { useLocales } from "expo-localization";
import { RefreshControl, ScrollView } from "react-native";
import { openBrowserAsync } from "expo-web-browser";
import { openURL } from "expo-linking";
import { Empty } from "@/components/Empty";

export default function Home() {
  const [{ languageTag }] = useLocales();
  const date = useLocaleDate(languageTag);
  const time = useLocaleTime(languageTag);
  const { theme } = useTheme();
  const history = useQuery(fetchHistoryGet());
  const styles = useStyles();

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={history.isRefetching}
          onRefresh={() => history.refetch()}
          colors={[theme.colors.primary]}
        />
      }
      contentContainerStyle={styles.container}
    >
      <Card>
        <Card.Title>{time}</Card.Title>
        <Card.FeaturedSubtitle style={{ color: theme.colors.secondary }}>
          {date}
        </Card.FeaturedSubtitle>
      </Card>
      {history.isPending && <Empty />}
      {history.isSuccess && history.data.data.data.map((i) => (
        <Card key={i.url}>
          <Card.FeaturedTitle style={styles.itemTitle}>
            {i.year}
          </Card.FeaturedTitle>
          <Text
            onPress={async () => {
              try {
                await openBrowserAsync(i.url, {
                  toolbarColor: theme.colors.background,
                  enableBarCollapsing: true,
                  enableDefaultShareMenuItem: true,

                  createTask: false,
                });
              } catch {
                openURL(i.url);
              }
            }}
            style={styles.itemText}
          >
            {i.title}
          </Text>
        </Card>
      ))}
    </ScrollView>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {},
  itemTitle: {
    color: theme.colors.black,
  },
  itemText: {
    textDecorationLine: "underline",
  },
  empty: {
    padding: 12,
  },
}));
