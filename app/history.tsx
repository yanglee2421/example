import { Linking, RefreshControl, ScrollView, Text, View } from "react-native";
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
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const history = useQuery({ ...fetcher, enabled: !!apikey });

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={history.isRefetching}
          onRefresh={() => history.refetch()}
        />
      }
    >
      <Text>
        {time}
      </Text>
      <Text>
        {date}
      </Text>
      {history.isLoading && <Loading />}
      {history.isPending && !history.isFetching && <NeedAPIKEY />}
      {history.isError && <Text>Error</Text>}
      {history.isSuccess && history.data.data.data.map((i) => (
        <View key={i.url}>
          <Text>
            {i.year}
          </Text>
          <Text
            onPress={async () => {
              try {
                await openBrowserAsync(i.url, {
                  toolbarColor: "#000",
                  enableBarCollapsing: true,
                  enableDefaultShareMenuItem: true,

                  createTask: false,
                });
              } catch {
                Linking.openURL(i.url);
              }
            }}
          >
            {i.title}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
