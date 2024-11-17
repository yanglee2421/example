import React from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  Share,
  View,
} from "react-native";
import { Button, Card, Text, Tile, useTheme } from "@rneui/themed";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { fetchFengjing } from "@/api/fetchFengjing";
import { Loading } from "@/components/Loading";
import { NeedAPIKEY } from "@/components/NeedAPIKEY";
import { useStorageStore } from "@/hooks/useStorageStore";

const fetcher = fetchFengjing();

export default function Page() {
  const { theme } = useTheme();
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const fengjing = useInfiniteQuery({ ...fetcher, enabled: !!apikey });
  const queryClient = useQueryClient();
  const [imgWidth, setImgWidth] = React.useState(0);

  return (
    <>
      {fengjing.isLoading && <Loading />}
      {fengjing.isPending && !fengjing.isFetching && <NeedAPIKEY />}
      {fengjing.isError && (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={fengjing.isRefetching}
              onRefresh={() => {
                queryClient.removeQueries({ queryKey: fetcher.queryKey });
                fengjing.refetch();
              }}
              colors={[theme.colors.primary]}
            />
          }
        >
          <Card>
            <Text>Error</Text>
          </Card>
        </ScrollView>
      )}
      {fengjing.isSuccess && (
        <>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={fengjing.isRefetching}
                onRefresh={() => {
                  queryClient.removeQueries({ queryKey: fetcher.queryKey });
                  fengjing.refetch();
                }}
                colors={[theme.colors.primary]}
              />
            }
            data={fengjing.data.pages}
            renderItem={({ item, index }) => (
              <React.Fragment key={item.data.data.cover}>
                <View
                  style={{ margin: 12, marginBlockEnd: 0 }}
                >
                  <Tile
                    imageSrc={{ uri: item.data.data.cover }}
                    imageProps={{ resizeMode: "contain" }}
                    width={imgWidth}
                    height={imgWidth / 16 * 9}
                    title={item.data.data.tag}
                    featured
                    activeOpacity={0.7}
                    onPress={() =>
                      Share.share({ url: item.data.data.cover })}
                  />
                </View>

                {Object.is(index + 1, fengjing.data.pages.length) && (
                  <View
                    style={{ margin: 12 }}
                  >
                    <Button
                      onPress={() => fengjing.fetchNextPage()}
                      loading={fengjing.isFetchingNextPage}
                      onLayout={(e) => setImgWidth(e.nativeEvent.layout.width)}
                    >
                      Click to fetch more
                    </Button>
                  </View>
                )}
              </React.Fragment>
            )}
          />
        </>
      )}
    </>
  );
}
