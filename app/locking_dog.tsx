import React from "react";
import {
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  Share,
  Text,
  View,
} from "react-native";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDiary } from "@/api/fetchDiary";
import { Loading } from "@/components/Loading";
import { NeedAPIKEY } from "@/components/NeedAPIKEY";
import { useStorageStore } from "@/hooks/useStorageStore";
import { setStringAsync } from "expo-clipboard";

const fetcher = fetchDiary();

export default function Page() {
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const diary = useInfiniteQuery({ ...fetcher, enabled: !!apikey });
  const queryClient = useQueryClient();

  return (
    <>
      {diary.isLoading && <Loading />}
      {diary.isPending && !diary.isFetching && <NeedAPIKEY />}
      {diary.isError && (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={diary.isRefetching}
              onRefresh={() => {
                queryClient.removeQueries({ queryKey: fetcher.queryKey });
                diary.refetch();
              }}
            />
          }
        >
          <Text>Error</Text>
        </ScrollView>
      )}
      {diary.isSuccess && (
        <>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={diary.isRefetching}
                onRefresh={() => {
                  queryClient.removeQueries({ queryKey: fetcher.queryKey });
                  diary.refetch();
                }}
              />
            }
            data={diary.data.pages}
            renderItem={({ item, index }) => (
              <React.Fragment key={item.data.data}>
                <Text
                  onLongPress={async () => {
                    try {
                      await setStringAsync(item.data.data);
                      await Share.share({ message: item.data.data });
                    } catch {
                      Alert.alert("Error");
                    }
                  }}
                >
                  {item.data.data}
                </Text>

                {Object.is(index + 1, diary.data.pages.length) && (
                  <View
                    style={{ margin: 12 }}
                  >
                    <Pressable
                      onPress={() => diary.fetchNextPage()}
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
