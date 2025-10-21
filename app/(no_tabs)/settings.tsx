import { Button, View } from "react-native";
import * as fs from "expo-file-system";
import * as consts from "@/lib/constants";

const getSQLiteFile = () => {
  return new fs.File(fs.Paths.document, `SQLite/${consts.databaseName}`);
};

export default function Page() {
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
    </View>
  );
}
