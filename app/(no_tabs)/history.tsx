import { Linking, Pressable, RefreshControl, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { openBrowserAsync } from "expo-web-browser";
import { fetchHistoryGet } from "@/api/qqlykm_cn";
import { useLocaleDate } from "@/hooks/useLocaleDate";
import { useLocaleTime } from "@/hooks/useLocaleTime";
import { Loading } from "@/components/Loading";
import { useStorageStore } from "@/hooks/useStorageStore";
import { useTheme } from "@/hooks/useTheme";
import Animated from "react-native-reanimated";
import { Text } from "@/components/Text";
import { Divider } from "@/components/ui";
import { t } from "try";

const ListHeader = () => {
  const theme = useTheme();
  const date = useLocaleDate();
  const time = useLocaleTime();

  return (
    <>
      <View
        style={[
          {
            backgroundColor: theme.palette.background.default,

            paddingInline: theme.spacing(6),
            paddingBlock: theme.spacing(3),
          },
        ]}
      >
        <Text variant="h5">{time}</Text>
        <Text
          style={[
            {
              color: theme.palette.text.secondary,
            },
          ]}
        >
          {date}
        </Text>
      </View>
      <Divider />
    </>
  );
};

const fetcher = fetchHistoryGet();

export default function Page() {
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const history = useQuery({ ...fetcher, enabled: !!apikey });
  const theme = useTheme();

  return (
    <Animated.FlatList
      refreshControl={
        <RefreshControl
          refreshing={history.isRefetching}
          onRefresh={() => history.refetch()}
          colors={[theme.palette.primary.main]}
        />
      }
      data={history.data?.data.data}
      keyExtractor={(i) => i.url}
      renderItem={({ item: i }) => (
        <Pressable
          key={i.url}
          onPress={async () => {
            const [ok] = await t(
              openBrowserAsync(i.url, {
                toolbarColor: "#000",
                enableBarCollapsing: true,
                enableDefaultShareMenuItem: true,

                createTask: false,
              }),
            );

            if (!ok) {
              Linking.openURL(i.url);
            }
          }}
          style={[
            {
              paddingInline: theme.spacing(6),
              paddingBlock: theme.spacing(3),

              borderWidth: 1,
              borderColor: "transparent",
              borderBlockEndColor: theme.palette.divider,
            },
          ]}
          android_ripple={{
            color: theme.palette.action.focus,
            foreground: true,
            borderless: false,
          }}
        >
          <Text>{i.year}</Text>
          <Text
            style={[
              theme.typography.body2,
              {
                color: theme.palette.text.secondary,
              },
            ]}
          >
            {i.title}
          </Text>
        </Pressable>
      )}
      ListHeaderComponent={ListHeader}
      stickyHeaderIndices={[0]}
      ListEmptyComponent={
        <View
          style={{
            flex: 1,

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loading />
        </View>
      }
      contentContainerStyle={{
        flexGrow: 1,
      }}
    />
  );
}
