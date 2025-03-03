import { Loading } from "@/components/Loading";
import { useTheme } from "@/hooks/useTheme";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  RefreshControl,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { android_ripple } from "@/lib/utils";
import Animated, {
  useAnimatedStyle,
  LinearTransition,
} from "react-native-reanimated";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import type { SharedValue } from "react-native-reanimated";
import type { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";
import { useDeleteChat, useCreateChat, fetchChats } from "@/lib/chat";

const styles = StyleSheet.create({
  leftAction: {
    left: "-100%",

    width: "100%",

    padding: 10,

    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

const RenderLeftActions = (
  prog: SharedValue<number>,
  drag: SharedValue<number>
) => {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value }],
      backgroundColor: `rgba(255,0,0,${prog.value})`,
    };
  });

  return (
    <Animated.View style={[styleAnimation, styles.leftAction]}>
      <MaterialCommunityIcons name="delete-outline" size={26} color="white" />
    </Animated.View>
  );
};

type SwipeToDeleteProps = React.PropsWithChildren<{
  onDelete?: () => void;
}>;

const SwipeToDelete = (props: SwipeToDeleteProps) => {
  const ref = React.useRef<SwipeableMethods>(null);

  return (
    <ReanimatedSwipeable
      ref={ref}
      leftThreshold={50}
      friction={1}
      renderLeftActions={RenderLeftActions}
      onSwipeableOpen={(dir) => {
        if (dir === "left") {
          props.onDelete?.();
        }
      }}
      onSwipeableWillOpen={(dir) => {
        if (dir === "right") {
          ref.current?.close();
        }
      }}
    >
      {props.children}
    </ReanimatedSwipeable>
  );
};

export default function Home() {
  const theme = useTheme();
  const fetcher = fetchChats();
  const chats = useInfiniteQuery(fetcher);
  const router = useRouter();
  const createChat = useCreateChat();
  const deleteChat = useDeleteChat();

  if (chats.isPending) return <Loading />;

  if (chats.isError) return <Text>Error</Text>;

  const data = chats.data.pages.flatMap((i) => i);

  return (
    <Animated.FlatList
      refreshControl={
        <RefreshControl
          refreshing={chats.isRefetching}
          onRefresh={() => chats.refetch()}
          colors={[theme.palette.primary.main]}
        />
      }
      data={data}
      keyExtractor={(i) => i.id.toString()}
      itemLayoutAnimation={LinearTransition}
      renderItem={(i) => (
        <SwipeToDelete
          onDelete={() => {
            deleteChat.mutate(i.item.id);
          }}
        >
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
        </SwipeToDelete>
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
              createChat.mutate(void 0, {
                onSuccess(data) {
                  router.push({
                    pathname: "/chat/[id]",
                    params: {
                      id: data.lastInsertRowId,
                    },
                  });
                },
              });
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
            onPress={() =>
              createChat.mutate(void 0, {
                onSuccess(data) {
                  router.push({
                    pathname: "/chat/[id]",
                    params: {
                      id: data.lastInsertRowId,
                    },
                  });
                },
              })
            }
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
