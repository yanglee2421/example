import { useTheme } from "@/hooks/useTheme";
import * as consts from "@/lib/constants";
import { android_ripple } from "@/lib/utils";
import { Button, Column, Host } from "@expo/ui/jetpack-compose";
import { fillMaxWidth, padding } from "@expo/ui/jetpack-compose/modifiers";
import * as clipboard from "expo-clipboard";
import * as fs from "expo-file-system";
import { Pressable, Text, ToastAndroid, View } from "react-native";

const getSQLiteFile = () => {
  return new fs.File(fs.Paths.document, `SQLite/${consts.databaseName}`);
};

const getURL = () =>
  "https://y7k0k.no-mad-world.club/link/DgBCnmSmioWwDika?clash=3&extend=1";

export default function Page() {
  const theme = useTheme();

  return (
    <View>
      <Pressable
        onPress={async () => {
          await clipboard.setStringAsync(getURL());
          ToastAndroid.show("Copied", 1000 * 2);
        }}
        style={[
          {
            borderWidth: 1,
            borderColor: "transparent",
            borderBlockEndColor: theme.palette.divider,

            paddingInline: theme.spacing(6),
            paddingBlock: theme.spacing(3),
          },
        ]}
        android_ripple={android_ripple(theme.palette.action.focus)}
      >
        <Text
          style={[
            theme.typography.body1,
            {
              color: theme.palette.text.primary,
            },
          ]}
        >
          {getURL()}
        </Text>
      </Pressable>

      <Host matchContents>
        <Column
          modifiers={[fillMaxWidth(), padding(10, 0, 10, 0)]}
          verticalArrangement={{ spacedBy: 0 }}
        >
          <Button
            onPress={async () => {
              const sqliteFile = getSQLiteFile();
              const dir = await fs.Directory.pickDirectoryAsync();
              const newFile = dir.createFile(
                consts.databaseName,
                sqliteFile.type,
              );
              const bytes = await sqliteFile.bytes();
              newFile.write(bytes);
            }}
            modifiers={[fillMaxWidth()]}
          >
            export expo
          </Button>
          <Button
            onPress={() => {
              const sqliteFile = getSQLiteFile();
              sqliteFile.exists && sqliteFile.delete();
            }}
            modifiers={[fillMaxWidth()]}
          >
            delete
          </Button>
          <Button
            onPress={async () => {
              const sqliteFile = getSQLiteFile();
              const result = await fs.File.pickFileAsync();
              const backup = Array.isArray(result) ? result.at(0) : result;
              if (!backup) return;
              const bytes = await backup.bytes();
              sqliteFile.write(bytes);
            }}
            modifiers={[fillMaxWidth()]}
          >
            import
          </Button>
        </Column>
      </Host>
    </View>
  );
}
