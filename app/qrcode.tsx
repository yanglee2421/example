import React from "react";
import { Pressable, Text, View } from "react-native";
import { setStringAsync } from "expo-clipboard";
import { type CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useMutation } from "@tanstack/react-query";
import { Loading } from "@/components/Loading";

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
      <View>
        <Text>Need Permission</Text>
        <Text>We need your permission to show the camera</Text>
        <Pressable onPress={requestPermission}>
          <Text>grant permission</Text>
        </Pressable>
      </View>
    );
  }

  if (data) {
    return (
      <View>
        <Text>QR Code</Text>
        <Text>{data}</Text>
        <Pressable
          onPress={() => copy.mutate(data)}
          disabled={copy.isPending}
        >
          <Text>Copy</Text>
        </Pressable>
      </View>
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
    >
      <Pressable
        onPress={toggleCameraFacing}
      >
        <Text>fac</Text>
      </Pressable>
    </CameraView>
  );
}
