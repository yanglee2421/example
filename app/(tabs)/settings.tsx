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
    label: "QR Code",
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
