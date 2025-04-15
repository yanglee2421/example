import { useTheme } from "@/hooks/useTheme";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { android_ripple } from "@/lib/utils";
import Animated, {
  useAnimatedStyle,
  LinearTransition,
} from "react-native-reanimated";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import type { SharedValue } from "react-native-reanimated";
import type { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db } from "@/db/db";
import { count, eq } from "drizzle-orm";
import * as schemas from "@/db/schema";

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
  drag: SharedValue<number>,
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
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(20);

  const theme = useTheme();
  const router = useRouter();
  const chats = useLiveQuery(
    db.select().from(schemas.completionTable).limit(pageSize).offset(pageIndex),
    [pageIndex, pageSize],
  );
  const chatCount = useLiveQuery(
    db.select({ count: count() }).from(schemas.completionTable),
    [],
  );

  return (
    <Animated.FlatList
      data={chats.data}
      keyExtractor={(i) => i.id.toString()}
      itemLayoutAnimation={LinearTransition}
      renderItem={(i) => (
        <SwipeToDelete
          onDelete={() => {
            db.delete(schemas.completionTable).where(
              eq(schemas.completionTable.id, i.item.id),
            );
            db.delete(schemas.messageTable).where(
              eq(schemas.messageTable.completionId, i.item.id),
            );
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
          <Text style={{}}>{chatCount.data[0]?.count}</Text>
        </View>
      }
      ListEmptyComponent={
        <View>
          <Pressable
            onPress={async () => {
              const data = await db
                .insert(schemas.completionTable)
                .values({ name: "new chat" });
              router.push({
                pathname: "/chat/[id]",
                params: {
                  id: data.lastInsertRowId,
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
            onPress={async () => {
              const data = await db
                .insert(schemas.completionTable)
                .values({ name: "new chat" });

              router.push({
                pathname: "/chat/[id]",
                params: {
                  id: data.lastInsertRowId,
                },
              });
            }}
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
