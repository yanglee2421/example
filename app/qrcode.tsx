import React from "react";
import { setStringAsync } from "expo-clipboard";
import { type CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useMutation } from "@tanstack/react-query";
import { Loading } from "@/components/Loading";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useStorageStore } from "@/hooks/useStorageStore";

export default function Qrcode() {
  const [data, setData] = React.useState("");
  const [facing, setFacing] = React.useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const theme = useStorageStore((s) => s.theme);

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
      <View
        style={[
          {
            borderColor: theme.palette.divider,
            borderWidth: 1,

            paddingInline: theme.space(4),
            paddingBlock: theme.space(3),
            margin: theme.space(6),
          },
          theme.shape,
        ]}
      >
        <Text
          style={[theme.typography.h5, { color: theme.palette.text.primary }]}
        >
          Need Permission
        </Text>
        <Text
          style={[theme.typography.body1, {
            color: theme.palette.text.primary,
          }]}
        >
          We need your permission to show the camera
        </Text>

        <Pressable
          onPress={requestPermission}
          style={[{
            backgroundColor: theme.palette.primary.main,

            paddingInline: theme.space(4),
            paddingBlock: theme.space(2),
          }, theme.shape]}
          android_ripple={{
            color: theme.palette.action.focus,
            foreground: true,
            borderless: false,
          }}
        >
          <Text
            style={[theme.typography.button, , {
              color: theme.palette.primary.contrastText,
              textAlign: "center",
            }]}
          >
            grant permission
          </Text>
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
          <Text>
            Copy
          </Text>
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
      style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
    >
      <Pressable
        onPress={toggleCameraFacing}
        style={[{
          borderRadius: 99999,
          backgroundColor: theme.palette.common.white,

          width: theme.space(16),
          height: theme.space(16),

          marginBlockEnd: theme.space(12),

          justifyContent: "center",
          alignItems: "center",
        }]}
      >
        <MaterialCommunityIcons
          name="camera-flip-outline"
          size={36}
          color={theme.palette.common.black}
          style={{ borderWidth: 1, borderColor: "transparent" }}
        />
      </Pressable>
    </CameraView>
  );
}
