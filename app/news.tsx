import {
  Pressable,
  RefreshControl,
  ScrollView,
  Share,
  Text,
  View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "@/api/fetchNews";
import { Loading } from "@/components/Loading";
import { NeedAPIKEY } from "@/components/NeedAPIKEY";
import { useStorageStore } from "@/hooks/useStorageStore";
import { android_ripple } from "@/lib/utils";

const fetcher = fetchNews();

export default function News() {
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const news = useQuery({ ...fetcher, enabled: !!apikey });
  const theme = useStorageStore((s) => s.theme);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={news.isRefetching}
          onRefresh={() => news.refetch()}
          colors={[theme.palette.primary.main]}
        />
      }
    >
      {news.isLoading && <Loading />}
      {news.isPending && !news.isFetching && <NeedAPIKEY />}
      {news.isError && <Text>Error</Text>}
      {news.isSuccess && (
        <View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "transparent",
              borderBlockEndColor: theme.palette.divider,

              paddingInline: theme.space(6),
              paddingBlock: theme.space(3),
            }}
          >
            <Text
              style={[theme.typography.h5, {
                color: theme.palette.text.primary,
              }]}
            >
              {news.data.data.data.date}
            </Text>
            <Text
              style={[theme.typography.body2, {
                color: theme.palette.text.secondary,
              }]}
            >
              {news.data.data.data.weiyu}
            </Text>
          </View>

          {news.data.data.data.news.map((i) => (
            <Pressable
              key={i}
              onPress={() => Share.share({ message: i })}
              style={[{
                borderWidth: 1,
                borderColor: "transparent",
                borderBlockEndColor: theme.palette.divider,

                paddingInline: theme.space(6),
                paddingBlock: theme.space(3),
              }]}
              android_ripple={android_ripple(theme.palette.action.focus)}
            >
              <Text
                style={[theme.typography.body1, {
                  color: theme.palette.text.primary,
                }]}
              >
                {i.slice(0, i.length - 1)}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
