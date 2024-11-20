import React from "react";
import { setStringAsync } from "expo-clipboard";
import { type CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useMutation } from "@tanstack/react-query";
import { Loading } from "@/components/Loading";
import { Button, Card, H4, Paragraph, Text, View } from "tamagui";
import { SwitchCamera } from "@tamagui/lucide-icons";

export default function Qrcode() {
  const [data, setData] = React.useState("");
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
  });

  if (!permission) {
    // Camera permissions are still loading.
    return <Loading />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <Card elevate margin="$2.5">
        <Card.Header padded>
          <H4>Need Permission</H4>
        </Card.Header>
        <View paddingInline="$4">
          <Paragraph>We need your permission to show the camera</Paragraph>
        </View>
        <Card.Footer padded theme="dark_Button">
          <Button
            onPress={requestPermission}
            flex={1}
            backgroundColor={"$primary"}
            color="$color"
          >
            grant permission
          </Button>
        </Card.Footer>
      </Card>
    );
  }

  if (data) {
    return (
      <Card>
        <Card.Header padded>
          <H4>QR Code</H4>
        </Card.Header>
        <Text>{data}</Text>
        <Card.Footer padded>
          <Button
            onPress={() => copy.mutate(data)}
            disabled={copy.isPending}
            flex={1}
          >
            Copy
          </Button>
        </Card.Footer>
      </Card>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  return (
    <CameraView
      facing={facing}
      barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      onBarcodeScanned={(res) => setData(res.data)}
      style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
    >
      <Button
        onPress={toggleCameraFacing}
        circular
        icon={<SwitchCamera size={"$2"} />}
        marginBlockEnd="$12"
        size={"$6"}
      />
    </CameraView>
  );
}
