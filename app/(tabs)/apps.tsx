// import { Link } from "expo-router";
// import { FlatList } from "react-native";
// import { ListItem } from "tamagui";
// import {
//   BookOpen,
//   Clapperboard,
//   Copyright,
//   Dog,
//   Info,
//   ListTodo,
//   Mountain,
//   Network,
//   Newspaper,
//   QrCode,
//   Quote,
//   Settings,
//   Smile,
// } from "@tamagui/lucide-icons";
// import { Fontisto } from "@expo/vector-icons";

// const list = [
//   {
//     icon: <Info />,
//     label: "Not Found",
//     href: "/404",
//   },
//   {
//     icon: <Copyright />,
//     label: "About",
//     href: "/about",
//   },
//   {
//     icon: <ListTodo />,
//     label: "To Do List",
//     href: "/todolist",
//   },
//   {
//     icon: <QrCode />,
//     label: "QR Code Scaner",
//     href: "/qrcode",
//   },
//   {
//     icon: <Network />,
//     label: "Network",
//     href: "/network",
//   },
//   {
//     icon: <Fontisto name="bing" />,
//     label: "Bing",
//     href: "/bing",
//   },
//   {
//     icon: <Newspaper />,
//     label: "News",
//     href: "/news",
//   },
//   {
//     icon: <Smile />,
//     label: "Joke",
//     href: "/joke",
//   },
//   {
//     icon: <Mountain />,
//     label: "Landscape",
//     href: "/fengjing",
//   },
//   {
//     icon: <BookOpen />,
//     label: "History",
//     href: "/history",
//   },
//   {
//     icon: <Dog />,
//     label: "Locking Dog",
//     href: "/locking_dog",
//   },
//   {
//     icon: <Clapperboard />,
//     label: "Movie",
//     href: "/movie",
//   },
//   {
//     icon: <Quote />,
//     label: "Rand Text",
//     href: "/randtext",
//   },
//   {
//     icon: <Settings />,
//     label: "Settings",
//     href: "/settings",
//   },
// ].sort((c, n) => c.label.localeCompare(n.label));

// export default function Account() {
//   return (
//     <FlatList
//       data={list}
//       keyExtractor={(i) => i.href}
//       renderItem={(i) => (
//         <Link href={i.item.href} key={i.item.label} asChild>
//           <ListItem icon={i.item.icon} title={i.item.label} />
//         </Link>
//       )}
//     />
//   );
// }

export default function Page() {
  return <></>;
}
