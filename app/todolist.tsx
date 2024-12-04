import React from "react";
import {
  Animated,
  FlatList,
  PanResponder,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { eq } from "drizzle-orm";
import { useImmer } from "use-immer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "@/db/db";
import { userTable } from "@/db/schema";
import { fetchUserTable } from "@/api/fetchUserTable";
import { useStorageStore } from "@/hooks/useStorageStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { android_ripple } from "@/lib/utils";

export default function ToDoList() {
  const [params, updateParams] = useImmer({
    name: "",
    email: "",
  });
  const fetcher = fetchUserTable(params);
  const query = useQuery(fetcher);
  const queryClient = useQueryClient();
  const theme = useStorageStore((s) => s.theme);
  const [pan] = React.useState(() => new Animated.ValueXY());
  const [panResponder] = React.useState(() =>
    PanResponder.create({
      onMoveShouldSetPanResponder() {
        return true;
      },
      onPanResponderMove(e, gestureState) {
        const handler = Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        });

        handler(e, gestureState);
      },
      onPanResponderRelease(e, pgs) {
        // pan.extractOffset();

        if (pgs.dx > 50) {
          Animated.spring(pan, {
            useNativeDriver: true,
            toValue: {
              y: 0,
              x: 50,
            },
          }).start();
        } else {
          Animated.spring(pan, {
            useNativeDriver: true,
            toValue: {
              y: 0,
              x: 0,
            },
          }).start();
        }
      },
    })
  );
  const mutation = useMutation({
    mutationFn() {
      return db.insert(userTable).values({
        name: Date.now().toString(),
        email: Date.now() + "@gmail.com",
        password: "test1234",
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: fetcher.queryKey,
      });
    },
  });

  return (
    <View>
      <Animated.View
        {...panResponder.panHandlers}
        style={[{
          borderBlockEndColor: theme.palette.divider,
          borderBottomWidth: 1,

          paddingBlock: theme.space(3),
          paddingInline: theme.space(5),
        }, { transform: [{ translateX: pan.x }] }]}
      >
        <View style={[{ flexDirection: "row" }]}>
          <Pressable
            style={[{
              position: "absolute",
              left: -50,
              bottom: 0,

              borderRadius: 99999,
              borderWidth: 1,
              borderColor: "transparent",

              width: 50,
              height: 50,

              overflow: "hidden",

              justifyContent: "center",
              alignItems: "center",
            }]}
            android_ripple={android_ripple(theme.palette.action.focus)}
          >
            <MaterialCommunityIcons
              name="delete"
              color={theme.palette.text.icon}
              size={25}
            />
          </Pressable>
          <View>
            <Text
              style={[theme.typography.body1, {
                color: theme.palette.text.primary,
              }]}
            >
              Swiper
            </Text>
          </View>
        </View>
      </Animated.View>
      {query.isSuccess && (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={query.isRefetching}
              onRefresh={() => query.refetch()}
            />
          }
          data={query.data}
          keyExtractor={(i) => i.id.toString()}
          renderItem={(item) => {
            return (
              <View
                style={[{
                  borderBlockEndColor: theme.palette.divider,
                  borderBottomWidth: 1,

                  paddingBlock: theme.space(3),
                  paddingInline: theme.space(5),
                }]}
              >
                <Text
                  style={[theme.typography.body1, {
                    color: theme.palette.text.primary,
                  }]}
                >
                  {item.item.email}
                </Text>
                <Pressable
                  onPress={async () => {
                    await db
                      .delete(userTable)
                      .where(eq(userTable.id, item.item.id));
                    query.refetch();
                  }}
                >
                </Pressable>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}
