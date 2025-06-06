import { useTheme } from "@/hooks/useTheme";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
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
import * as schema from "@/db/schema";
import { Text } from "@/components/Text";
import { Divider } from "@/components/ui";

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
        if (dir === "right") {
          props.onDelete?.();
        }
      }}
    >
      {props.children}
    </ReanimatedSwipeable>
  );
};

export default function Home() {
  const pageIndex = 0;
  const pageSize = 20;

  const theme = useTheme();
  const router = useRouter();
  const chats = useLiveQuery(
    db.query.completionTable.findMany({
      offset: pageIndex * pageSize,
      limit: pageSize,
    }),
    [pageIndex, pageSize],
  );
  const chatCount = useLiveQuery(
    db.select({ count: count() }).from(schema.completionTable).limit(1),
    [],
  );

  return (
    <Animated.FlatList
      data={chats.data}
      keyExtractor={(i) => i.id.toString()}
      itemLayoutAnimation={LinearTransition}
      stickyHeaderIndices={[0]}
      renderItem={(i) => (
        <View>
          <SwipeToDelete
            onDelete={() => {
              db.transaction(async (tx) => {
                // If not await this, this re-render will be cancelled
                await tx
                  .delete(schema.completionTable)
                  .where(eq(schema.completionTable.id, i.item.id));
                await tx
                  .delete(schema.messageTable)
                  .where(eq(schema.messageTable.completionId, i.item.id));
              });
            }}
          >
            <View
              style={[
                {
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
          <Divider />
        </View>
      )}
      ListEmptyComponent={
        <View>
          <Pressable
            onPress={async () => {
              const data = await db
                .insert(schema.completionTable)
                .values({ name: "new chat" });
              router.push({
                pathname: "/chat/[id]",
                params: {
                  id: data.lastInsertRowId,
                },
              });
            }}
            style={[
              {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text
              style={[
                theme.typography.body1,
                { color: theme.palette.text.primary },
              ]}
            >
              No avaliable chats
            </Text>
          </Pressable>
        </View>
      }
      ListHeaderComponent={
        <View style={{ backgroundColor: theme.palette.background.default }}>
          <View
            style={[
              {
                paddingBlock: theme.spacing(1.5),
                paddingInline: theme.spacing(3),
              },
            ]}
          >
            <View
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                },
              ]}
            >
              <Text variant="h5">Chat App</Text>
              <Pressable
                onPress={async () => {
                  const data = await db
                    .insert(schema.completionTable)
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
                  overflow: "hidden",
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
            <Text
              style={[
                { color: theme.palette.text.secondary },
                theme.typography.overline,
              ]}
            >
              Total count: {chatCount.data[0]?.count}
            </Text>
          </View>
          <Divider />
        </View>
      }
    />
  );
}
