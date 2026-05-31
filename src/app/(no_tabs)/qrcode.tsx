import { Button, Column, Host, Icon, RNHostView, Spacer, Text } from "@expo/ui";
import {
  Box,
  Card,
  FloatingActionButton,
  Surface,
} from "@expo/ui/jetpack-compose";
import {
  align,
  fillMaxWidth,
  paddingAll,
} from "@expo/ui/jetpack-compose/modifiers";
import { useMutation } from "@tanstack/react-query";
import { type CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { setStringAsync } from "expo-clipboard";
import React from "react";
import { ToastAndroid } from "react-native";

export default function Qrcode() {
  const [data, setData] = React.useState("");
  const [codeType, setCodeType] = React.useState("");
  const [facing, setFacing] = React.useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  const copy = useMutation<boolean, Error, string>({
    async mutationFn(data) {
      const ok = await setStringAsync(data);

      if (ok) {
        return ok;
      }

      throw new Error("copy failed");
    },
    networkMode: "offlineFirst",
  });

  if (!permission) {
    // Camera permissions are still loading.
    return <></>;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <Host style={{ flex: 1 }}>
        <Surface>
          <Box contentAlignment="center" modifiers={[paddingAll(16)]}>
            <Card modifiers={[align("center")]}>
              <Column modifiers={[paddingAll(16)]}>
                <Text textStyle={{ fontSize: 24 }}>Need Permission</Text>
                <Text textStyle={{ fontSize: 16 }}>
                  We need your permission to show the camera
                </Text>
                <Button
                  onPress={requestPermission}
                  label="grant permission"
                  modifiers={[fillMaxWidth()]}
                />
              </Column>
            </Card>
          </Box>
        </Surface>
      </Host>
    );
  }

  if (data) {
    return (
      <Host style={{ flex: 1 }}>
        <Surface>
          <Box contentAlignment="center" modifiers={[paddingAll(16)]}>
            <Card>
              <Column modifiers={[paddingAll(16)]} spacing={8}>
                <Text textStyle={{ fontSize: 24 }}>QR Code</Text>
                <Text textStyle={{ fontSize: 14 }}>{"Code Data: " + data}</Text>
                <Text textStyle={{ fontSize: 16 }}>
                  {"Code Type: " + codeType}
                </Text>
                <Button
                  label="Copy"
                  modifiers={[fillMaxWidth()]}
                  onPress={() => {
                    copy.mutate(data, {
                      onError(error) {
                        ToastAndroid.show(error.message, 1000 * 2);
                      },
                      onSuccess() {
                        ToastAndroid.show("Copied!", 1000 * 2);
                      },
                    });
                  }}
                  disabled={copy.isPending}
                />
                <Button
                  label="Continue"
                  modifiers={[fillMaxWidth()]}
                  onPress={() => {
                    setData("");
                  }}
                />
              </Column>
            </Card>
          </Box>
        </Surface>
      </Host>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  return (
    <>
      <Host style={{ flex: 1 }}>
        <RNHostView>
          <CameraView
            facing={facing}
            barcodeScannerSettings={{
              barcodeTypes: [
                "aztec",
                "ean13",
                "ean8",
                "qr",
                "pdf417",
                "upc_e",
                "datamatrix",
                "code39",
                "code93",
                "itf14",
                "codabar",
                "code128",
                "upc_a",
              ],
            }}
            onBarcodeScanned={(res) => {
              setData(res.data);
              setCodeType(res.type);
            }}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
              padding: 64,
            }}
          />
        </RNHostView>
        <Column alignment="center">
          <Spacer flexible />
          <FloatingActionButton onClick={toggleCameraFacing}>
            <FloatingActionButton.Icon>
              <Icon
                name={Icon.select({
                  android: import("@expo/material-symbols/camera.xml"),
                  ios: "camera",
                })}
              />
            </FloatingActionButton.Icon>
          </FloatingActionButton>
          <Spacer size={64} />
        </Column>
      </Host>
    </>
  );
}
