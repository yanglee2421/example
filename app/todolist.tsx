import React from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  TextInput,
  View,
} from "react-native";
import { eq } from "drizzle-orm";
import { useImmer } from "use-immer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "@/db/db";
import { userTable } from "@/db/schema";
import { fetchUserTable } from "@/api/fetchUserTable";

export default function ToDoList() {
  const [params, updateParams] = useImmer({
    name: "",
    email: "",
  });
  const fetcher = fetchUserTable(params);
  const query = useQuery(fetcher);
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
        queryKey: fetcher.queryKey,
      });
    },
  });

  return (
    <View>
      <View>
        <TextInput
          value={params.name}
          onChangeText={(evt) => {
            updateParams((draft) => {
              draft.name = evt;
            });
          }}
        />
        <TextInput
          value={params.email}
          onChangeText={(evt) => {
            updateParams((draft) => {
              draft.email = evt;
            });
          }}
        />
        <Pressable
          onPress={() => {
            mutation.mutate();
          }}
          disabled={mutation.isPending}
        >
          <Text>
            create
          </Text>
        </Pressable>
      </View>
      {query.isSuccess && (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={query.isRefetching}
              onRefresh={() => query.refetch()}
              colors={["#000"]}
            />
          }
          data={query.data}
          keyExtractor={(i) => i.id.toString()}
          renderItem={(item) => {
            return (
              <View>
                <Text>{item.item.name}</Text>
                <Text>{item.item.email}</Text>
                <Pressable
                  onPress={async () => {
                    await db
                      .delete(userTable)
                      .where(eq(userTable.id, item.item.id));
                    query.refetch();
                  }}
                >
                  <Text>Pressable</Text>
                </Pressable>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}
