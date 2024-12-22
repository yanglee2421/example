import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
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
import { fetchJoke } from "@/api/fetchJoke";
import { Loading } from "@/components/Loading";
import { NeedAPIKEY } from "@/components/NeedAPIKEY";
import { useStorageStore } from "@/hooks/useStorageStore";
import { useThemeStore } from "@/hooks/useThemeStore";

const fetcher = fetchJoke();

export default function Page() {
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const jokes = useInfiniteQuery({
    ...fetcher,
    enabled: !!apikey,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const queryClient = useQueryClient();
  const theme = useThemeStore((s) => s.theme);

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
              colors={[theme.palette.primary.main]}
            />
          }
          contentContainerStyle={{ padding: theme.spacing(6) }}
        >
          <Text
            style={[
              theme.typography.body1,
              {
                color: theme.palette.text.primary,
              },
            ]}
          >
            Error
          </Text>
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
                colors={[theme.palette.primary.main]}
              />
            }
            contentContainerStyle={{
              padding: theme.spacing(3),
              gap: theme.spacing(3),
            }}
            data={jokes.data.pages}
            keyExtractor={(i) => i.data.data.joke}
            renderItem={({ item, index }) => (
              <>
                <View
                  style={[
                    {
                      borderWidth: 1,
                      borderColor: theme.palette.divider,

                      paddingInline: theme.spacing(4),
                      paddingBlock: theme.spacing(2),
                    },
                    theme.shape,
                  ]}
                >
                  <Text
                    onLongPress={() => {
                      Share.share({ message: item.data.data.joke });
                    }}
                    style={[
                      theme.typography.body1,
                      {
                        color: theme.palette.text.primary,
                      },
                    ]}
                  >
                    {item.data.data.joke}
                  </Text>
                </View>

                {Object.is(index + 1, jokes.data.pages.length) && (
                  <Pressable
                    onPress={() => jokes.fetchNextPage()}
                    disabled={jokes.isFetchingNextPage}
                    style={[
                      {
                        backgroundColor: jokes.isFetchingNextPage
                          ? theme.palette.action.disabledBackground
                          : theme.palette.primary.main,

                        paddingInline: theme.spacing(4),
                        paddingBlock: theme.spacing(2),

                        marginBlockStart: theme.spacing(3),
                      },
                      theme.shape,
                    ]}
                    android_ripple={{
                      color: theme.palette.action.focus,
                      foreground: true,
                      borderless: false,
                    }}
                  >
                    <Text
                      style={[
                        theme.typography.button,
                        {
                          color: jokes.isFetchingNextPage
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
