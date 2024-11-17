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
import { fetchRandtext } from "@/api/fetchRandtext";
import { Loading } from "@/components/Loading";
import { NeedAPIKEY } from "@/components/NeedAPIKEY";
import { useStorageStore } from "@/hooks/useStorageStore";

const fetcher = fetchRandtext();

export default function Page() {
  const { theme } = useTheme();
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
              colors={[theme.colors.primary]}
            />
          }
        >
          <Card>
            <Text>Error</Text>
          </Card>
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
                colors={[theme.colors.primary]}
              />
            }
            data={randtext.data.pages}
            renderItem={({ item, index }) => (
              <React.Fragment key={item.data.data}>
                <Card>
                  <Text
                    onLongPress={() => {
                      Share.share({ message: item.data.data });
                    }}
                  >
                    {item.data.data}
                  </Text>
                </Card>
                {Object.is(index + 1, randtext.data.pages.length) && (
                  <View style={{ padding: 12 }}>
                    <Button
                      onPress={() =>
                        randtext.fetchNextPage()}
                      loading={randtext.isFetchingNextPage}
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
