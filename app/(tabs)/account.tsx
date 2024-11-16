import { ListItem } from "@rneui/themed";
import { Link } from "expo-router";
import { FlatList } from "react-native";

const list = [
  {
    label: "Not Found",
    href: "/404",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "To Do List",
    href: "/todolink",
  },
];

export default function Account() {
  return (
    <FlatList
      data={list}
      renderItem={(i) => (
        <Link href={i.item.href} key={i.item.label} asChild>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{i.item.label}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </Link>
      )}
    />
  );
}
