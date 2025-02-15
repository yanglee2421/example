import React from "react";
import {
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  Share,
  Text,
} from "react-native";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDiary } from "@/api/fetchDiary";
import { Loading } from "@/components/Loading";
import { NeedAPIKEY } from "@/components/NeedAPIKEY";
import { useStorageStore } from "@/hooks/useStorageStore";
import { setStringAsync } from "expo-clipboard";
import { android_ripple } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

const fetcher = fetchDiary();

export default function Page() {
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const diary = useInfiniteQuery({
    ...fetcher,
    enabled: !!apikey,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const queryClient = useQueryClient();
  const theme = useTheme();

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
              colors={[theme.palette.primary.main]}
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
            contentContainerStyle={{
              padding: theme.spacing(3),
              gap: theme.spacing(3),
            }}
            data={diary.data.pages}
            keyExtractor={(i) => i.data.data}
            renderItem={({ item, index }) => (
              <>
                <Pressable
                  onPress={async () => {
                    try {
                      await setStringAsync(item.data.data);
                      await Share.share({ message: item.data.data });
                    } catch {
                      Alert.alert("Error");
                    }
                  }}
                  style={[
                    theme.shape,
                    {
                      borderColor: theme.palette.divider,
                      borderWidth: 1,

                      padding: theme.spacing(3),
                    },
                  ]}
                  android_ripple={android_ripple(theme.palette.action.focus)}
                >
                  <Text
                    style={[
                      theme.typography.body1,
                      {
                        color: theme.palette.text.primary,
                      },
                    ]}
                  >
                    {item.data.data}
                  </Text>
                </Pressable>

                {Object.is(index + 1, diary.data.pages.length) && (
                  <Pressable
                    onPress={() => diary.fetchNextPage()}
                    disabled={diary.isFetchingNextPage}
                    style={[
                      theme.shape,
                      {
                        backgroundColor: diary.isFetchingNextPage
                          ? theme.palette.action.disabledBackground
                          : theme.palette.primary.main,

                        paddingInline: theme.spacing(4),
                        paddingBlock: theme.spacing(2),
                        marginBlockStart: theme.spacing(3),
                      },
                    ]}
                    android_ripple={android_ripple(theme.palette.action.focus)}
                  >
                    <Text
                      style={[
                        theme.typography.button,
                        {
                          color: diary.isFetchingNextPage
                            ? theme.palette.action.disabled
                            : theme.palette.primary.contrastText,
                          textAlign: "center",
                        },
                      ]}
                    >
                      Click to fetch more
                    </Text>
                  </Pressable>
                )}
              </>
            )}
          />
        </>
      )}
    </>
  );
}
