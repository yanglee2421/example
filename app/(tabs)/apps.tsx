import { useTheme } from "@/hooks/useTheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function Account() {
  const theme = useTheme();
  const iconSize = theme.typography.body1.fontSize * 1.4;

  const list = [
    {
      icon: (
        <MaterialCommunityIcons
          name="information-variant"
          size={iconSize}
          color={theme.palette.text.icon}
        />
      ),
      label: "About",
      href: "/about" as const,
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="format-list-numbered"
          size={iconSize}
          color={theme.palette.text.icon}
        />
      ),
      label: "To Do List",
      href: "/todolist" as const,
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="qrcode-scan"
          size={iconSize}
          color={theme.palette.text.icon}
        />
      ),
      label: "QR Code Scaner",
      href: "/qrcode" as const,
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="qrcode-scan"
          size={iconSize}
          color={theme.palette.text.icon}
        />
      ),
      label: "Activation",
      href: "/activation" as const,
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="lan"
          size={iconSize}
          color={theme.palette.text.icon}
        />
      ),
      label: "Network",
      href: "/network" as const,
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="microsoft-bing"
          size={iconSize}
          color={theme.palette.text.icon}
        />
      ),
      label: "Bing",
      href: "/bing" as const,
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="newspaper-variant-outline"
          size={iconSize}
          color={theme.palette.text.icon}
        />
      ),
      label: "News",
      href: "/news" as const,
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="robot-happy-outline"
          size={iconSize}
          color={theme.palette.text.icon}
        />
      ),
      label: "Joke",
      href: "/joke" as const,
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="image-filter-hdr"
          size={iconSize}
          color={theme.palette.text.icon}
        />
      ),
      label: "Landscape",
      href: "/fengjing" as const,
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="book-open-page-variant-outline"
          size={iconSize}
          color={theme.palette.text.icon}
        />
      ),
      label: "History",
      href: "/history" as const,
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="dog"
          size={iconSize}
          color={theme.palette.text.icon}
        />
      ),
      label: "Locking Dog",
      href: "/locking_dog" as const,
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="movie-outline"
          size={iconSize}
          color={theme.palette.text.icon}
        />
      ),
      label: "Movie",
      href: "/movie" as const,
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="format-quote-close-outline"
          size={iconSize}
          color={theme.palette.text.icon}
        />
      ),
      label: "Rand Text",
      href: "/randtext" as const,
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="cogs"
          size={iconSize}
          color={theme.palette.text.icon}
        />
      ),
      label: "Settings",
      href: "/settings" as const,
    },
    {
      icon: (
        <MaterialCommunityIcons
          name={"flask"}
          size={iconSize}
          color={theme.palette.text.icon}
        />
      ),
      label: "Lab",
      href: "/lab" as const,
    },
    {
      icon: (
        <MaterialCommunityIcons
          name={"calendar"}
          size={iconSize}
          color={theme.palette.text.icon}
        />
      ),
      label: "Calendar",
      href: "/calendar" as const,
    },
  ].sort((c, n) => c.label.localeCompare(n.label));

  return (
    <FlatList
      data={list}
      keyExtractor={(i) => i.href}
      renderItem={(i) => (
        <Link
          href={i.item.href}
          key={i.item.label}
          asChild
          style={[
            styles.itemLink,
            {
              borderBlockEndColor: theme.palette.divider,
            },
          ]}
        >
          <Pressable
            android_ripple={{
              borderless: false,
              foreground: true,
              color: theme.palette.action.focus,
            }}
          >
            <View
              style={[
                styles.itemView,
                {
                  paddingInline: theme.spacing(4),
                  paddingBlock: theme.spacing(3),
                },
              ]}
            >
              {i.item.icon}
              <Text
                style={[
                  styles.itemText,
                  {
                    color: theme.palette.text.primary,
                    fontSize: theme.typography.body1.fontSize,
                    fontFamily: theme.typography.body1.fontFamily,
                    fontWeight: theme.typography.body1.fontWeight,
                    letterSpacing: theme.typography.body1.letterSpacing,
                  },
                ]}
              >
                {i.item.label}
              </Text>
            </View>
          </Pressable>
        </Link>
      )}
    />
  );
}

const styles = StyleSheet.create({
  itemLink: {
    borderWidth: 1,
    borderColor: "transparent",
  },
  itemView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 12,
  },
  itemText: {},
});
