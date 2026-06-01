import { fetchJijiangshangying } from "@/api/qqlykm_cn";
import { AppHeader } from "@/components/app-header";
import { useStorageStore } from "@/hooks/useStorageStore";
import { Column, Host, List, RNHostView, Row, Text } from "@expo/ui";
import {
  Card,
  CircularProgressIndicator,
  HorizontalDivider,
  Surface,
} from "@expo/ui/jetpack-compose";
import { fillMaxWidth, paddingAll } from "@expo/ui/jetpack-compose/modifiers";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import React from "react";

export default function Page() {
  const fetcher = fetchJijiangshangying();
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

    return (
      <>
        {list.map((item) => {
          return (
            <React.Fragment key={item.title}>
              <Row spacing={12} style={{ padding: 10 }}>
                <RNHostView matchContents>
                  <Image
                    source={{ uri: item.picUrl }}
                    style={{ width: 80, height: 120 }}
                  />
                </RNHostView>
                <Column spacing={2}>
                  <Text textStyle={{ fontSize: 18 }}>{item.title}</Text>
                  <Text textStyle={{ fontSize: 16 }}>{item.director}</Text>
                  <Text textStyle={{ fontSize: 14 }}>{item.type}</Text>
                  <Text textStyle={{ fontSize: 12 }}>{item.actors}</Text>
                  <Text textStyle={{ fontSize: 12 }}>
                    {item.releaseDateStr}
                  </Text>
                </Column>
              </Row>
              <HorizontalDivider />
            </React.Fragment>
          );
        })}
      </>
    );
  };

  return (
    <Host style={{ flex: 1 }}>
      <Surface>
        <Column>
          <AppHeader pageName="Movies" />
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
