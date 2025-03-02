import { useTheme } from "@/hooks/useTheme";
import { queryOptions } from "@tanstack/react-query";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import * as fs from "expo-file-system/next";
import * as consts from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import React from "react";
import { android_ripple } from "@/lib/utils";

const fetchDatabaseSize = () =>
  queryOptions({
    queryKey: ["fetchDatabaseSize", consts.databaseName],
    async queryFn() {
      await new Promise((resolve) => setTimeout(resolve, 1000 * 2));
      const file = new fs.File(
        fs.Paths.document,
        `SQLite/${consts.databaseName}`
      );

      return file.size || 0;
    },
    networkMode: "offlineFirst",
  });

export default function Page() {
  const theme = useTheme();
  const databaseSize = useQuery(fetchDatabaseSize());
  const rotate = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate:
          interpolate(rotate.value, [0, 1], [0, 360], Extrapolation.CLAMP) +
          "deg",
      },
    ],
  }));

  React.useEffect(() => {
    if (databaseSize.isRefetching) {
      rotate.value = withRepeat(
        withTiming(1, {
          easing: Easing.linear,
          duration: 1000 * 1,
        }),
        Infinity
      );
    } else {
      rotate.value = 0;
    }
  }, [databaseSize.isRefetching]);

  const renderDatabaseSize = () => {
    if (databaseSize.isLoading) return <ActivityIndicator />;
    if (databaseSize.isError)
      return (
        <Text
          style={[theme.typography.body1, { color: theme.palette.error.main }]}
        >
          {databaseSize.error.message}
        </Text>
      );
    return (
      <Text
        style={[theme.typography.h3, { color: theme.palette.text.primary }]}
      >
        {databaseSize.data}
      </Text>
    );
  };

  return (
    <View style={{ padding: theme.spacing(3) }}>
      <Text
        style={[theme.typography.h6, { color: theme.palette.text.primary }]}
      >
        Database File Size
      </Text>
      {renderDatabaseSize()}
      <Pressable
        onPress={() => databaseSize.refetch()}
        style={{
          backgroundColor: theme.palette.primary.main,
          width: 40,
          height: 40,
          borderRadius: 20,

          justifyContent: "center",
          alignItems: "center",

          overflow: "hidden",
        }}
        android_ripple={android_ripple(theme.palette.action.focus)}
      >
        <Animated.View style={animatedStyle}>
          <MaterialCommunityIcons
            name="refresh"
            color={theme.palette.primary.contrastText}
            size={28}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
}
