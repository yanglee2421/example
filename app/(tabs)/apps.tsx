import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useStorageStore } from "@/hooks/useStorageStore";

export default function Account() {
  const theme = useStorageStore((s) => s.theme);
  const iconSize = theme.typography.body1.fontSize * 1.4;

  const list = [
    {
      icon: (
        <MaterialCommunityIcons
          name="border-none-variant"
          size={iconSize}
          color={theme.palette.text.icon}
        />
      ),
      label: "Not Found",
      href: "/404",
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="information-variant"
          size={iconSize}
          color={theme.palette.text.icon}
        />
      ),
      label: "About",
      href: "/about",
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
      href: "/todolist",
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
      href: "/qrcode",
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
      href: "/network",
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
      href: "/bing",
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
      href: "/news",
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
      href: "/joke",
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
      href: "/fengjing",
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
      href: "/history",
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
      href: "/locking_dog",
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
      href: "/movie",
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
      href: "/randtext",
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
      href: "/settings",
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
          style={[styles.itemLink, {
            borderBlockEndColor: theme.palette.divider,
          }]}
        >
          <Pressable
            android_ripple={{
              borderless: false,
              foreground: true,
              color: theme.palette.action.hover,
            }}
          >
            <View style={styles.itemView}>
              {i.item.icon}
              <Text
                style={[styles.itemText, {
                  color: theme.palette.text.primary,
                  fontSize: theme.typography.body1.fontSize,
                  fontFamily: theme.typography.body1.fontFamily,
                  fontWeight: theme.typography.body1.fontWeight,
                  letterSpacing: theme.typography.body1.letterSpacing,
                }]}
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

    paddingInline: 12,
    paddingBlock: 8,
  },
  itemView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 12,
  },
  itemText: {},
});
