import { Link } from "expo-router";
import { FlatList, Pressable, Text } from "react-native";

const list = [
  {
    label: "Not Found",
    href: "/404",
  },
  { label: "About", href: "/about" },
  {
    label: "To Do List",
    href: "/todolist",
  },
  {
    label: "QR Code Scaner",
    href: "/qrcode",
  },
  {
    label: "Network",
    href: "/network",
  },
  {
    label: "Bing",
    href: "/bing",
  },
  {
    label: "News",
    href: "/news",
  },
  {
    label: "Joke",
    href: "/joke",
  },
  {
    label: "Landscape",
    href: "/fengjing",
  },
  {
    label: "History",
    href: "/history",
  },
  {
    label: "Locking Dog",
    href: "/locking_dog",
  },
  {
    label: "Movie",
    href: "/movie",
  },
  {
    label: "Rand Text",
    href: "/randtext",
  },
  {
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
          <Pressable>
            <Text>{i.item.label}</Text>
          </Pressable>
        </Link>
      )}
    />
  );
}
