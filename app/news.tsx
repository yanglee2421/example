import { RefreshControl, ScrollView, Share, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "@/api/fetchNews";
import { Loading } from "@/components/Loading";
import { NeedAPIKEY } from "@/components/NeedAPIKEY";
import { useStorageStore } from "@/hooks/useStorageStore";

const fetcher = fetchNews();

export default function News() {
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const news = useQuery({ ...fetcher, enabled: !!apikey });

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={news.isRefetching}
          onRefresh={() => news.refetch()}
          colors={["#fff"]}
        />
      }
    >
      {news.isLoading && <Loading />}
      {news.isPending && !news.isFetching && <NeedAPIKEY />}
      {news.isError && <Text>Error</Text>}
      {news.isSuccess && (
        <View>
          <Text>{news.data.data.data.date}</Text>
          <Text>{news.data.data.data.weiyu}</Text>
          {news.data.data.data.news.map((i) => (
            <Text
              key={i}
              onLongPress={() => Share.share({ message: i })}
            >
              {i}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
