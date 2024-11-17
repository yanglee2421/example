import React from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  Share,
  Text,
} from "react-native";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { fetchRandtext } from "@/api/fetchRandtext";
import { Loading } from "@/components/Loading";
import { NeedAPIKEY } from "@/components/NeedAPIKEY";
import { useStorageStore } from "@/hooks/useStorageStore";

const fetcher = fetchRandtext();

export default function Page() {
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const randtext = useInfiniteQuery({ ...fetcher, enabled: !!apikey });
  const queryClient = useQueryClient();

  return (
    <>
      {randtext.isLoading && <Loading />}
      {randtext.isPending && !randtext.isFetching && <NeedAPIKEY />}
      {randtext.isError && (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={randtext.isRefetching}
              onRefresh={() => {
                queryClient.removeQueries({ queryKey: fetcher.queryKey });
                randtext.refetch();
              }}
              colors={["#000"]}
            />
          }
        >
          <Text>Error</Text>
        </ScrollView>
      )}
      {randtext.isSuccess && (
        <>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={randtext.isRefetching}
                onRefresh={() => {
                  queryClient.removeQueries({ queryKey: fetcher.queryKey });
                  randtext.refetch();
                }}
                colors={["#000"]}
              />
            }
            data={randtext.data.pages}
            renderItem={({ item, index }) => (
              <React.Fragment key={item.data.data}>
                <Text
                  onLongPress={() =>
                    Share.share({ message: item.data.data })}
                >
                  {item.data.data}
                </Text>
                {Object.is(index + 1, randtext.data.pages.length) && (
                  <Pressable
                    onPress={() => randtext.fetchNextPage()}
                    disabled={randtext.isFetchingNextPage}
                  >
                    <Text>
                      Click to fetch more
                    </Text>
                  </Pressable>
                )}
              </React.Fragment>
            )}
          />
        </>
      )}
    </>
  );
}
