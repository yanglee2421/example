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
import { android_ripple } from "@/lib/utils";

const fetcher = fetchRandtext();

export default function Page() {
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const randtext = useInfiniteQuery({
    ...fetcher,
    enabled: !!apikey,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const queryClient = useQueryClient();
  const theme = useStorageStore((s) => s.theme);

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
              colors={[theme.palette.primary.main]}
            />
          }
        >
          <Text
            style={[theme.typography.body1, {
              color: theme.palette.error.main,
            }]}
          >
            Error
          </Text>
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
                colors={[theme.palette.primary.main]}
              />
            }
            contentContainerStyle={{
              padding: theme.space(3),
              gap: theme.space(3),
            }}
            data={randtext.data.pages}
            keyExtractor={(i) => i.data.data}
            renderItem={({ item, index }) => (
              <>
                <Pressable
                  onPress={() => Share.share({ message: item.data.data })}
                  style={[theme.shape, {
                    borderWidth: 1,
                    borderColor: theme.palette.divider,

                    padding: theme.space(3),
                  }]}
                  android_ripple={android_ripple(theme.palette.action.focus)}
                >
                  <Text
                    style={[theme.typography.body1, {
                      color: theme.palette.text.primary,
                    }]}
                  >
                    {item.data.data}
                  </Text>
                </Pressable>

                {Object.is(index + 1, randtext.data.pages.length) && (
                  <Pressable
                    onPress={() => randtext.fetchNextPage()}
                    disabled={randtext.isFetchingNextPage}
                    style={[
                      {
                        backgroundColor: randtext.isFetchingNextPage
                          ? theme.palette.action.disabledBackground
                          : theme.palette.primary.main,

                        paddingInline: theme.space(4),
                        paddingBlock: theme.space(2),
                        marginBlockStart: theme.space(3),
                      },
                      theme.shape,
                    ]}
                    android_ripple={android_ripple(theme.palette.action.focus)}
                  >
                    <Text
                      style={[theme.typography.button, {
                        color: randtext.isFetchingNextPage
                          ? theme.palette.action.disabled
                          : theme.palette.primary.contrastText,
                        textAlign: "center",
                      }]}
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
