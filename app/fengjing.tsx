import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Share,
  Text,
  View,
} from "react-native";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { fetchFengjing } from "@/api/fetchFengjing";
import { Loading } from "@/components/Loading";
import { NeedAPIKEY } from "@/components/NeedAPIKEY";
import { useStorageStore } from "@/hooks/useStorageStore";

const fetcher = fetchFengjing();

export default function Page() {
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const fengjing = useInfiniteQuery({ ...fetcher, enabled: !!apikey });
  const queryClient = useQueryClient();
  const [imgWidth, setImgWidth] = React.useState(0);

  return (
    <>
      {fengjing.isLoading && <Loading />}
      {fengjing.isPending && !fengjing.isFetching && <NeedAPIKEY />}
      {fengjing.isError && (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={fengjing.isRefetching}
              onRefresh={() => {
                queryClient.removeQueries({ queryKey: fetcher.queryKey });
                fengjing.refetch();
              }}
            />
          }
        >
          <Text>Error</Text>
        </ScrollView>
      )}
      {fengjing.isSuccess && (
        <>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={fengjing.isRefetching}
                onRefresh={() => {
                  queryClient.removeQueries({ queryKey: fetcher.queryKey });
                  fengjing.refetch();
                }}
              />
            }
            data={fengjing.data.pages}
            renderItem={({ item, index }) => (
              <React.Fragment key={item.data.data.cover}>
                <Image
                  source={{ uri: item.data.data.cover }}
                  width={imgWidth}
                  height={imgWidth / 16 * 9}
                />
                {Object.is(index + 1, fengjing.data.pages.length) && (
                  <Pressable
                    onPress={() => fengjing.fetchNextPage()}
                    onLayout={(e) =>
                      setImgWidth(e.nativeEvent.layout.width)}
                    android_ripple={{ radius: imgWidth }}
                  >
                    <Text>Click to fetch more</Text>
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
