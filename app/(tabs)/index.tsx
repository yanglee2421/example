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
import { Link } from "expo-router";
import React from "react";
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native";

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
  });

export default function Home() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const fetcher = fetchChats();
  const chats = useInfiniteQuery(fetcher);
  const newChat = useMutation({
    mutationFn() {
      return db.insert(schemas.chatTable).values({ name: "new chat" });
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: fetcher.queryKey,
      });
    },
  });

  if (chats.isPending) return <Loading />;

  if (chats.isError) return <Text>Error</Text>;

  const data = chats.data.pages.flatMap((i) => i);

  if (!data.length)
    return (
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
    );

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={chats.isRefetching}
          onRefresh={() => chats.refetch()}
          colors={[theme.palette.primary.main]}
        />
      }
      data={[...data, { id: 0, name: null }]}
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
          {i.item.id ? (
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
                  >
                    {i.item.name?.substring(0, 48)}
                  </Text>
                </View>
              </Pressable>
            </Link>
          ) : (
            <View>
              {chats.hasNextPage ? (
                <Text
                  style={[
                    theme.typography.body1,
                    { color: theme.palette.text.primary },
                  ]}
                >
                  Loader
                </Text>
              ) : (
                <Text
                  style={[
                    theme.typography.body1,
                    { color: theme.palette.text.primary },
                  ]}
                >
                  No More
                </Text>
              )}
            </View>
          )}
        </View>
      )}
    />
  );
}
