import React from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  Share,
  Text,
  View,
} from "react-native";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { fetchJoke } from "@/api/fetchJoke";
import { Loading } from "@/components/Loading";
import { NeedAPIKEY } from "@/components/NeedAPIKEY";
import { useStorageStore } from "@/hooks/useStorageStore";

const fetcher = fetchJoke();

export default function Page() {
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
            />
          }
        >
          <Text>Error</Text>
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
              />
            }
            data={jokes.data.pages}
            renderItem={({ item, index }) => (
              <React.Fragment key={item.data.data.joke}>
                <Text
                  onLongPress={() => {
                    Share.share({ message: item.data.data.joke });
                  }}
                >
                  {item.data.data.joke}
                </Text>
                {Object.is(index + 1, jokes.data.pages.length) && (
                  <View style={{ padding: 12 }}>
                    <Pressable
                      onPress={() =>
                        jokes.fetchNextPage()}
                    >
                      <Text>
                        Click to fetch more
                      </Text>
                    </Pressable>
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
