import { Linking, RefreshControl, ScrollView } from "react-native";
import { Card, makeStyles, Text, useTheme } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import { openBrowserAsync } from "expo-web-browser";
import { fetchHistoryGet } from "@/api/fetchHistoryGet";
import { useLocaleDate } from "@/hooks/useLocaleDate";
import { useLocaleTime } from "@/hooks/useLocaleTime";
import { Loading } from "@/components/Loading";
import { NeedAPIKEY } from "@/components/NeedAPIKEY";
import { useStorageStore } from "@/hooks/useStorageStore";

const fetcher = fetchHistoryGet();

export default function Page() {
  const date = useLocaleDate();
  const time = useLocaleTime();
  const { theme } = useTheme();
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const history = useQuery({ ...fetcher, enabled: !!apikey });
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
    >
      <Card>
        <Card.FeaturedTitle style={{ color: theme.colors.black }}>
          {time}
        </Card.FeaturedTitle>
        <Card.FeaturedSubtitle style={{ color: theme.colors.secondary }}>
          {date}
        </Card.FeaturedSubtitle>
      </Card>
      {history.isLoading && <Loading />}
      {history.isPending && !history.isFetching && <NeedAPIKEY />}
      {history.isError && (
        <Card>
          <Text>Error</Text>
        </Card>
      )}
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
                Linking.openURL(i.url);
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
