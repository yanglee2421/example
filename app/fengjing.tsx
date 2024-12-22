import React from "react";
import {
  FlatList,
  ImageBackground,
  Pressable,
  RefreshControl,
  ScrollView,
  Share,
  Text,
} from "react-native";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { fetchFengjing } from "@/api/fetchFengjing";
import { Loading } from "@/components/Loading";
import { NeedAPIKEY } from "@/components/NeedAPIKEY";
import { useStorageStore } from "@/hooks/useStorageStore";
import { android_ripple } from "@/lib/utils";
import { useThemeStore } from "@/hooks/useThemeStore";

const fetcher = fetchFengjing();

export default function Page() {
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const fengjing = useInfiniteQuery({ ...fetcher, enabled: !!apikey });
  const queryClient = useQueryClient();
  const theme = useThemeStore((s) => s.theme);

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
                colors={[theme.palette.primary.main]}
              />
            }
            contentContainerStyle={{
              padding: theme.spacing(3),
              gap: theme.spacing(3),
            }}
            data={fengjing.data.pages}
            keyExtractor={(i) => i.data.data.cover}
            renderItem={({ item, index }) => (
              <>
                <ImageBackground
                  source={{ uri: item.data.data.cover }}
                  style={[
                    { aspectRatio: 16 / 9, overflow: "hidden" },
                    theme.shape,
                  ]}
                >
                  <Pressable
                    onPress={() =>
                      Share.share({ message: item.data.data.cover })
                    }
                    style={[
                      {
                        backgroundColor: `rgba(0,0,0,${theme.palette.action.disabledOpacity})`,
                        position: "absolute",
                        inset: 0,

                        justifyContent: "center",
                        alignItems: "center",
                      },
                    ]}
                    android_ripple={android_ripple(theme.palette.action.focus)}
                  >
                    <Text
                      style={[
                        theme.typography.h6,
                        {
                          color: theme.palette.common.white,
                          textAlign: "center",
                        },
                      ]}
                    >
                      {item.data.data.tag}
                    </Text>
                  </Pressable>
                </ImageBackground>

                {Object.is(index + 1, fengjing.data.pages.length) && (
                  <Pressable
                    onPress={() => fengjing.fetchNextPage()}
                    disabled={fengjing.isFetchingNextPage}
                    style={[
                      theme.shape,
                      {
                        backgroundColor: fengjing.isPending
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
                          color: fengjing.isPending
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
