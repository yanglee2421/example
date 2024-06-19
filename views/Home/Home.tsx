import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { DatabaseSuspense, db } from "@/db/DatabaseSuspense";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export function Home() {
  const query = useQuery({
    queryKey: ["userTable"],
    queryFn() {
      return db.query.userTable.findMany({
        columns: {
          id: true,
          name: true,
        },
      });
    },
  });

  return (
    <DatabaseSuspense>
      <Button
        onPress={async () => {
          await db.insert(userTable).values({
            name: Date.now().toString(),
          });
          query.refetch();
        }}
        title={"create"}
      />
      {(() => {
        if (query.isPending) {
          return <Text>fetch...</Text>;
        }

        if (query.isError) {
          return <Text>{query.error.message}</Text>;
        }

        return (
          <FlatList
            data={query.data}
            renderItem={(item) => {
              return (
                <Pressable
                  onLongPress={async () => {
                    await db
                      .delete(userTable)
                      .where(eq(userTable.id, item.item.id));
                    query.refetch();
                  }}
                >
                  <View style={styles.listItem}>
                    <Text style={styles.listItemText}>{item.item.id}</Text>
                    <Text style={styles.listItemText}>{item.item.name}</Text>
                  </View>
                </Pressable>
              );
            }}
            refreshing={query.isRefetching}
            onRefresh={() => {
              query.refetch();
            }}
          />
        );
      })()}
    </DatabaseSuspense>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  listItemText: {
    fontSize: 16,
  },
});
