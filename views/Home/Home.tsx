import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eq } from "drizzle-orm";
import React from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
} from "react-native";
import { useImmer } from "use-immer";
import { DatabaseSuspense } from "@/db/DatabaseSuspense";
import { db } from "@/db/db";
import { userTable } from "@/db/schema";
import { useUserTable } from "@/hooks/api/useUserTable";

export function Home() {
  const [params, updateParams] = useImmer({
    name: "",
    email: "",
  });
  const query = useUserTable(params);

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
      <Text>name</Text>
      <TextInput
        value={params.name}
        onChangeText={(evt) => {
          updateParams((draft) => {
            draft.name = evt;
          });
        }}
      />
      <Text>email</Text>
      <TextInput
        value={params.email}
        onChangeText={(evt) => {
          updateParams((draft) => {
            draft.email = evt;
          });
        }}
      />
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
          return <Text style={{ color: "#f00" }}>{query.error.message}</Text>;
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
                  <View
                    style={{ ...styles.listItem, marginTop: item.index && 12 }}
                  >
                    <Text style={styles.listItemText}>{item.item.id}</Text>
                    <Text style={styles.listItemText}>{item.item.name}</Text>
                    <Text style={styles.listItemText}>{item.item.email}</Text>
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
    borderColor: "#1e1e1e",
    borderWidth: 1,
    padding: 12,
  },
  listItemText: {
    fontSize: 16,
  },
});
