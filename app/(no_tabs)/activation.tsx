import React from "react";
import { setStringAsync } from "expo-clipboard";
import { type CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { Loading } from "@/components/Loading";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text, ToastAndroid, View } from "react-native";
import { android_ripple } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import { DATE_FORMAT_DATABASE } from "@/lib/constants";
import QRCode from "react-native-qrcode-svg";
import {
  digestStringAsync,
  CryptoDigestAlgorithm,
  CryptoEncoding,
} from "expo-crypto";

const useCopy = () => {
  return useMutation({
    async mutationFn(data: string) {
      const ok = await setStringAsync(data);

      if (ok) {
        return ok;
      }

      throw new Error("copy failed");
    },
    networkMode: "offlineFirst",
  });
};

const fetchActivation = (code: string) =>
  queryOptions({
    queryKey: ["activation", code],
    queryFn: async () => {
      const hash = await digestStringAsync(
        CryptoDigestAlgorithm.MD5,
        [code, DATE_FORMAT_DATABASE].join(""),
        {
          encoding: CryptoEncoding.HEX,
        }
      );

      return hash;
    },
  });

export default function Qrcode() {
  const [data, setData] = React.useState("");
  const [facing, setFacing] = React.useState<CameraType>("back");
  const [codeType, setCodeType] = React.useState("");

  const copy = useCopy();
  const theme = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const hash = useQuery({
    ...fetchActivation(data),
    enabled: !!data,
  });

  const renderQRCode = () => {
    if (hash.isPending) {
      return <Loading />;
    }

    if (hash.isError) {
      return (
        <Text
          style={[theme.typography.body1, { color: theme.palette.error.main }]}
        >
          {hash.error.message}
        </Text>
      );
    }

    const encryptedData = hash.data;

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
        <View style={{ padding: theme.spacing(3), backgroundColor: "white" }}>
          <QRCode value={encryptedData} size={200} />
        </View>
        <Pressable
          onPress={() =>
            copy.mutate(encryptedData, {
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
                color: theme.palette.text.primary,
              },
            ]}
          >
            {encryptedData}
          </Text>
          <Text
            style={[
              theme.typography.body2,
              {
                color: theme.palette.text.secondary,
              },
            ]}
          >
            {codeType}
          </Text>
        </Pressable>
      </View>
    );
  };

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
    return renderQRCode();
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  return (
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
