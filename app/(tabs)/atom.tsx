import { fetchJoke } from "@/api/fetchJoke";
import { Empty } from "@/components/Empty";
import { Button, Card, Text, useTheme } from "@rneui/themed";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { RefreshControl, ScrollView, View } from "react-native";

const fetcher = fetchJoke();

export default function Atom() {
  const { theme } = useTheme();
  const jokes = useInfiniteQuery(fetcher);
  const queryClient = useQueryClient();

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={jokes.isRefetching}
          onRefresh={() => {
            queryClient.removeQueries({ queryKey: fetcher.queryKey });
            jokes.refetch();
          }}
          colors={[theme.colors.primary]}
        />
      }
    >
      {jokes.isPending && <Empty />}
      {jokes.isSuccess && (
        <>
          {jokes.data.pages.map((i) => (
            <Card key={i.data.data.joke}>
              <Text>{i.data.data.joke}</Text>
            </Card>
          ))}
          <View style={{ padding: 12 }}>
            <Button
              onPress={() => jokes.fetchNextPage()}
              loading={jokes.isFetchingNextPage}
            >
              Click to fetch more
            </Button>
          </View>
        </>
      )}
    </ScrollView>
  );
}
