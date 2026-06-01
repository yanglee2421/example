import { fetchRandtext } from "@/api/qqlykm_cn";
import { AppHeader } from "@/components/app-header";
import { useStorageStore } from "@/hooks/useStorageStore";
import { Button, Column, Host, List, ListItem, Text } from "@expo/ui";
import {
  Card,
  CircularProgressIndicator,
  HorizontalDivider,
  Surface,
} from "@expo/ui/jetpack-compose";
import { fillMaxWidth, paddingAll } from "@expo/ui/jetpack-compose/modifiers";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Share } from "react-native";

export default function Page() {
  const fetcher = fetchRandtext();
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const query = useInfiniteQuery({
    ...fetcher,
    enabled: !!apikey,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const queryClient = useQueryClient();

  const renderQuery = () => {
    if (query.isPending) {
      return (
        <Column alignment="center" modifiers={[fillMaxWidth(), paddingAll(32)]}>
          <CircularProgressIndicator />
        </Column>
      );
    }

    if (query.isError) {
      return (
        <Card modifiers={[fillMaxWidth(), paddingAll(12)]}>
          <Column style={{ padding: 12 }}>
            <Text textStyle={{ fontSize: 20 }}>Error</Text>
            <Text textStyle={{ fontSize: 14 }}>{query.error?.message}</Text>
          </Column>
        </Card>
      );
    }

    const list = query.data.pages;

    if (list.length === 0) {
      return (
        <Card modifiers={[fillMaxWidth(), paddingAll(12)]}>
          <Column style={{ padding: 12 }}>
            <Text textStyle={{ fontSize: 20 }}>Empty</Text>
            <Text textStyle={{ fontSize: 14 }}>No Data Found</Text>
          </Column>
        </Card>
      );
    }

    return (
      <>
        {list.map((item) => (
          <React.Fragment key={item.data.data}>
            <ListItem
              onPress={() => Share.share({ message: item.data.data })}
              supportingText={item.data.data.trim()}
            />
            <HorizontalDivider />
          </React.Fragment>
        ))}
        <ListItem>
          <Button
            onPress={() => query.fetchNextPage()}
            disabled={query.isFetchingNextPage}
            label="Click to fetch more"
            modifiers={[fillMaxWidth()]}
          />
        </ListItem>
      </>
    );
  };

  return (
    <Host style={{ flex: 1 }}>
      <Surface>
        <Column>
          <AppHeader pageName="Quote" />
          <List
            onRefresh={async () => {
              queryClient.removeQueries({ queryKey: fetcher.queryKey });
              await query.refetch();
            }}
          >
            {renderQuery()}
          </List>
        </Column>
      </Surface>
    </Host>
  );
}
