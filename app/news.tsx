import { RefreshControl, ScrollView, Share } from "react-native";
import { Card, Text, useTheme } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "@/api/fetchNews";
import { Loading } from "@/components/Loading";
import { NeedAPIKEY } from "@/components/NeedAPIKEY";
import { useStorageStore } from "@/hooks/useStorageStore";

const fetcher = fetchNews();

export default function News() {
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const news = useQuery({ ...fetcher, enabled: !!apikey });
  const { theme } = useTheme();

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={news.isRefetching}
          onRefresh={() => news.refetch()}
          colors={[theme.colors.primary]}
        />
      }
    >
      {news.isLoading && <Loading />}
      {news.isPending && !news.isFetching && <NeedAPIKEY />}
      {news.isError && (
        <Card>
          <Text>Error</Text>
        </Card>
      )}
      {news.isSuccess && (
        <>
          <Card>
            <Card.FeaturedTitle style={{ color: theme.colors.black }}>
              {news.data.data.data.date}
            </Card.FeaturedTitle>
            <Card.FeaturedSubtitle style={{ color: theme.colors.secondary }}>
              {news.data.data.data.weiyu}
            </Card.FeaturedSubtitle>
          </Card>
          {news.data.data.data.news.map((i) => (
            <Card key={i}>
              <Text onLongPress={() => Share.share({ message: i })}>{i}</Text>
            </Card>
          ))}
        </>
      )}
    </ScrollView>
  );
}
