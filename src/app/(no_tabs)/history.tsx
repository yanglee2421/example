import { fetchHistoryGet } from "@/api/qqlykm_cn";
import { useLocaleDate } from "@/hooks/useLocaleDate";
import { useLocaleTime } from "@/hooks/useLocaleTime";
import { useStorageStore } from "@/hooks/useStorageStore";
import { Column, Host, Icon, List, Row, Spacer, Text } from "@expo/ui";

import {
  HorizontalDivider,
  IconButton,
  ListItem,
  Surface,
} from "@expo/ui/jetpack-compose";
import { clickable } from "@expo/ui/jetpack-compose/modifiers";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import React from "react";
import { Linking } from "react-native";
import { t } from "try";

const ListHeader = () => {
  const router = useRouter();

  return (
    <>
      <Row style={{ paddingVertical: 8 }} alignment="center">
        <IconButton
          onClick={() => {
            router.back();
          }}
        >
          <Icon
            name={Icon.select({
              ios: "0.circle",
              android: import("@expo/material-symbols/arrow_left_alt.xml"),
            })}
          />
        </IconButton>
        <Text textStyle={{ fontSize: 24 }}>History</Text>
        <Spacer flexible />
        <IconButton>
          <Icon
            name={Icon.select({
              ios: "0.circle",
              android: import("@expo/material-symbols/more_vert.xml"),
            })}
          />
        </IconButton>
      </Row>
      <HorizontalDivider />
    </>
  );
};

const fetcher = fetchHistoryGet();

export default function Page() {
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const history = useQuery({ ...fetcher, enabled: !!apikey });
  const date = useLocaleDate();
  const time = useLocaleTime();

  const renderQuery = () => {
    if (history.isPending) {
      return <Text>Loading</Text>;
    }

    if (history.isError) {
      return <Text>{history.error.message}</Text>;
    }

    const list = history.data.data.data;

    if (list.length === 0) {
      return <></>;
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
          <ListHeader />
          <List
            onRefresh={async () => {
              await history.refetch();
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
