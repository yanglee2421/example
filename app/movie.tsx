import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchJijiangshangying } from "@/api/fetchJijiangshangying";
import { Loading } from "@/components/Loading";
import { NeedAPIKEY } from "@/components/NeedAPIKEY";
import { useStorageStore } from "@/hooks/useStorageStore";

const fetcher = fetchJijiangshangying();

export default function Page() {
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const movies = useQuery({ ...fetcher, enabled: !!apikey });

  return (
    <>
      {movies.isLoading && <Loading />}
      {movies.isPending && !movies.isFetching && <NeedAPIKEY />}
      {movies.isError && (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={movies.isRefetching}
              onRefresh={() => movies.refetch()}
            />
          }
        >
          <Text>Error</Text>
        </ScrollView>
      )}
      {movies.isSuccess && (
        <>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={movies.isRefetching}
                onRefresh={() => movies.refetch()}
              />
            }
            data={movies.data.data.data}
            keyExtractor={(i) => i.title}
            renderItem={({ item }) => (
              <View key={item.title}>
                <Text>{item.title}</Text>
                <Image
                  source={{ uri: item.picUrl }}
                  resizeMode="contain"
                />
                <Text>{item.director}</Text>
                <Text>{item.type}</Text>
                <Text>{item.actors}</Text>
                <Text>{item.releaseDateStr}</Text>
              </View>
            )}
          />
        </>
      )}
    </>
  );
}
