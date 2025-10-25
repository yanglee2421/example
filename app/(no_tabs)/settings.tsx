import { Button, View, Pressable, Text, ToastAndroid } from "react-native";
import * as fs from "expo-file-system";
import * as clipboard from "expo-clipboard";
import * as consts from "@/lib/constants";
import { useTheme } from "@/hooks/useTheme";
import { android_ripple } from "@/lib/utils";

const getSQLiteFile = () => {
  return new fs.File(fs.Paths.document, `SQLite/${consts.databaseName}`);
};

const getURL = () =>
  "https://y7k0k.no-mad-world.club/link/DgBCnmSmioWwDika?clash=3&extend=1";

export default function Page() {
  const theme = useTheme();

  return (
    <View>
      <Button
        title="export expo"
        onPress={async () => {
          const sqliteFile = getSQLiteFile();
          const dir = await fs.Directory.pickDirectoryAsync();
          const newFile = dir.createFile(consts.databaseName, sqliteFile.type);
          const bytes = await sqliteFile.bytes();
          newFile.write(bytes);
        }}
      />
      <Button
        title="import"
        onPress={async () => {
          const sqliteFile = getSQLiteFile();
          const result = await fs.File.pickFileAsync();
          const backup = Array.isArray(result) ? result.at(0) : result;
          if (!backup) return;
          const bytes = await backup.bytes();
          sqliteFile.write(bytes);
        }}
      />
      <Button
        title="delete"
        onPress={() => {
          const sqliteFile = getSQLiteFile();
          sqliteFile.exists && sqliteFile.delete();
        }}
      />
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
    </View>
  );
}
