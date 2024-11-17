import { Icon, ListItem } from "@rneui/themed";
import { Link } from "expo-router";
import { FlatList, Pressable } from "react-native";

const list = [
  {
    icon: <Icon name="border-none-variant" />,
    label: "Not Found",
    href: "/404",
  },
  { icon: <Icon name="information-outline" />, label: "About", href: "/about" },
  {
    icon: <Icon name="format-list-numbered" />,
    label: "To Do List",
    href: "/todolist",
  },
  {
    icon: <Icon name="qrcode-scan" />,
    label: "QR Code Scaner",
    href: "/qrcode",
  },
  {
    icon: <Icon name="web" />,
    label: "Network",
    href: "/network",
  },
  {
    icon: <Icon name="microsoft-bing" />,
    label: "Bing",
    href: "/bing",
  },
  {
    icon: <Icon name="newspaper-variant-outline" />,
    label: "News",
    href: "/news",
  },
  {
    icon: <Icon name="robot-excited-outline" />,
    label: "Joke",
    href: "/joke",
  },
  {
    icon: <Icon name="image-filter-hdr" />,
    label: "Landscape",
    href: "/fengjing",
  },
  {
    icon: <Icon name="book-open-page-variant-outline" />,
    label: "History",
    href: "/history",
  },
  {
    icon: <Icon name="dog" />,
    label: "Locking Dog",
    href: "/locking_dog",
  },
  {
    icon: <Icon name="movie-outline" />,
    label: "Movie",
    href: "/movie",
  },
  {
    icon: <Icon name="comment-quote-outline" />,
    label: "Rand Text",
    href: "/randtext",
  },
  {
    icon: <Icon name="cogs" />,
    label: "Settings",
    href: "/settings",
  },
].sort((c, n) => c.label.localeCompare(n.label));

export default function Account() {
  return (
    <FlatList
      data={list}
      renderItem={(i) => (
        <Link href={i.item.href} key={i.item.label} asChild>
          <Pressable>
            <ListItem bottomDivider>
              {i.item.icon}
              <ListItem.Content>
                <ListItem.Title>{i.item.label}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </Pressable>
        </Link>
      )}
    />
  );
}
