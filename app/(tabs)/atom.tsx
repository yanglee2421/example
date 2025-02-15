import { useTheme } from "@/hooks/useTheme";
import { Button, View } from "react-native";
import * as safx from "react-native-saf-x";
import * as fs from "expo-file-system/next";
import * as consts from "@/lib/constants";
import * as DocPicker from "expo-document-picker";

export default function Page() {
  const theme = useTheme();

  return (
    <View>
      <Button
        title="export"
        onPress={async () => {
          const file = new fs.File(
            fs.Paths.document,
            `SQLite/${consts.databaseName}`
          );
          try {
            const dir = await safx.openDocumentTree(true);
            if (!dir) return;
            if (!dir.uri) return;
            await safx.copyFile(
              file.uri,
              dir.uri + "/" + Date.now() + consts.databaseName
            );
          } catch (error) {
            console.error(error);
          }
        }}
      />
      <Button
        title="import"
        onPress={async () => {
          const doc = await DocPicker.getDocumentAsync({
            copyToCacheDirectory: true,
          });

          if (!doc.assets) return;
          if (doc.canceled) return;
          const dir = doc.assets[0].uri;
          const file = new fs.File(
            fs.Paths.document,
            `SQLite/${consts.databaseName}`
          );
          file.delete();
          const backup = new fs.File(dir);
          backup.copy(file);
        }}
      />
      <Button
        title="delete"
        onPress={async () => {
          try {
            const file = new fs.File(
              fs.Paths.document,
              `SQLite/${consts.databaseName}`
            );
            file.delete();
          } catch (error) {
            console.error(error);
          }
        }}
      />
    </View>
  );
}
