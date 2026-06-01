import { fetchNews } from "@/api/qqlykm_cn";
import { AppHeader } from "@/components/app-header";
import { useStorageStore } from "@/hooks/useStorageStore";
import { Column, Host, List, ListItem, Text } from "@expo/ui";
import {
  Card,
  CircularProgressIndicator,
  HorizontalDivider,
  Surface,
} from "@expo/ui/jetpack-compose";
import { fillMaxWidth, paddingAll } from "@expo/ui/jetpack-compose/modifiers";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Share } from "react-native";

export default function News() {
  const fetcher = fetchNews();
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const query = useQuery({ ...fetcher, enabled: !!apikey });

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

    const list = query.data.data.data.news;

    return (
      <>
        <ListItem>
          <Column>
            <Text textStyle={{ fontSize: 20 }}>
              {query.data?.data.data.date}
            </Text>
            <Text textStyle={{ fontSize: 14 }}>
              {query.data?.data.data.weiyu}
            </Text>
          </Column>
        </ListItem>
        <HorizontalDivider />
        {list.map((item) => {
          return (
            <React.Fragment key={item}>
              <ListItem
                onPress={() => Share.share({ message: item })}
                supportingText={item.trim()}
              />
              <HorizontalDivider />
            </React.Fragment>
          );
        })}
      </>
    );
  };

  return (
    <Host style={[{ flex: 1 }]}>
      <Surface>
        <Column>
          <AppHeader pageName="News" />
          <List
            onRefresh={async () => {
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
