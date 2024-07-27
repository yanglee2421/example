import {
  ListItem,
  Avatar,
  Text,
  Input,
  Card,
  Icon,
  Button,
  useTheme,
  Skeleton,
} from "@rneui/themed";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eq } from "drizzle-orm";
import React from "react";
import { FlatList, View } from "react-native";
import { useImmer } from "use-immer";
import { DatabaseSuspense } from "@/db/DatabaseSuspense";
import { db } from "@/db/db";
import { userTable } from "@/db/schema";
import { useUserTable } from "@/hooks/api/useUserTable";

export default function Home() {
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

  const theme = useTheme();

  return (
    <DatabaseSuspense>
      <View>
        <Card>
          <Card.Title>Search</Card.Title>
          <Input
            value={params.name}
            onChangeText={(evt) => {
              updateParams((draft) => {
                draft.name = evt;
              });
            }}
            label="name"
          />
          <Input
            value={params.email}
            onChangeText={(evt) => {
              updateParams((draft) => {
                draft.email = evt;
              });
            }}
            label={"email"}
          />
          <Button
            onPress={() => {
              mutation.mutate();
            }}
            disabled={mutation.isPending}
            icon={<Icon name="plus" color="white" />}
          >
            create
          </Button>
        </Card>
        <Card containerStyle={{ padding: 0 }}>
          {(() => {
            if (query.isPending) {
              return <Skeleton />;
            }

            if (query.isError) {
              return (
                <Text style={{ color: "#f00" }}>{query.error.message}</Text>
              );
            }

            return (
              <FlatList
                data={query.data}
                renderItem={(item) => {
                  return (
                    <ListItem.Swipeable
                      rightContent={() => (
                        <Button
                          containerStyle={{
                            backgroundColor: theme.theme.colors.error,
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          type="clear"
                          icon={{
                            name: "delete-outline",
                            type: "material-community",
                            color: "white",
                          }}
                          onPress={async () => {
                            await db
                              .delete(userTable)
                              .where(eq(userTable.id, item.item.id));
                            query.refetch();
                          }}
                        />
                      )}
                      bottomDivider
                    >
                      <Avatar
                        rounded
                        source={{
                          uri: "https://randomuser.me/api/portraits/men/36.jpg",
                        }}
                      />
                      <ListItem.Content>
                        <ListItem.Title>{item.item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.item.email}</ListItem.Subtitle>
                      </ListItem.Content>
                      <ListItem.Chevron />
                    </ListItem.Swipeable>
                  );
                }}
                refreshing={query.isRefetching}
                onRefresh={() => {
                  query.refetch();
                }}
              />
            );
          })()}
        </Card>
      </View>
    </DatabaseSuspense>
  );
}
