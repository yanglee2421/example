import {
  Button,
  Column,
  Host,
  Icon,
  RNHostView,
  Row,
  Spacer,
  Text,
} from "@expo/ui";
import {
  Box,
  Card,
  CircularProgressIndicator,
  FloatingActionButton,
  SnackbarHost,
  SnackbarHostRef,
  Surface,
} from "@expo/ui/jetpack-compose";
import {
  align,
  fillMaxSize,
  fillMaxWidth,
  padding,
  paddingAll,
} from "@expo/ui/jetpack-compose/modifiers";
import { useMutation } from "@tanstack/react-query";
import type { CameraType } from "expo-camera";
import { CameraView, useCameraPermissions } from "expo-camera";
import { setStringAsync } from "expo-clipboard";
import React from "react";

export default function Qrcode() {
  const [data, setData] = React.useState("");
  const [codeType, setCodeType] = React.useState("");
  const [facing, setFacing] = React.useState<CameraType>("back");

  const snackbarRef = React.useRef<SnackbarHostRef>(null);

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

  // Camera permissions are still loading.
  if (!permission) {
    return (
      <Column alignment="center" modifiers={[fillMaxWidth(), paddingAll(32)]}>
        <CircularProgressIndicator />
      </Column>
    );
  }

  // Camera permissions are not granted yet.
  if (!permission.granted) {
    return (
      <Host style={{ flex: 1 }}>
        <Surface>
          <Row alignment="center" modifiers={[paddingAll(16)]}>
            <Card modifiers={[align("center")]}>
              <Column style={{ padding: 16 }}>
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
          </Row>
        </Surface>
      </Host>
    );
  }

  if (data) {
    return (
      <Host style={{ flex: 1 }}>
        <Surface>
          <Box modifiers={[fillMaxSize()]}>
            <Card modifiers={[align("center"), padding(16, 0, 16, 0)]}>
              <Column style={{ padding: 16 }} spacing={8}>
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
                        snackbarRef.current?.showSnackbar({
                          message: error.message,
                        });
                      },
                      onSuccess() {
                        snackbarRef.current?.showSnackbar({
                          message: "Copied!",
                        });
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
            <Box modifiers={[align("bottomCenter")]}>
              <SnackbarHost ref={snackbarRef} />
            </Box>
          </Box>
        </Surface>
      </Host>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  return (
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
  );
}
