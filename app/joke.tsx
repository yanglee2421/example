import React from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  Share,
  View,
} from "react-native";
import { Button, Card, Text, useTheme } from "@rneui/themed";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { fetchJoke } from "@/api/fetchJoke";
import { Loading } from "@/components/Loading";
import { NeedAPIKEY } from "@/components/NeedAPIKEY";
import { useStorageStore } from "@/hooks/useStorageStore";

const fetcher = fetchJoke();

export default function Page() {
  const { theme } = useTheme();
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const jokes = useInfiniteQuery({ ...fetcher, enabled: !!apikey });
  const queryClient = useQueryClient();

  return (
    <>
      {jokes.isLoading && <Loading />}
      {jokes.isPending && !jokes.isFetching && <NeedAPIKEY />}
      {jokes.isError && (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={jokes.isRefetching}
              onRefresh={() => {
                queryClient.removeQueries({ queryKey: fetcher.queryKey });
                jokes.refetch();
              }}
              colors={[theme.colors.primary]}
            />
          }
        >
          <Card>
            <Text>Error</Text>
          </Card>
        </ScrollView>
      )}
      {jokes.isSuccess && (
        <>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={jokes.isRefetching}
                onRefresh={() => {
                  queryClient.removeQueries({ queryKey: fetcher.queryKey });
                  jokes.refetch();
                }}
                colors={[theme.colors.primary]}
              />
            }
            data={jokes.data.pages}
            renderItem={({ item, index }) => (
              <React.Fragment key={item.data.data.joke}>
                <Card>
                  <Text
                    onLongPress={() => {
                      Share.share({ message: item.data.data.joke });
                    }}
                  >
                    {item.data.data.joke}
                  </Text>
                </Card>
                {Object.is(index + 1, jokes.data.pages.length) && (
                  <View style={{ padding: 12 }}>
                    <Button
                      onPress={() =>
                        jokes.fetchNextPage()}
                      loading={jokes.isFetchingNextPage}
                    >
                      Click to fetch more
                    </Button>
                  </View>
                )}
              </React.Fragment>
            )}
          />
        </>
      )}
    </>
  );
}
