import { fetchHistoryGet } from "@/api/qqlykm_cn";
import { AppHeader } from "@/components/app-header";
import { useLocaleDate } from "@/hooks/useLocaleDate";
import { useLocaleTime } from "@/hooks/useLocaleTime";
import { useStorageStore } from "@/hooks/useStorageStore";
import { Column, Host, Icon, List, Text } from "@expo/ui";
import {
  Card,
  CircularProgressIndicator,
  HorizontalDivider,
  ListItem,
  Surface,
} from "@expo/ui/jetpack-compose";
import {
  clickable,
  fillMaxWidth,
  paddingAll,
} from "@expo/ui/jetpack-compose/modifiers";
import { useQuery } from "@tanstack/react-query";
import { openBrowserAsync } from "expo-web-browser";
import React from "react";
import { Linking } from "react-native";
import { t } from "try";

export default function Page() {
  const fetcher = fetchHistoryGet();
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const query = useQuery({ ...fetcher, enabled: !!apikey });
  const date = useLocaleDate();
  const time = useLocaleTime();

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

    const list = query.data.data.data;

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

    return list.map((i) => {
      return (
        <React.Fragment key={i.url}>
          <HorizontalDivider />
          <ListItem
            modifiers={[
              clickable(async () => {
                const [ok] = await t(
                  openBrowserAsync(i.url, {
                    enableBarCollapsing: true,
                    enableDefaultShareMenuItem: true,
                    createTask: false,
                  }),
                );

                if (ok) return;

                Linking.openURL(i.url);
              }),
            ]}
          >
            <ListItem.TrailingContent>
              <Icon
                name={Icon.select({
                  ios: "0.circle",
                  android: import("@expo/material-symbols/arrow_right_alt.xml"),
                })}
              />
            </ListItem.TrailingContent>
            <ListItem.HeadlineContent>
              <Text>{i.year}</Text>
            </ListItem.HeadlineContent>
            <ListItem.SupportingContent>
              <Text>{i.title}</Text>
            </ListItem.SupportingContent>
          </ListItem>
        </React.Fragment>
      );
    });
  };

  return (
    <Host style={{ flex: 1 }}>
      <Surface>
        <Column>
          <AppHeader pageName="History" />
          <List
            onRefresh={async () => {
              await query.refetch();
            }}
          >
            <Column style={{ padding: 12 }}>
              <Text textStyle={{ fontSize: 22 }}>{date}</Text>
              <Text textStyle={{ fontSize: 16 }}>{time}</Text>
            </Column>
            {renderQuery()}
          </List>
        </Column>
      </Surface>
    </Host>
  );
}
