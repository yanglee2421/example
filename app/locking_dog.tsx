import React from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  ScrollView,
  Share,
  View,
} from "react-native";
import { Button, Card, Text, useTheme } from "@rneui/themed";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDiary } from "@/api/fetchDiary";
import { Loading } from "@/components/Loading";
import { NeedAPIKEY } from "@/components/NeedAPIKEY";
import { useStorageStore } from "@/hooks/useStorageStore";
import { setStringAsync } from "expo-clipboard";

const fetcher = fetchDiary();

export default function Page() {
  const { theme } = useTheme();
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
              colors={[theme.colors.primary]}
            />
          }
        >
          <Card>
            <Text>Error</Text>
          </Card>
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
                colors={[theme.colors.primary]}
              />
            }
            data={diary.data.pages}
            renderItem={({ item, index }) => (
              <React.Fragment key={item.data.data}>
                <Card>
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
                </Card>

                {Object.is(index + 1, diary.data.pages.length) && (
                  <View
                    style={{ margin: 12 }}
                  >
                    <Button
                      onPress={() => diary.fetchNextPage()}
                      loading={diary.isFetchingNextPage}
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
