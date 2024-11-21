import React from "react";
import { FlatList, RefreshControl } from "react-native";
import { eq } from "drizzle-orm";
import { useImmer } from "use-immer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "@/db/db";
import { userTable } from "@/db/schema";
import { fetchUserTable } from "@/api/fetchUserTable";
import { Button, Card, getToken, H4, Input, ListItem, View } from "tamagui";
import { Delete } from "@tamagui/lucide-icons";

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
    <View padding="$3" gap="$3" flex={1}>
      <Card elevate>
        <Card.Header padded>
          <H4>SQLite</H4>
        </Card.Header>
        <View paddingInline="$4" gap="$3">
          <Input
            value={params.name}
            onChangeText={(evt) => {
              updateParams((draft) => {
                draft.name = evt;
              });
            }}
          />
          <Input
            value={params.email}
            onChangeText={(evt) => {
              updateParams((draft) => {
                draft.email = evt;
              });
            }}
          />
        </View>
        <Card.Footer padded>
          <Button
            onPress={() => {
              mutation.mutate();
            }}
            disabled={mutation.isPending}
            backgroundColor={"$palette.primary"}
            color="$gray12Dark"
            flex={1}
          >
            Create
          </Button>
        </Card.Footer>
      </Card>
      {query.isSuccess && (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={query.isRefetching}
              onRefresh={() => query.refetch()}
              colors={[getToken("$palette.primary")]}
            />
          }
          data={query.data}
          keyExtractor={(i) => i.id.toString()}
          renderItem={(item) => {
            return (
              <ListItem
                title={item.item.name}
                subTitle={item.item.email}
                iconAfter={
                  <Button
                    onPress={async () => {
                      await db
                        .delete(userTable)
                        .where(eq(userTable.id, item.item.id));
                      query.refetch();
                    }}
                    circular
                    icon={<Delete color="$gray12Dark" />}
                    backgroundColor={"$red10"}
                  />
                }
              />
            );
          }}
        />
      )}
    </View>
  );
}
