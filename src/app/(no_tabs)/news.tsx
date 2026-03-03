import { fetchNews } from "@/api/qqlykm_cn";
import { Loading } from "@/components/Loading";
import { useStorageStore } from "@/hooks/useStorageStore";
import { android_ripple } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Pressable, RefreshControl, Share, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import Animated from "react-native-reanimated";
import { Divider } from "@/components/ui";
import { Text } from "@/components/Text";

const fetcher = fetchNews();

const ListHeader = () => {
  const theme = useTheme();
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const news = useQuery({ ...fetcher, enabled: !!apikey });

  return (
    <View>
      <View
        style={{
          backgroundColor: theme.palette.primary.main,

          paddingInline: theme.spacing(6),
          paddingBlock: theme.spacing(3),
        }}
      >
        <Text
          variant="h5"
          style={[
            {
              color: theme.palette.primary.contrastText,
            },
          ]}
        >
          {news.data?.data.data.date}
        </Text>
        <Text
          variant="body2"
          style={[
            {
              color: theme.palette.primary.contrastText,
            },
          ]}
        >
          {news.data?.data.data.weiyu}
        </Text>
      </View>
      <Divider />
    </View>
  );
};

const ListEmpty = () => {
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const news = useQuery({ ...fetcher, enabled: !!apikey });

  if (news.isPending) {
    return (
      <View>
        <Loading />
      </View>
    );
  }

  if (news.isError) {
    return <></>;
  }

  return (
    <View>
      <Loading />
    </View>
  );
};

export default function News() {
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const news = useQuery({ ...fetcher, enabled: !!apikey });
  const theme = useTheme();

  return (
    <View style={[{ flex: 1 }]}>
      <View
        style={[
          {
            paddingInline: theme.spacing(5),
            paddingBlock: theme.spacing(3),

            backgroundColor: theme.palette.primary.main,
          },
        ]}
      >
        <Text
          variant="h5"
          style={[
            {
              color: theme.palette.primary.contrastText,
            },
          ]}
        >
          News
        </Text>
      </View>
      <Animated.FlatList
        data={news.data?.data.data.news}
        keyExtractor={(i) => i}
        renderItem={({ item: i }) => (
          <Pressable
            key={i}
            onPress={() => Share.share({ message: i })}
            style={[
              {
                borderWidth: 1,
                borderColor: "transparent",
                borderBlockEndColor: theme.palette.divider,

                paddingInline: theme.spacing(6),
                paddingBlock: theme.spacing(3),
              },
            ]}
            android_ripple={android_ripple(theme.palette.action.focus)}
          >
            <Text>{i.slice(0, i.length - 1)}</Text>
          </Pressable>
        )}
        // stickyHeaderIndices={[0]}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmpty}
        refreshControl={
          <RefreshControl
            refreshing={news.isRefetching}
            onRefresh={() => news.refetch()}
            colors={[theme.palette.primary.main]}
          />
        }
      />
    </View>
  );
}
