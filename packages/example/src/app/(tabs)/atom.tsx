import { Divider } from "@/components/ui";
import { useTheme } from "@/hooks/useTheme";
import * as consts from "@/lib/constants";
import { Host, Icon, IconButton } from "@expo/ui/jetpack-compose";
import { queryOptions, useQuery } from "@tanstack/react-query";
import * as fs from "expo-file-system";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

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

    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  }));

  React.useEffect(() => {
    if (databaseSize.isRefetching) {
      rotate.value = withRepeat(
        withTiming(1, {
          easing: Easing.linear,
          duration: 1000 * 1,
        }),
        Infinity,
      );
    } else {
      rotate.value = 0;
    }
  }, [databaseSize.isRefetching, rotate]);

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
        {(databaseSize.data || 0) / 1024} KB
      </Text>
    );
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: theme.palette.background.default }}
    >
      <View
        style={[
          { paddingInline: theme.spacing(3), paddingBlock: theme.spacing(2) },
        ]}
      >
        <Text
          style={[
            theme.typography.h5,
            {
              color: theme.palette.text.primary,
            },
          ]}
        >
          Atom
        </Text>
      </View>
      <Divider />
      <View style={[{ padding: theme.spacing(3) }]}>
        <Text
          style={[theme.typography.h6, { color: theme.palette.text.primary }]}
        >
          Database File Size
        </Text>
        {renderDatabaseSize()}
        <Animated.View style={animatedStyle}>
          <Host matchContents>
            <IconButton onPress={() => databaseSize.refetch()}>
              <Icon
                source={require("@/assets/add_24px.xml")}
                tintColor={"white"}
              />
            </IconButton>
          </Host>
        </Animated.View>
      </View>
    </View>
  );
}
