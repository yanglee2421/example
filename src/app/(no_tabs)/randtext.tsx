import { fetchRandtext } from "@/api/qqlykm_cn";
import { AppHeader } from "@/components/app-header";
import { useStorageStore } from "@/hooks/useStorageStore";
import { Button, Column, Host, Icon, List, ListItem } from "@expo/ui";
import { HorizontalDivider, Surface } from "@expo/ui/jetpack-compose";
import { fillMaxWidth } from "@expo/ui/jetpack-compose/modifiers";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Share } from "react-native";

const fetcher = fetchRandtext();

export default function Page() {
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const randtext = useInfiniteQuery({
    ...fetcher,
    enabled: !!apikey,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const queryClient = useQueryClient();

  const renderQuery = () => {
    if (randtext.isPending) {
      return null;
    }
    if (randtext.isError) {
      return null;
    }

    const list = randtext.data.pages;

    if (list.length === 0) {
      return null;
    }

    return list.map((item, index) => (
      <React.Fragment key={item.data.data}>
        <ListItem
          onPress={() => Share.share({ message: item.data.data })}
          supportingText={item.data.data}
          trailing={
            <Icon
              name={Icon.select({
                ios: "0.circle",
                android: import("@expo/material-symbols/share.xml"),
              })}
            />
          }
        />
        <HorizontalDivider />
        {Object.is(index + 1, randtext.data.pages.length) && (
          <Column style={{ padding: 12 }}>
            <Button
              onPress={() => randtext.fetchNextPage()}
              disabled={randtext.isFetchingNextPage}
              label="Click to fetch more"
              modifiers={[fillMaxWidth()]}
            />
          </Column>
        )}
      </React.Fragment>
    ));
  };

  return (
    <Host style={{ flex: 1 }}>
      <Surface>
        <Column>
          <AppHeader pageName="Quote" />
          <List
            onRefresh={async () => {
              queryClient.removeQueries({ queryKey: fetcher.queryKey });
              await randtext.refetch();
            }}
          >
            {renderQuery()}
          </List>
        </Column>
      </Surface>
    </Host>
  );
}
