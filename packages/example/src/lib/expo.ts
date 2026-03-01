import * as fs from "expo-file-system";

export const downloadFile = async (url: string) => {
  const destination = new fs.Directory(fs.Paths.cache, "bing");
  if (destination.exists) {
    destination.delete();
  }
  destination.create();
  const output = await fs.File.downloadFileAsync(url, destination);
  const outputDirectory = await fs.Directory.pickDirectoryAsync();
  const originFileName = fs.Paths.basename(output.uri);
  const outputFile = outputDirectory.createFile(originFileName, output.type);
  const originBytes = await output.bytes();
  outputFile.write(originBytes);
};
