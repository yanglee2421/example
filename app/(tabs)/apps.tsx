import { Link } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const list = [
  {
    icon: <MaterialCommunityIcons />,
    label: "Not Found",
    href: "/404",
  },
  {
    icon: <MaterialCommunityIcons />,
    label: "About",
    href: "/about",
  },
  {
    icon: <MaterialCommunityIcons />,
    label: "To Do List",
    href: "/todolist",
  },
  {
    icon: <MaterialCommunityIcons />,
    label: "QR Code Scaner",
    href: "/qrcode",
  },
  {
    icon: <MaterialCommunityIcons />,
    label: "Network",
    href: "/network",
  },
  {
    icon: <MaterialCommunityIcons name="microsoft-bing" />,
    label: "Bing",
    href: "/bing",
  },
  {
    icon: <MaterialCommunityIcons />,
    label: "News",
    href: "/news",
  },
  {
    icon: <MaterialCommunityIcons />,
    label: "Joke",
    href: "/joke",
  },
  {
    icon: <MaterialCommunityIcons />,
    label: "Landscape",
    href: "/fengjing",
  },
  {
    icon: <MaterialCommunityIcons />,
    label: "History",
    href: "/history",
  },
  {
    icon: <MaterialCommunityIcons />,
    label: "Locking Dog",
    href: "/locking_dog",
  },
  {
    icon: <MaterialCommunityIcons name="movie-outline" />,
    label: "Movie",
    href: "/movie",
  },
  {
    icon: <MaterialCommunityIcons name="text" />,
    label: "Rand Text",
    href: "/randtext",
  },
  {
    icon: <MaterialCommunityIcons />,
    label: "Settings",
    href: "/settings",
  },
].sort((c, n) => c.label.localeCompare(n.label));

export default function Account() {
  return (
    <FlatList
      data={list}
      keyExtractor={(i) => i.href}
      renderItem={(i) => (
        <Link href={i.item.href} key={i.item.label} asChild>
          <View style={{ flexDirection: "row", borderWidth: 1 }}>
            {i.item.icon}
            <Text>{i.item.label}</Text>
          </View>
        </Link>
      )}
    />
  );
}
