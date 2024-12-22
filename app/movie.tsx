import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { fetchJijiangshangying } from "@/api/fetchJijiangshangying";
import { Loading } from "@/components/Loading";
import { NeedAPIKEY } from "@/components/NeedAPIKEY";
import { useStorageStore } from "@/hooks/useStorageStore";
import { useThemeStore } from "@/hooks/useThemeStore";

const fetcher = fetchJijiangshangying();

export default function Page() {
  const apikey = useStorageStore((s) => s.qqlykmKey);
  const movies = useQuery({ ...fetcher, enabled: !!apikey });
  const theme = useThemeStore((s) => s.theme);

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
              colors={[theme.palette.primary.main]}
            />
          }
        >
          <Text
            style={[
              theme.typography.body1,
              {
                color: theme.palette.error.main,
              },
            ]}
          >
            Error
          </Text>
        </ScrollView>
      )}
      {movies.isSuccess && (
        <>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={movies.isRefetching}
                onRefresh={() => movies.refetch()}
                colors={[theme.palette.primary.main]}
              />
            }
            contentContainerStyle={{
              padding: theme.spacing(3),
              gap: theme.spacing(3),
            }}
            data={movies.data.data.data}
            keyExtractor={(i) => i.title}
            renderItem={({ item }) => (
              <View
                style={[
                  theme.shape,
                  {
                    borderColor: theme.palette.divider,
                    borderWidth: 1,

                    padding: theme.spacing(3),
                  },
                ]}
              >
                <Image
                  source={{ uri: item.picUrl }}
                  resizeMode="contain"
                  height={theme.spacing(40)}
                />
                <Text
                  style={[
                    theme.typography.h6,
                    {
                      color: theme.palette.text.primary,
                    },
                  ]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    theme.typography.subtitle1,
                    {
                      color: theme.palette.text.primary,
                    },
                  ]}
                >
                  {item.director}
                </Text>
                <Text
                  style={[
                    theme.typography.subtitle2,
                    {
                      color: theme.palette.text.primary,
                    },
                  ]}
                >
                  {item.type}
                </Text>
                <Text
                  style={[
                    theme.typography.caption,
                    {
                      color: theme.palette.text.primary,
                    },
                  ]}
                >
                  {item.actors}
                </Text>
                <Text
                  style={[
                    theme.typography.overline,
                    {
                      color: theme.palette.text.secondary,
                    },
                  ]}
                >
                  {item.releaseDateStr}
                </Text>
              </View>
            )}
          />
        </>
      )}
    </>
  );
}
