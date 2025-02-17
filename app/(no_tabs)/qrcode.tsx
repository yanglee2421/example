import React from "react";
import { setStringAsync } from "expo-clipboard";
import { type CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useMutation } from "@tanstack/react-query";
import { Loading } from "@/components/Loading";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text, ToastAndroid, View } from "react-native";
import { android_ripple } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

export default function Qrcode() {
  const [data, setData] = React.useState("");
  const [facing, setFacing] = React.useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const theme = useTheme();

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

            paddingInline: theme.spacing(4),
            paddingBlock: theme.spacing(3),
            margin: theme.spacing(6),
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
          style={[
            theme.typography.body1,
            {
              color: theme.palette.text.primary,
            },
          ]}
        >
          We need your permission to show the camera
        </Text>

        <Pressable
          onPress={requestPermission}
          style={[
            {
              backgroundColor: theme.palette.primary.main,

              paddingInline: theme.spacing(4),
              paddingBlock: theme.spacing(2),
            },
            theme.shape,
          ]}
          android_ripple={{
            color: theme.palette.action.focus,
            foreground: true,
            borderless: false,
          }}
        >
          <Text
            style={[
              theme.typography.button,
              ,
              {
                color: theme.palette.primary.contrastText,
                textAlign: "center",
              },
            ]}
          >
            grant permission
          </Text>
        </Pressable>
      </View>
    );
  }

  if (data) {
    return (
      <View
        style={[
          theme.shape,
          {
            margin: theme.spacing(3),
            paddingInline: theme.spacing(5),
            paddingBlock: theme.spacing(3),

            borderColor: theme.palette.divider,
            borderWidth: 1,
          },
        ]}
      >
        <Text
          style={[theme.typography.h5, { color: theme.palette.text.primary }]}
        >
          QR Code
        </Text>
        <Pressable
          onPress={() =>
            copy.mutate(data, {
              onError(error) {
                ToastAndroid.show(error.message, 1000 * 2);
              },
              onSuccess() {
                ToastAndroid.show("Copied!", 1000 * 2);
              },
            })
          }
          disabled={copy.isPending}
          android_ripple={android_ripple(theme.palette.action.focus)}
        >
          <Text
            style={[
              theme.typography.body1,
              {
                color: theme.palette.text.secondary,
              },
            ]}
          >
            {data}
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
      barcodeScannerSettings={{ barcodeTypes: ["qr", "ean13", "upc_a"] }}
      onBarcodeScanned={(res) => setData(res.data)}
      style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
    >
      <Pressable
        onPress={toggleCameraFacing}
        style={[
          {
            borderRadius: 99999,
            backgroundColor: theme.palette.common.white,

            width: theme.spacing(14),
            height: theme.spacing(14),

            marginBlockEnd: theme.spacing(16),

            justifyContent: "center",
            alignItems: "center",
          },
        ]}
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
