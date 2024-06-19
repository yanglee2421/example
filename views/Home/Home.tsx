import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { eq } from "drizzle-orm";
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

  const queryClient = useQueryClient();

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
        queryKey: ["userTable"],
      });
    },
  });

  return (
    <DatabaseSuspense>
      <Button
        onPress={() => {
          mutation.mutate();
        }}
        disabled={mutation.isPending}
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
