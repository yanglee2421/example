import { Loading } from "@/components/Loading";
import { db } from "@/db/db";
import * as schemas from "@/db/schema";
import { useTheme } from "@/hooks/useTheme";
import {
  infiniteQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native";
import { c } from "@/lib/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { android_ripple } from "@/lib/utils";

const fetchChats = () =>
  infiniteQueryOptions({
    queryKey: ["db.query.chatTable.findMany"],
    queryFn({ pageParam }) {
      return db.query.chatTable.findMany({
        ...pageParam,
      });
    },

    initialPageParam: {
      offset: 0,
      limit: 20,
    },

    getNextPageParam(lastPage, allPages, lastPageParam, allPageParams) {
      void { allPages, allPageParams };

      if (lastPage.length < lastPageParam.limit) return null;

      return {
        ...lastPageParam,
        offset: lastPageParam.offset + 1,
      };
    },
    networkMode: "offlineFirst",
  });

export default function Home() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const fetcher = fetchChats();
  const chats = useInfiniteQuery(fetcher);
  const router = useRouter();
  const newChat = useMutation({
    mutationFn() {
      return db.insert(schemas.chatTable).values({ name: "new chat" });
    },
    onSuccess(data) {
      router.push({
        pathname: "/chat/[id]",
        params: {
          id: data.lastInsertRowId,
        },
      });
      queryClient.invalidateQueries({
        queryKey: fetcher.queryKey,
      });
    },
    networkMode: "offlineFirst",
  });

  if (chats.isPending) return <Loading />;

  if (chats.isError) return <Text>Error</Text>;

  const data = chats.data.pages.flatMap((i) => i);

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={chats.isRefetching}
          onRefresh={() => chats.refetch()}
          colors={[theme.palette.primary.main]}
        />
      }
      data={data}
      renderItem={(i) => (
        <View
          style={[
            {
              borderBottomWidth: 1,
              borderBottomColor: theme.palette.divider,
              paddingInline: theme.spacing(5),
              paddingBlock: theme.spacing(3),
            },
          ]}
        >
          <Link
            href={{ pathname: "/chat/[id]", params: { id: i.item.id } }}
            asChild
          >
            <Pressable>
              <View>
                <Text
                  style={[
                    theme.typography.body1,
                    { color: theme.palette.text.primary },
                  ]}
                  numberOfLines={1}
                >
                  {i.item.name?.substring(0, 48)}
                </Text>
              </View>
            </Pressable>
          </Link>
        </View>
      )}
      ListFooterComponent={
        <View
          style={[
            {
              paddingInline: theme.spacing(5),
              paddingBlock: theme.spacing(3),
            },
          ]}
        >
          {chats.hasNextPage ? (
            <Text
              style={[
                theme.typography.body1,
                { color: theme.palette.text.primary, textAlign: "center" },
              ]}
            >
              Loader
            </Text>
          ) : (
            <Text
              style={[
                theme.typography.body1,
                { color: theme.palette.text.primary, textAlign: "center" },
              ]}
            >
              No More
            </Text>
          )}
        </View>
      }
      onEndReached={() => chats.hasNextPage && chats.fetchNextPage()}
      ListEmptyComponent={
        <View>
          <Pressable
            onPress={() => {
              newChat.mutate();
            }}
          >
            <Text
              style={[
                theme.typography.body1,
                { color: theme.palette.text.primary },
              ]}
            >
              Empty
            </Text>
          </Pressable>
        </View>
      }
      ListHeaderComponent={
        <View style={[{ paddingBlock: 0, paddingInline: 16 }]}>
          <Pressable
            onPress={() => newChat.mutate()}
            style={{
              width: 40,
              height: 40,
              backgroundColor: theme.palette.primary.main,

              justifyContent: "center",
              alignItems: "center",
              borderRadius: 9999,

              marginStart: "auto",
            }}
            android_ripple={android_ripple(theme.palette.action.focus)}
          >
            <MaterialCommunityIcons
              name="plus"
              style={{
                color: theme.palette.primary.contrastText,
                fontSize: theme.typography.h4.fontSize,
              }}
            />
          </Pressable>
        </View>
      }
    />
  );
}
