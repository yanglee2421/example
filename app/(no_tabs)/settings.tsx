import { useTheme } from "@/hooks/useTheme";
import { Button, View } from "react-native";
import * as fs from "expo-file-system/next";
import * as consts from "@/lib/constants";
import * as DocPicker from "expo-document-picker";
import * as pfs from "expo-file-system";
import * as safx from "react-native-saf-x";

export default function Page() {
  const theme = useTheme();

  return (
    <View>
      <Button
        title="export safx"
        onPress={async () => {
          const file = new fs.File(
            fs.Paths.document,
            `SQLite/${consts.databaseName}`,
          );
          const dir = await safx.openDocumentTree(true);
          if (!dir) return;
          await safx.copyFile(
            file.uri,
            dir.uri + "/" + Date.now() + consts.databaseName,
            { replaceIfDestinationExists: true },
          );
        }}
      />
      <Button
        title="export expo"
        onPress={async () => {
          const file = new fs.File(
            fs.Paths.document,
            `SQLite/${consts.databaseName}`,
          );

          const dir =
            await pfs.StorageAccessFramework.requestDirectoryPermissionsAsync();

          if (!dir.granted) return;
          const nFile = await pfs.StorageAccessFramework.createFileAsync(
            dir.directoryUri,
            Date.now() + "_" + consts.databaseName,
            "application/x-sqlite3",
          );

          await pfs.StorageAccessFramework.writeAsStringAsync(
            nFile,
            file.base64(),
            { encoding: pfs.EncodingType.Base64 },
          );
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
            `SQLite/${consts.databaseName}`,
          );
          file.delete();
          const backup = new fs.File(dir);
          backup.copy(file);
        }}
      />
      <Button
        title="delete"
        onPress={() => {
          const file = new fs.File(
            fs.Paths.document,
            `SQLite/${consts.databaseName}`,
          );
          file.exists && file.delete();
        }}
      />
    </View>
  );
}
