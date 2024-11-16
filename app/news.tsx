import { fetchNews } from "@/api/fetchNews";
import { Empty } from "@/components/Empty";
import { Card, Text, useTheme } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import { RefreshControl, ScrollView } from "react-native";

export default function News() {
  const news = useQuery(fetchNews());
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
      {news.isPending && <Empty />}
      {news.isSuccess && (
        <>
          <Card>
            <Card.Title>{news.data.data.data.date}</Card.Title>
            <Card.FeaturedSubtitle style={{ color: theme.colors.secondary }}>
              {news.data.data.data.weiyu}
            </Card.FeaturedSubtitle>
          </Card>
          {news.data.data.data.news.map((i) => (
            <Card key={i}>
              <Text>{i}</Text>
            </Card>
          ))}
        </>
      )}
    </ScrollView>
  );
}
