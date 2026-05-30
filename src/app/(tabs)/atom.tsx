import * as consts from "@/lib/constants";
import { Button, Column, Host, Icon, Row, Text } from "@expo/ui";
import { Surface } from "@expo/ui/jetpack-compose";
import {
  fillMaxWidth,
  padding,
  weight,
} from "@expo/ui/jetpack-compose/modifiers";
import { queryOptions, useQuery } from "@tanstack/react-query";
import * as fs from "expo-file-system";

const fetchDatabaseSize = () =>
  queryOptions({
    queryKey: ["fetchDatabaseSize", consts.databaseName],
    async queryFn() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const file = new fs.File(
        fs.Paths.document,
        `SQLite/${consts.databaseName}`,
      );

      return file.size || 0;
    },
    networkMode: "offlineFirst",
  });

const STAR = Icon.select({
  ios: "star.fill",
  android: import("@expo/material-symbols/ads_click.xml"),
});

export default function Page() {
  const databaseSize = useQuery(fetchDatabaseSize());

  return (
    <Host style={{ flex: 1 }}>
      <Surface>
        <Column modifiers={[padding(10, 10, 10, 10)]}>
          <Text>{databaseSize.data?.toString()}</Text>
          <Row spacing={6}>
            <Column modifiers={[weight(1)]}>
              <Button modifiers={[fillMaxWidth()]}>
                <Column>
                  <Row spacing={6} alignment="center">
                    <Icon name={STAR} size={16} />
                    <Text>Favorite</Text>
                  </Row>
                </Column>
              </Button>
            </Column>
            <Column modifiers={[weight(1)]}>
              <Button modifiers={[fillMaxWidth()]}>
                <Row spacing={6} alignment="center">
                  <Icon name={STAR} size={16} />
                  <Text>Favorite</Text>
                </Row>
              </Button>
            </Column>
          </Row>
        </Column>
      </Surface>
    </Host>
  );
}
