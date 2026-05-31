import { AppHeader } from "@/components/app-header";
import { Column, Host, Icon, List, ListItem } from "@expo/ui";
import { HorizontalDivider, Surface } from "@expo/ui/jetpack-compose";
import { useRouter } from "expo-router";
import React from "react";

export default function Account() {
  const router = useRouter();

  const list = [
    {
      label: "About",
      href: "/about" as const,
      icon: (
        <Icon
          name={Icon.select({
            android: import("@expo/material-symbols/info_i.xml"),
            ios: "0.circle.ar",
          })}
        />
      ),
    },
    {
      label: "QR Code Scaner",
      href: "/qrcode" as const,
      icon: (
        <Icon
          name={Icon.select({
            android: import("@expo/material-symbols/qr_code_scanner.xml"),
            ios: "0.circle.ar",
          })}
        />
      ),
    },
    {
      label: "Network",
      href: "/network" as const,
      icon: (
        <Icon
          name={Icon.select({
            android: import("@expo/material-symbols/network_node.xml"),
            ios: "0.circle.ar",
          })}
        />
      ),
    },
    {
      label: "Bing",
      href: "/bing" as const,
      icon: (
        <Icon
          name={Icon.select({
            android: import("@expo/material-symbols/image_search.xml"),
            ios: "0.circle.ar",
          })}
        />
      ),
    },
    {
      label: "News",
      href: "/news" as const,
      icon: (
        <Icon
          name={Icon.select({
            android: import("@expo/material-symbols/news.xml"),
            ios: "0.circle.ar",
          })}
        />
      ),
    },
    {
      label: "Landscape",
      href: "/fengjing" as const,
      icon: (
        <Icon
          name={Icon.select({
            android: import("@expo/material-symbols/imagesmode.xml"),
            ios: "0.circle.ar",
          })}
        />
      ),
    },
    {
      label: "History",
      href: "/history" as const,
      icon: (
        <Icon
          name={Icon.select({
            android: import("@expo/material-symbols/book_ribbon.xml"),
            ios: "0.circle.ar",
          })}
        />
      ),
    },
    {
      label: "Locking Dog",
      href: "/locking_dog" as const,
      icon: (
        <Icon
          name={Icon.select({
            android:
              import("@expo/material-symbols/sound_detection_dog_barking.xml"),
            ios: "0.circle.ar",
          })}
        />
      ),
    },
    {
      label: "Movie",
      href: "/movie" as const,
      icon: (
        <Icon
          name={Icon.select({
            android: import("@expo/material-symbols/movie.xml"),
            ios: "0.circle.ar",
          })}
        />
      ),
    },
    {
      label: "Rand Text",
      href: "/randtext" as const,
      icon: (
        <Icon
          name={Icon.select({
            android: import("@expo/material-symbols/format_quote.xml"),
            ios: "0.circle.ar",
          })}
        />
      ),
    },
  ].sort((c, n) => c.label.localeCompare(n.label));

  return (
    <Host style={{ flex: 1 }}>
      <Surface>
        <Column>
          <AppHeader pageName="Apps" showBack={false} />
          <List>
            {list.map((item, index) => {
              return (
                <React.Fragment key={item.href}>
                  {!!index && <HorizontalDivider />}
                  <ListItem
                    onPress={() => {
                      router.push(item.href);
                    }}
                  >
                    <ListItem.Leading>{item.icon}</ListItem.Leading>
                    <ListItem.Supporting>{item.label}</ListItem.Supporting>
                  </ListItem>
                </React.Fragment>
              );
            })}
          </List>
        </Column>
      </Surface>
    </Host>
  );
}
