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
import { fetchRandtext } from "@/api/fetchRandtext";
import { Loading } from "@/components/Loading";
import { NeedAPIKEY } from "@/components/NeedAPIKEY";
import { useStorageStore } from "@/hooks/useStorageStore";
import { android_ripple } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

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
  const theme = useTheme();

  return (
    <>
      {randtext.isLoading && <Loading />}
      {randtext.isPending && !randtext.isFetching && (
        <View style={{ padding: theme.spacing(3) }}>
          <NeedAPIKEY />
        </View>
      )}
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
            style={[
              theme.typography.body1,
              {
                color: theme.palette.error.main,
              },
            ]}
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
            data={randtext.data.pages}
            keyExtractor={(i) => i.data.data}
            renderItem={({ item, index }) => (
              <>
                <Pressable
                  onPress={() => Share.share({ message: item.data.data })}
                  style={[
                    {
                      borderWidth: 1,
                      borderColor: "transparent",
                      borderBlockEndColor: theme.palette.divider,

                      paddingInline: theme.spacing(6),
                      paddingBlock: theme.spacing(3),
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

                {Object.is(index + 1, randtext.data.pages.length) && (
                  <Pressable
                    onPress={() => randtext.fetchNextPage()}
                    disabled={randtext.isFetchingNextPage}
                    style={[
                      {
                        paddingInline: theme.spacing(6),
                        paddingBlock: theme.spacing(3),
                      },
                      theme.shape,
                    ]}
                    android_ripple={android_ripple(theme.palette.action.focus)}
                  >
                    <Text
                      style={[
                        theme.typography.body1,
                        {
                          color: randtext.isFetchingNextPage
                            ? theme.palette.text.disabled
                            : theme.palette.text.primary,
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
