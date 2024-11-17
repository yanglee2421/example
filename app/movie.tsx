import { FlatList, RefreshControl, ScrollView } from "react-native";
import { Button, Card, Text, useTheme } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import { fetchJijiangshangying } from "@/api/fetchJijiangshangying";
import { Loading } from "@/components/Loading";
import { NeedAPIKEY } from "@/components/NeedAPIKEY";
import { useStorageStore } from "@/hooks/useStorageStore";

const fetcher = fetchJijiangshangying();

export default function Page() {
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const movies = useQuery({ ...fetcher, enabled: !!apikey });
  const { theme } = useTheme();

  return (
    <>
      {movies.isLoading && <Loading />}
      {movies.isPending && !movies.isFetching && <NeedAPIKEY />}
      {movies.isError && (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={movies.isRefetching}
              onRefresh={() => movies.refetch()}
              colors={[theme.colors.primary]}
            />
          }
        >
          <Card>
            <Text>Error</Text>
          </Card>
        </ScrollView>
      )}
      {movies.isSuccess && (
        <>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={movies.isRefetching}
                onRefresh={() => movies.refetch()}
                colors={[theme.colors.primary]}
              />
            }
            data={movies.data.data.data}
            renderItem={({ item }) => (
              <Card key={item.title}>
                <Card.Title>{item.title}</Card.Title>
                <Card.Divider />
                <Card.Image source={{ uri: item.picUrl }} resizeMode="center" />
                <Card.FeaturedTitle
                  style={{ color: theme.colors.black, marginBlockStart: 8 }}
                >
                  {item.director}
                </Card.FeaturedTitle>
                <Card.FeaturedSubtitle
                  style={{ color: theme.colors.secondary }}
                >
                  {item.type}
                </Card.FeaturedSubtitle>
                <Text>{item.actors}</Text>
                <Button
                  disabled
                  disabledStyle={{
                    backgroundColor: theme.colors.primary,
                    marginBlockStart: 8,
                  }}
                  disabledTitleStyle={{ color: "#fff" }}
                >
                  {item.releaseDateStr}
                </Button>
              </Card>
            )}
          />
        </>
      )}
    </>
  );
}
