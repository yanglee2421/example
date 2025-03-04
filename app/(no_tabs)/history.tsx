import {
  Linking,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { openBrowserAsync } from "expo-web-browser";
import { fetchHistoryGet } from "@/api/qqlykm_cn";
import { useLocaleDate } from "@/hooks/useLocaleDate";
import { useLocaleTime } from "@/hooks/useLocaleTime";
import { Loading } from "@/components/Loading";
import { NeedAPIKEY } from "@/components/NeedAPIKEY";
import { useStorageStore } from "@/hooks/useStorageStore";
import { useTheme } from "@/hooks/useTheme";

const fetcher = fetchHistoryGet();

export default function Page() {
  const date = useLocaleDate();
  const time = useLocaleTime();
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const history = useQuery({ ...fetcher, enabled: !!apikey });
  const theme = useTheme();

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={history.isRefetching}
          onRefresh={() => history.refetch()}
          colors={[theme.palette.primary.main]}
        />
      }
    >
      <View
        style={[
          {
            borderWidth: 1,
            borderColor: "transparent",
            borderBlockEndColor: theme.palette.divider,

            paddingInline: theme.spacing(6),
            paddingBlock: theme.spacing(3),
          },
        ]}
      >
        <Text
          style={[theme.typography.h5, { color: theme.palette.text.primary }]}
        >
          {time}
        </Text>
        <Text
          style={[
            theme.typography.body1,
            {
              color: theme.palette.text.secondary,
            },
          ]}
        >
          {date}
        </Text>
      </View>

      {history.isLoading && <Loading />}
      {history.isPending && !history.isFetching && <NeedAPIKEY />}
      {history.isError && <Text>Error</Text>}
      {history.isSuccess &&
        history.data.data.data.map((i) => (
          <Pressable
            key={i.url}
            onPress={async () => {
              try {
                await openBrowserAsync(i.url, {
                  toolbarColor: "#000",
                  enableBarCollapsing: true,
                  enableDefaultShareMenuItem: true,

                  createTask: false,
                });
              } catch {
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
            <Text
              style={[
                theme.typography.body1,
                {
                  color: theme.palette.text.primary,
                },
              ]}
            >
              {i.year}
            </Text>
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
        ))}
    </ScrollView>
  );
}
